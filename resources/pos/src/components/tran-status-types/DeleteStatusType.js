import React from 'react';
import {connect} from 'react-redux';
import {deleteStatusType} from '../../store/action/tranStatusTypesAction';
import DeleteModel from '../../shared/action-buttons/DeleteModel';
import {getFormattedMessage} from '../../shared/sharedMethod';

const DeleteShipping = (props) => {
    const {deleteStatusType, onDelete, deleteModel, onClickDeleteModel} = props;

    const deleteUserClick = () => {
        deleteStatusType(onDelete.id);
        onClickDeleteModel(false);
    };

    return (
        <div>
            {deleteModel && <DeleteModel onClickDeleteModel={onClickDeleteModel} deleteModel={deleteModel}
                                         deleteUserClick={deleteUserClick} name={getFormattedMessage('status-types.title')}/>}
        </div>
    )
};

export default connect(null, {deleteStatusType})(DeleteShipping);
