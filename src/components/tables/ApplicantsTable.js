import { Table, Skeleton, Space } from 'antd';
import moment from 'moment';
import { useState, } from 'react';
import { useHistory } from 'react-router-dom';


const TableComponent = (props) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const history = useHistory();
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
    })

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            // render: name => `${name.first} ${name.last}`,
        },
        {
            title: 'ID',
            dataIndex: 'id',
            filters: [{ text: 'id', value: 'id' }],
        },
        {
            title: 'Date',
            dataIndex: 'date',
            sorter: true,
        },
        {
            title: 'Contact',
            dataIndex: 'email',
        },
        {
            title: 'Document',
            dataIndex: 'document',
        },
        {
            title: 'Score',
            dataIndex: 'score',
        },
        {
            title: 'Status',
            dataIndex: 'status',
        },
    ];

    console.log({ data: props.data });


    const dataSource = [
        ...props.data.map((item, i) => {
            return {
                key: i,
                name: item.applicant?.report?.data?.nameEnglish || "-- --",
                id: item.applicant?._id || "-- --",
                checksId: item._id || "-- --",
                date: moment(item.createdAt).format("MMM DD HH:MM:SS") || "-- --",
                email: item.email || "-- --",
                document: item.document || "-- --",
                score: "" + item.sabhiScore || "-- --",
                status: item.status || "-- --",
            };
        })
    ];



    const handleTableChange = () => {
        console.log('handleTableChange');
    }

    const handleNavigation = (record, index) => {
        return {
            onClick: () => {
                history.push({ pathname: `/dashboard/applicant`, applicantId: record?.checksId })
            }
        };
    }

    return (
        props.showSkeleton ?
            <div style={{ padding: "20px" }}>
                <Space style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }} justify="space-between">
                    <Skeleton.Button style={{ width: 120 }} active size={"small"} shape={"square"} />
                    <Skeleton.Button style={{ width: 120 }} active size={"small"} shape={"square"} />
                    <Skeleton.Button style={{ width: 120 }} active size={"small"} shape={"square"} />
                    <Skeleton.Button style={{ width: 120 }} active size={"small"} shape={"square"} />
                    <Skeleton.Avatar style={{ width: 120 }} active size={"small"} shape={"square"} />
                    <Skeleton.Avatar style={{ width: 120 }} active size={"small"} shape={"square"} />
                    <Skeleton.Avatar style={{ width: 120 }} active size={"small"} shape={"square"} />
                </Space>
                <div style={{ marginTop: "30px" }}>
                    <Skeleton.Input style={{ width: 1070 }} active size={"small"} />
                </div>
                <div style={{ marginTop: "25px" }}>
                    <Skeleton.Input style={{ width: 1070 }} active size={"small"} />
                </div>
                <div style={{ marginTop: "25px" }}>
                    <Skeleton.Input style={{ width: 1070 }} active size={"small"} />
                </div>
                <div style={{ marginTop: "25px" }}>
                    <Skeleton.Input style={{ width: 1070 }} active size={"small"} />
                </div>
                <div style={{ marginTop: "25px" }}>
                    <Skeleton.Input style={{ width: 1070 }} active size={"small"} />
                </div>
            </div>
            :
            <Table
                columns={columns}
                dataSource={dataSource}
                pagination={pagination}
                loading={loading}
                search={false}
                onRow={handleNavigation}
                // rowClassName={styles.cursor}
                onChange={handleTableChange}
            // request={() => {
            //   console.log('refresh is calling ...');
            //   props.handleRefresh()
            // }}
            />
    );
};

export default TableComponent;
