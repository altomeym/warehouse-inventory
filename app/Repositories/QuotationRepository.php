<?php

namespace App\Repositories;


use App\Models\Quotation;
use App\Models\QuotationItem;
use App\Models\Sale;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpKernel\Exception\UnprocessableEntityHttpException;

/**
 * Class QuotationRepository
 */
class QuotationRepository extends BaseRepository
{
    /**
     * @var array
     */
    protected $fieldSearchable = [
        'date',
        'tax_rate',
        'tax_amount',
        'discount',
        'shipping',
        'grand_total',
        'received_amount',
        'paid_amount',
        'note',
        'created_at',
        'reference_code',
        'shipping_data',
        'tax_data',
    ];

    /**
     * @var string[]
     */
    protected $allowedFields = [
        'date',
        'tax_rate',
        'tax_amount',
        'discount',
        'shipping',
        'grand_total',
        'received_amount',
        'note',
        'shipping_data',
        'tax_data',
    ];

    /**
     * Return searchable fields
     *
     * @return array
     */
    public function getFieldsSearchable(): array
    {
        return $this->fieldSearchable;
    }

    /**
     * Configure the Model
     **/
    public function model(): string
    {
        return Quotation::class;
    }

    /**
     * @param $input
     *
     *
     * @return Quotation
     */
    public function storeQuotation($input): Quotation
    {
        try {
            DB::beginTransaction();

            $input['date'] = $input['date'] ?? date("Y/m/d");
            $quotationInputArray = Arr::only($input, [
                'customer_id', 'warehouse_id', 'tax_rate', 'tax_amount', 'discount', 'shipping', 'grand_total',
                'received_amount', 'paid_amount', 'note', 'date', 'status','shipping_data',
                'tax_data',
            ]);

            /** @var Quotation $quotation */
            $quotationInputArray['shipping_data'] = json_encode($input['shipping_data']);
            $quotationInputArray['tax_data'] = json_encode($input['tax_data']);
            $quotation = Quotation::create($quotationInputArray);
            $quotation = $this->storeQuotationItems($quotation, $input);

            DB::commit();
            if (isset($input['images']) && !empty($input['images'])) {
                foreach ($input['images'] as $image) {
                    $product['image_url'] = $product->addMedia($image)->toMediaCollection(Quotation::PATH,
                        config('app.media_disc'));
                }
            }
            /*new code*/
            if(!empty($input['shipping_data']))
            {
             $last_id = Sale::orderBy('id','DESC')->first();
              for ($i = 0; $i < count($input['shipping_data']); $i++) {
                        if ($input['shipping_data'][$i]['shipping_value'] != '') {
                            $requestData = [
                                'shipping_type_id' => (!empty($input['shipping_data'][$i]['shipping_value']) ? $input['shipping_data'][$i]['shipping_value']: ''),
                                'sale_purchases_id' =>  (!empty($last_id['id']) ? $last_id['id']: ''),
                                'slug' => 'quotation',
                                'shipping_type_name' => (!empty($input['shipping_data'][$i]['shipping_type_name']) ? $input['shipping_data'][$i]['shipping_type_name']: ''),           
                            ];
                         $shipping_has_values = \App\Models\Shipping_has_values::create($requestData);

                        }
                    }
            }

            /**/

            return $quotation;
        } catch (Exception $e) {
            DB::rollBack();
            throw new UnprocessableEntityHttpException($e->getMessage());
        }
    }

    /**
     * @param $quotation
     * @param $input
     *
     *
     * @return mixed
     */
    public function storeQuotationItems($quotation, $input)
    {
        foreach ($input['quotation_items'] as $quotationItem) {
            $item = $this->calculationQuotationItems($quotationItem);
            $quotationItem = new QuotationItem($item);
            $quotation->quotationItems()->save($quotationItem);
        }

        $subTotalAmount = $quotation->quotationItems()->sum('sub_total');

        if ($input['discount'] <= $subTotalAmount) {
            $input['grand_total'] = $subTotalAmount - $input['discount'];
        } else {
            throw new UnprocessableEntityHttpException("Discount amount should not be greater than total.");
        }
        if ($input['tax_rate'] <= 100 && $input['tax_rate'] >= 0) {
            $input['tax_amount'] = $input['grand_total'] * $input['tax_rate'] / 100;
        } else {
            throw new UnprocessableEntityHttpException("Please enter tax value between 0 to 100.");
        }
        $input['grand_total'] += $input['tax_amount'];
        $input['grand_total'] += $input['shipping'];
        /*if ($input['shipping'] <= $input['grand_total'] && $input['shipping'] >= 0) {
            $input['grand_total'] += $input['shipping'];
        } else {
            throw new UnprocessableEntityHttpException("Shipping amount should not be greater than total.");
        }*/

        $input['reference_code'] = 'QA_111'.$quotation->id;
        $quotation->update($input);

        return $quotation;
    }

    /**
     * @param $quotationItem
     *
     *
     * @return mixed
     */
    public function calculationQuotationItems($quotationItem)
    {
        $validator = Validator::make($quotationItem, QuotationItem::$rules);
        if ($validator->fails()) {
            throw new UnprocessableEntityHttpException($validator->errors()->first());
        }

        //discount calculation
        $perItemDiscountAmount = 0;
        $quotationItem['net_unit_price'] = $quotationItem['product_price'];
        if ($quotationItem['discount_type'] == Sale::PERCENTAGE) {
            if ($quotationItem['discount_value'] <= 100 && $quotationItem['discount_value'] >= 0) {
                $quotationItem['discount_amount'] = ($quotationItem['discount_value'] * $quotationItem['product_price'] / 100) * $quotationItem['quantity'];
                $perItemDiscountAmount = $quotationItem['discount_amount'] / $quotationItem['quantity'];
                $quotationItem['net_unit_price'] -= $perItemDiscountAmount;
            } else {
                throw new UnprocessableEntityHttpException("Please enter discount value between 0 to 100.");
            }
        } elseif ($quotationItem['discount_type'] == Sale::FIXED) {
            if ($quotationItem['discount_value'] <= $quotationItem['product_price'] && $quotationItem['discount_value'] >= 0) {
                $quotationItem['discount_amount'] = $quotationItem['discount_value'] * $quotationItem['quantity'];
                $perItemDiscountAmount = $quotationItem['discount_amount'] / $quotationItem['quantity'];
                $quotationItem['net_unit_price'] -= $perItemDiscountAmount;
            } else {
                throw new UnprocessableEntityHttpException("Please enter  discount's value between product's price.");
            }
        }

        //tax calculation
        $perItemTaxAmount = 0;
        if ($quotationItem['tax_value'] <= 100 && $quotationItem['tax_value'] >= 0) {
            if ($quotationItem['tax_type'] == Sale::EXCLUSIVE) {
                $quotationItem['tax_amount'] = (($quotationItem['net_unit_price'] * $quotationItem['tax_value']) / 100) * $quotationItem['quantity'];
                $perItemTaxAmount = $quotationItem['tax_amount'] / $quotationItem['quantity'];
            } elseif ($quotationItem['tax_type'] == Sale::INCLUSIVE) {
                $quotationItem['tax_amount'] = ($quotationItem['net_unit_price'] * $quotationItem['tax_value']) / (100 + $quotationItem['tax_value']) * $quotationItem['quantity'];
                $perItemTaxAmount = $quotationItem['tax_amount'] / $quotationItem['quantity'];
                $quotationItem['net_unit_price'] -= $perItemTaxAmount;
            }
        } else {
            throw new UnprocessableEntityHttpException("Please enter tax value between 0 to 100 ");
        }
        $quotationItem['sub_total'] = ($quotationItem['net_unit_price'] + $perItemTaxAmount) * $quotationItem['quantity'];


        return $quotationItem;
    }

    /**
     * @param $input
     * @param $id
     *
     *
     * @return mixed
     */
    public function updateQuotation($input, $id)
    {
        try {
            DB::beginTransaction();
            $quotation = Quotation::findOrFail($id);
            $quotationItemIds = QuotationItem::whereQuotationId($id)->pluck('id')->toArray();
            $quotationItmOldIds = [];
            foreach ($input['quotation_items'] as $key => $quotationItem) {
                //get different ids & update
                $quotationItmOldIds[$key] = $quotationItem['quotation_item_id'];
                $quotationItemArray = Arr::only($quotationItem, [
                    'quotation_item_id', 'product_id', 'product_price', 'net_unit_price', 'tax_type', 'tax_value',
                    'tax_amount', 'discount_type', 'discount_value', 'discount_amount', 'sale_unit', 'quantity',
                    'sub_total',
                ]);
                $this->updateItem($quotationItemArray, $input['warehouse_id']);

                if (isset($input['images']) && !empty($input['images'])) {
                foreach ($input['images'] as $image) {
                    $product['image_url'] = $product->addMedia($image)->toMediaCollection(Quotation::PATH,
                        config('app.media_disc'));
                    }
                }
                //create new product items
                if (is_null($quotationItem['quotation_item_id'])) {
                    $quotationItem = $this->calculationQuotationItems($quotationItem);
                    $quotationItemArray = Arr::only($quotationItem, [
                        'product_id', 'product_price', 'net_unit_price', 'tax_type', 'tax_value', 'tax_amount',
                        'discount_type', 'discount_value', 'discount_amount', 'sale_unit', 'quantity', 'sub_total',
                    ]);
                    $quotation->quotationItems()->create($quotationItemArray);
                }
            }
            $removeItemIds = array_diff($quotationItemIds, $quotationItmOldIds);
            //delete remove product
            if (!empty(array_values($removeItemIds))) {
                QuotationItem::whereIn('id', array_values($removeItemIds))->delete();
            }
            $quotation = $this->updateQuotationCalculation($input, $id);
            DB::commit();

            return $quotation;
        } catch (Exception $e) {
            DB::rollBack();
            throw new UnprocessableEntityHttpException($e->getMessage());
        }
    }

    /**
     * @param $input
     * @param $id
     *
     *
     * @return mixed
     */
    public function updateQuotationCalculation($input, $id)
    {
        $quotation = Quotation::findOrFail($id);
        $subTotalAmount = $quotation->quotationItems()->sum('sub_total');

        if ($input['discount'] > $subTotalAmount || $input['discount'] < 0) {
            throw new UnprocessableEntityHttpException("Discount amount should not be greater than total.");
        }
        $input['grand_total'] = $subTotalAmount - $input['discount'];
        if ($input['tax_rate'] > 100 || $input['tax_rate'] < 0) {
            throw new UnprocessableEntityHttpException("Please enter tax value between 0 to 100.");
        }
        $input['tax_amount'] = $input['grand_total'] * $input['tax_rate'] / 100;

        $input['grand_total'] += $input['tax_amount'];

        /*if ($input['shipping'] > $input['grand_total'] || $input['shipping'] < 0) {

            throw new UnprocessableEntityHttpException("Shipping amount should not be greater than total.");
        }*/

        $input['grand_total'] += $input['shipping'];

        $quotationInputArray = Arr::only($input, [
            'customer_id', 'warehouse_id', 'tax_rate', 'tax_amount', 'discount', 'shipping', 'grand_total',
            'received_amount', 'paid_amount', 'note', 'date', 'status','shipping_data','tax_data',
        ]);
        $quotationInputArray['shipping_data'] = json_encode($input['shipping_data']);
        $quotationInputArray['tax_data'] = json_encode($input['tax_data']);
        $quotation->update($quotationInputArray);

        /*new code*/
            if(!empty($input['shipping_data']))
            {
             $last_id = \App\Models\Shipping_has_values::where('slug','quotation')->where('sale_purchases_id',$id)->delete();
              for ($i = 0; $i < count($input['shipping_data']); $i++) {
                        if ($input['shipping_data'][$i]['shipping_value'] != '') {
                            $requestData = [
                                'shipping_type_id' => (!empty($input['shipping_data'][$i]['shipping_value']) ? $input['shipping_data'][$i]['shipping_value']: ''),
                                'sale_purchases_id' =>  (!empty($id) ? $id: ''),
                                'slug' => 'quotation',
                                'shipping_type_name' => (!empty($input['shipping_data'][$i]['shipping_type_name']) ? $input['shipping_data'][$i]['shipping_type_name']: ''),           
                            ];
                         $shipping_has_values = \App\Models\Shipping_has_values::create($requestData);

                        }
                    }
            }
            /**/

        return $quotation;
    }

    /**
     * @param $quotationItem
     * @param $warehouseId
     *
     *
     * @return bool
     */
    public function updateItem($quotationItem, $warehouseId): bool
    {
        try {
            $quotationItem = $this->calculationQuotationItems($quotationItem);
            $item = QuotationItem::whereId($quotationItem['quotation_item_id']);
            unset($quotationItem['quotation_item_id']);
            $item->update($quotationItem);

            return true;
        } catch (Exception $e) {
            throw new UnprocessableEntityHttpException($e->getMessage());
        }
    }
}
