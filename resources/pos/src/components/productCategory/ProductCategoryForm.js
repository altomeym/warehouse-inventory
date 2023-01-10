import React, {createRef, useState} from 'react';
import {connect} from 'react-redux';
import {Form, Modal} from 'react-bootstrap-v5';
import {
    editProductCategory, fetchProductCategory, fetchProductCategories
} from '../../store/action/productCategoryAction';
import ImagePicker from '../../shared/image-picker/ImagePicker';
import user from '../../assets/images/productCategory_logo.jpeg';
import {getFormattedMessage, placeholderText, getFormattedOptions} from '../../shared/sharedMethod';
import ModelFooter from '../../shared/components/modelFooter';
import { categoryTypesOptions } from '../../constants';
import ReactSelect from '../../shared/select/reactSelect';

const ProductCategoryForm = (props) => {
    const {handleClose, show, title, addProductData, editProductCategory, singleProductCategory, fetchProductCategories, productCategories} = props;
    const innerRef = createRef();
    const editType =  singleProductCategory && singleProductCategory?.parent_id == 0 ? 'parent' : 'child';
    const typeoptions = getFormattedOptions(categoryTypesOptions)
    let typeDefaultValue =  singleProductCategory && editType && typeoptions.filter((option) => option.id === editType)
    const categoryDefaultValue =  singleProductCategory  && productCategories.filter((option) => option.id === singleProductCategory.parent_id)
    
    const [productCategoryValue, setProductCategoryValue] = useState({
        name: singleProductCategory ? singleProductCategory.name : '',
        category_type: {
            value:  typeDefaultValue && typeDefaultValue[0] && typeDefaultValue[0]?.id,
            label:  typeDefaultValue && typeDefaultValue[0] && typeDefaultValue[0]?.name,
        },
        product_category_id: {
            value: categoryDefaultValue && categoryDefaultValue[0] && categoryDefaultValue[0]?.id,
            label: categoryDefaultValue && categoryDefaultValue[0] && categoryDefaultValue[0]?.attributes?.name,
        },
        image: singleProductCategory ? singleProductCategory.image : '',
    });
    const [errors, setErrors] = useState({
        name: '',
    });
   

    const editImg = singleProductCategory ? singleProductCategory.image : user;
    const newImg = productCategoryValue.image === false ? user : editImg;
    const [imagePreviewUrl, setImagePreviewUrl] = useState(newImg);
    const [selectImg, setSelectImg] = useState(null);
    const [isParent, setIsParent] = useState(editType=='parent' ? true : false);

    const disabled = selectImg ? false : singleProductCategory && singleProductCategory.name === productCategoryValue.name.trim() && singleProductCategory.parent_id === productCategoryValue.product_category_id[0]?.value;

    const handleImageChanges = (e) => {
        e.preventDefault();
        if (e.target.files.length > 0) {
            const file = e.target.files[0];
            if (file.type === 'image/jpeg' || file.type === 'image/png') {
                setSelectImg(file);
                const fileReader = new FileReader();
                fileReader.onloadend = () => {
                    setImagePreviewUrl(fileReader.result);
                };
                fileReader.readAsDataURL(file);
                setErrors('');
            }
        }
    };

    const handleValidation = () => {
        let errorss = {};
        let isValid = false;
        if (!productCategoryValue['name'].trim()) {
            errorss['name'] = getFormattedMessage('globally.input.name.validate.label');
        } else if ((productCategoryValue['name'] && productCategoryValue['name'].length > 50)) {
            errorss['name'] = getFormattedMessage('brand.input.name.valid.validate.label');
        } else {
            isValid = true;
        }
        setErrors(errorss);
        return isValid;
    };

    const onChangeInput = (e) => {
        e.preventDefault();
        setProductCategoryValue(inputs => ({...inputs, [e.target.name]: e.target.value}))
        setErrors('');
    };

    const onSTypesChange = (obj) => {
        setProductCategoryValue(inputs => ({...inputs, category_type: obj}));
        console.log(obj.value)
        if(obj.value=='child')
            setIsParent(false);
         else
           setIsParent(true);
    };
    const onProductCategoryChange = (obj) => {
        setProductCategoryValue(inputs => ({...inputs, product_category_id: obj}));
        setErrors('');
    };

    const onChange = (filter) => {
        fetchProductCategories(filter, true);
    };

    const prepareFormData = (data) => {
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('category_type', data.category_type?.value);
        if(data.category_type?.value && data.category_type?.value == 'child'){
           formData.append('product_category_id', data.product_category_id?.value);
        }
        if (selectImg) {
            formData.append('image', data.image);
        }
        return formData;
    };

    const onSubmit = (event) => {
        event.preventDefault();
        const valid = handleValidation();
        productCategoryValue.image = selectImg;
        if (singleProductCategory && valid) {
            if (!disabled) {
                productCategoryValue.image = selectImg;
                editProductCategory(singleProductCategory.id, prepareFormData(productCategoryValue), handleClose);
                clearField(false);
            }
        } else {
            if (valid) {
                setProductCategoryValue(productCategoryValue);
                addProductData(prepareFormData(productCategoryValue));
                clearField(false);
            }
        }
        window.location.reload();
        setSelectImg(null);
    };

    const clearField = () => {
        setProductCategoryValue({
            name: '',
            image: ''
        });
        setImagePreviewUrl(user);
        setErrors('');
        handleClose(false);
    };

    let categoryOptions=[];
    const itemsValue = productCategories?.length >= 0 && productCategories.map(product => {
        categoryOptions.push({ 
             value: product?.id,
             label: product?.attributes?.name,
      })
    });

    const slugFilterOptions = getFormattedOptions(categoryTypesOptions)
    const slugDefaultValue = slugFilterOptions.map((option) => {
        return {
            value: option.id,
            label: option.name
        }
    })

    return (
        <Modal show={show}
               onHide={clearField}
               keyboard={true}
               onShow={() => setTimeout(() => {
                   innerRef.current.focus();
               }, 1)}
        >
            <Form onKeyPress={(e) => {
                if (e.key === 'Enter') {
                    singleProductCategory ? onEdit(e) : onSubmit(e)
                }
            }}>
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='row'>
                        <div className='col-md-12'>
                                <label
                                    className='form-label'>{getFormattedMessage('globally.input.name.label')}: </label>
                                <span className='required'/>
                                <input type='text' name='name'
                                              placeholder={placeholderText('globally.input.name.placeholder.label')}
                                              className='form-control' ref={innerRef} autoComplete='off'
                                              onChange={(e) => onChangeInput(e)}
                                              value={productCategoryValue.name}/>
                                <span className='text-danger d-block fw-400 fs-small mt-2'>{errors['name'] ? errors['name'] : null}</span>
                        </div>
                        <div className='col-md-12'>
                             <ReactSelect multiLanguageOption={slugFilterOptions} onChange={e => onSTypesChange( e)} name='category_type'
                                title={'Type'}
                                value={productCategoryValue.category_type || ""}  errors={errors['category_type']}
                                placeholder={'Category type '}/>
                        </div>
                        {!isParent ? 
                        <div className='col-md-12'>
                        <ReactSelect title={getFormattedMessage('product.input.product-category.label')} 
                                                     placeholder={placeholderText('product.input.product-category.placeholder.label')}
                                                    name='product_category_id' 
                                                     value={productCategoryValue.product_category_id}
                                                     data={productCategories} onChange={onProductCategoryChange}
                                                      errors={errors['product_category_id']}/>
                        </div>
                        : null }
                        <ImagePicker imagePreviewUrl={imagePreviewUrl} handleImageChange={handleImageChanges}
                                     user={user} imageTitle={placeholderText('globally.input.change-logo.tooltip')}/>
                    </div>
                </Modal.Body>
            </Form>
            <ModelFooter onEditRecord={singleProductCategory} onSubmit={onSubmit} editDisabled={disabled}
                         clearField={clearField} addDisabled={!productCategoryValue.name.trim()} />
        </Modal>
    )
};
const mapStateToProps = (state) => {
    const {productCategories} = state;
    return {productCategories}
};

export default connect(mapStateToProps, {fetchProductCategory, editProductCategory, fetchProductCategories})(ProductCategoryForm);
