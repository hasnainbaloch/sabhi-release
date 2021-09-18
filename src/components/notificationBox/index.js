import { SettingOutlined } from '@ant-design/icons'
import { Button, Typography } from 'antd'
import React from 'react'
import './NotificationBox.less'

const { Title, Text } = Typography

const NotificationBox = (props) => {
    return (
        <div className="wrapper">
            <div className="header">
                <div style={{ display: "flex", alignItems: "center" }}>
                    <Text style={{ fontSize: "20px", fontWeight: "500" }}>Activation Status</Text>
                    <div className="sandboxed">
                        <Text>Sandboxed</Text>
                    </div>
                </div>
                <div style={{ marginLeft: "42px" }}>
                    <Button icon={<SettingOutlined />}></Button>
                </div>
            </div>
            <div className="details">
                <div style={{ borderRight: "1px solid silver", paddingRight: "20px", display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <Text style={{ color: "rgba(0, 0, 0, 0.45)", fontSize: '14px' }}>Applications</Text>
                    <Text style={{ fontSize: '24px' }}>235</Text>
                </div>
                <div style={{ borderRight: "1px solid silver", paddingRight: "20px", display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <Text style={{ color: "rgba(0, 0, 0, 0.45)", fontSize: '14px' }}>Applications</Text>
                    <Text style={{ fontSize: '24px' }}>8 <span style={{ fontSize: "16px" }}>/15</span></Text>
                </div>
                <div style={{ paddingRight: "20px", display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <Text style={{ color: "rgba(0, 0, 0, 0.45)", fontSize: '14px' }}>Applications</Text>
                    <Text style={{ fontSize: '16px', marginTop: "9px" }}>15/10/21</Text>
                </div>
            </div>
        </div>
    )
}

export default NotificationBox