import React, {useState} from 'react';
import {connect} from 'react-redux';
import {Button} from 'react-bootstrap-v5';
import {Filters} from '../../constants';
import {addStatusType} from '../../store/action/tranStatusTypesAction';
import StatusTypeForm from './StatusTypeForm';
import {getFormattedMessage} from '../../shared/sharedMethod';

const CreateStatusType = (props) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(!show);
    const {addStatusType} = props;

    const addFormData = (formValue) => {
        addStatusType(formValue, Filters.OBJ);
    };

    return (
        <div className='text-end w-sm-auto w-100'>
            <Button variant='primary mb-lg-0 mb-4' onClick={handleClose}>
                {getFormattedMessage('status-types.create.title')}
            </Button>
            <StatusTypeForm addItemFormData={addFormData} handleClose={handleClose} show={show}
                          title={getFormattedMessage('status-types.create.title')}/>
        </div>
    )
};

export default connect(null, {addStatusType})(CreateStatusType);
