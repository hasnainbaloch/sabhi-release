import React from 'react'
import { Alert } from 'antd';

const AlertBox = (props) => {

    return (
        <div>
            <Alert message={props.message} type={props.type} style={{ textAlign: "center" }} />
        </div>
    )
}

export default AlertBox