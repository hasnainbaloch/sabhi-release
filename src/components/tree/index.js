import React from 'react'
import { Tree, Typography } from 'antd';
import "./Tree.less"
import { CaretDownFilled, DownCircleFilled, DownOutlined } from '@ant-design/icons';

const { Text, Link } = Typography;

const CustomTree = (props) => {

    const data = props.data

    const treeData = [
        {
            title: <span className={"treeTitle"}>
                {props.grandTitle}
            </span>,
            key: '1',
            children: data.map((item, i) => {
                return {
                    title: <span className={"treeSubTitle"}>
                        {
                            item.checked ?
                                <img src="/icons/CheckedGreen.svg" style={{ width: "12px", height: "12px", marginRight: "10px" }} />
                                :
                                <img src="/icons/Warning.svg" style={{ width: "12px", height: "12px", marginRight: "10px" }} />
                        }
                        <Text className="opacityHalf">{item.treeTitle}</Text>
                    </span>,
                    key: `1-${i + 1}`,
                    children: item.children.map((child, j) => {
                        return {
                            title: <div style={{ display: "flex", alignItems: "center" }}>
                                <Text className={"childrenTitle"}> {child.childrenTitle}:</Text>
                                <Text className={"childrenValue"}> {child.childrenValue}</Text>
                            </div>,
                            key: `1-${i + 1}-${j + 1}`,
                            children: child.subchildren?.map((subchild, k) => {
                                return {
                                    title: <div style={{ display: "flex", alignItems: "center" }}>
                                        <Text className={"childrenTitle"}> {subchild.subChildrenTitle}:</Text>
                                        <Text className={"childrenValue"}> {subchild.subChildrenValue}</Text>
                                    </div>,
                                    key: `1-${i + 1}-${j + 1}-${k + 1}`,
                                }
                            })
                        }
                    })
                }
            })

        },
    ];


    return (
        <div>
            <Tree
                showLine
                switcherIcon={<CaretDownFilled style={{ marginTop: "5px" }} />}
                blockNode
                defaultExpandedKeys={['1']}
                treeData={treeData}
            />
        </div>
    )
}

export default CustomTree
