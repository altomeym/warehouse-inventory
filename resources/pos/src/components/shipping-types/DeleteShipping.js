import React from 'react';
import {connect} from 'react-redux';
import {deleteShippingType} from '../../store/action/shippingAction';
import DeleteModel from '../../shared/action-buttons/DeleteModel';
import {getFormattedMessage} from '../../shared/sharedMethod';

const DeleteShipping = (props) => {
    const {deleteShippingType, onDelete, deleteModel, onClickDeleteModel} = props;

    const deleteUserClick = () => {
        deleteShippingType(onDelete.id);
        onClickDeleteModel(false);
    };

    return (
        <div>
            {deleteModel && <DeleteModel onClickDeleteModel={onClickDeleteModel} deleteModel={deleteModel}
                                         deleteUserClick={deleteUserClick} name={getFormattedMessage('shipping.title')}/>}
        </div>
    )
};

export default connect(null, {deleteShippingType})(DeleteShipping);
