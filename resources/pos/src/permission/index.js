import React,  {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {fetchConfig} from "../store/action/configAction";
import {Tokens} from '../constants';

let is_addedAble = true;
let is_editAdable =true;
let is_deleteAdable =true;

const defaultCutomView = (props) => {
    const {isLoading,fetchConfig, config} = props;

 
    const [permissions, setPermission] = useState();
    useEffect(() => {
            fetchConfig()
        
    }, []);
     //  let user_permissions = new Set(val);
        //   is_addedAble = user_permissions.has('manage_currency-create') ? true : false
        //   is_editAdable = user_permissions.has('manage_currency-edit') ? true : false
        //   is_deleteAdable = user_permissions.has('manage_currency-delete') ? true : false
    return ( {config} )

};
 
      
const mapStateToProps = (state) => {
    const { isLoading, config} = state;
    return { isLoading, config}
};

export default connect(mapStateToProps, { fetchConfig})(defaultCutomView);

