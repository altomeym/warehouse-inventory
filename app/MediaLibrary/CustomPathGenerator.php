<?php

namespace App\MediaLibrary;

use App\Models\Brand;
use App\Models\Product;
use App\Models\ProductCategory;
use App\Models\Purchase;
use App\Models\PurchaseReturn;
use App\Models\Sale;
use App\Models\SaleReturn;
use App\Models\Setting;
use App\Models\User;
use Spatie\MediaLibrary\MediaCollections\Models\Media;
use Spatie\MediaLibrary\Support\PathGenerator\PathGenerator;

/**
 * Class CustomPathGenerator
 * @package App\MediaLibrary
 */
class CustomPathGenerator implements PathGenerator
{
    /**
     * @param  Media  $media
     *
     * @return string
     */
    public function getPath(Media $media): string
    {
        $path = '{PARENT_DIR}'.DIRECTORY_SEPARATOR.$media->id.DIRECTORY_SEPARATOR;
        switch ($media->collection_name) {
            case Brand::PATH;
                return str_replace('{PARENT_DIR}', Brand::PATH, $path);
            case ProductCategory::PATH;
                return str_replace('{PARENT_DIR}', ProductCategory::PATH, $path);
            case Product::PATH;
                return str_replace('{PARENT_DIR}', Product::PATH, $path);
            case Product::PRODUCT_BARCODE_PATH;
                return str_replace('{PARENT_DIR}', Product::PRODUCT_BARCODE_PATH, $path);
            case User::PATH;
                return str_replace('{PARENT_DIR}', User::PATH, $path);
            case Setting::PATH;
                return str_replace('{PARENT_DIR}', Setting::PATH, $path);
            case Purchase::PURCHASE_PDF;
                return str_replace('{PARENT_DIR}', Purchase::PURCHASE_PDF, $path);
            case Sale::SALE_PDF;
                return str_replace('{PARENT_DIR}', Sale::SALE_PDF, $path);
            case PurchaseReturn::PURCHASE_RETURN_PDF;
                return str_replace('{PARENT_DIR}', PurchaseReturn::PURCHASE_RETURN_PDF, $path);
            case SaleReturn::SALE_RETURN_PDF;
                return str_replace('{PARENT_DIR}', SaleReturn::SALE_RETURN_PDF, $path);
            case Sale::SALE_BARCODE_PATH;
                return str_replace('{PARENT_DIR}', Sale::SALE_BARCODE_PATH, $path);
                /**/
            case Purchase::PATH;
                return str_replace('{PARENT_DIR}', Purchase::PATH, $path);
            case purchases_return::PATH;
                return str_replace('{PARENT_DIR}', purchases_return::PATH, $path);
            case Sale::PATH;
                return str_replace('{PARENT_DIR}', Sale::PATH, $path);
            case SaleReturn::PATH;
                return str_replace('{PARENT_DIR}', SaleReturn::PATH, $path);
            case Quotation::PATH;
                return str_replace('{PARENT_DIR}', SaleReturn::PATH, $path);
            case 'default' :
                return '';
        }
    }

    /**
     * @param  Media  $media
     *
     * @return string
     */
    public function getPathForConversions(Media $media): string
    {
        return $this->getPath($media).'thumbnails/';
    }

    /**
     * @param  Media  $media
     *
     * @return string
     */
    public function getPathForResponsiveImages(Media $media): string
    {
        return $this->getPath($media).'rs-images/';
    }
}
