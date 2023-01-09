import React, { useState } from 'react'
import { connect } from 'react-redux'
import MasterLayout from '../MasterLayout'
import { fetchProductCategories } from '../../store/action/productCategoryAction'
import ReactDataTable from '../../shared/table/ReactDataTable'
import DeleteProductCategory from './DeleteProductCategory'
import CreateProductCategory from './CreateProductCategory'
import EditProductCategory from './EditProductCategory'
import TabTitle from '../../shared/tab-title/TabTitle'
import { getFormattedMessage, placeholderText } from '../../shared/sharedMethod'
import user from '../../assets/images/productCategory_logo.jpeg'
import ActionButton from '../../shared/action-buttons/ActionButton'
import { Tokens } from '../../constants';
import TopProgressBar from "../../shared/components/loaders/TopProgressBar";

const CategoryHirerchy  = (props) => {
    const {
        fetchProductCategories,
        productCategories,
        totalRecord,
        isLoading,
        config,
    } = props
    const [deleteModel, setDeleteModel] = useState(false)
    const [isDelete, setIsDelete] = useState(null)
    const [editModel, setEditModel] = useState(false)
    const [productCategory, setProductCategory] = useState()
    const updatedLanguage = localStorage.getItem(Tokens.UPDATED_LANGUAGE)

    const handleClose = (item) => {
        setEditModel(!editModel)
        setProductCategory(item);
    };

    const onClickDeleteModel = (isDelete = null) => {
        setDeleteModel(!deleteModel);
        setIsDelete(isDelete);
    };

    const onChange = (filter) => {
        fetchProductCategories(filter, true);
    };

    const itemsValue = productCategories.length >= 0 && productCategories.map(product => ({
        name: product.attributes.name,
        image: product.attributes.image,
        parent_id: product.attributes?.parent_id,
        products_count: product.attributes.products_count,
        id: product.id,
    }));

    let user_permissions = new Set(config);
    const is_addedAble = user_permissions.has('manage_product_categories-create') ? true : false
    const is_editAdable = user_permissions.has('manage_product_categories-edit') ? true : false
    const is_deleteAdable = user_permissions.has('manage_product_categories-delete') ? true: false
    
    const columns = [
        {
            name: getFormattedMessage('product-category.title'),
            selector: row => row.name,
            sortField: 'name',
            sortable: true,
            cell: row => {
                const imageUrl = row.image ? row.image : user;
                return (
                    <div className='d-flex align-items-center'>
                        <div className='me-2 outline-box'>
                            <img src={imageUrl} height='50' width='50' alt='Product Category Image'
                                 className='image image-circle image-mini'/>
                        </div>
                        <div className='d-flex flex-column'>
                            <span>{row.name}</span>
                        </div>
                    </div>
                )
            },
        },
        {
            name: getFormattedMessage('brand.table.product-count.column.label'),
            selector: row => row.products_count,
            sortable: true,
            sortField: 'products_count',
            style: updatedLanguage === 'ar' ? {paddingRight: '87px'} : {paddingLeft: '130px'},
        },
        {
            name: getFormattedMessage('react-data-table.action.column.label'),
            right: true,
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
            cell: row => <ActionButton item={row} goToEditProduct={handleClose} isEditMode={is_editAdable}
                                      onClickDeleteModel={onClickDeleteModel} isDeleteMode={is_deleteAdable} />
        }
    ];

    return (
        <MasterLayout> 
            <TopProgressBar />
                <ReactDataTable columns={columns} items={itemsValue} onChange={onChange} isLoading={isLoading}
                                totalRows={totalRecord}/>
                
        </MasterLayout>
    )
};

const mapStateToProps = (state) => {
    const {productCategories, totalRecord, isLoading, config} = state;
    return {productCategories, totalRecord, isLoading, config}
};

export default connect(mapStateToProps, {fetchProductCategories})(CategoryHirerchy );

