import React, { useEffect, useState, useContext } from 'react';
import './Applicant.less';
import {
    Typography,
    Col,
    Row,
    Button,
    Radio,
    Progress,
    Tabs,
    Image,
} from 'antd';
import {
    DeleteOutlined,
    FileAddOutlined,
    FlagOutlined,
    HistoryOutlined,
    RightOutlined,
} from '@ant-design/icons';
import Details from '../../../components/details';
import UserDetails from './../../../components/userDetails';
import { useHistory } from 'react-router-dom';
import { applicantApprovedOrDeclined, getApplicantDetails } from '../../../services/api';
import { CustomeLoader } from '../../../components/loader';
import { SocketContext } from '../../../context/Socket';

const { Group, Button: RadioButton } = Radio

const { Text } = Typography;

const handleRadioChange = () => {
    console.log('change');
};

const Applicant = (props) => {
    const [type, setType] = useState('Version 1');
    const [applicant, setApplicant] = useState(null);
    const [userEditedData, setUserEditedData] = useState(null);
    const [userData, setUserData] = useState(null);
    const [report, setReport] = useState(null);
    const [applicantId, setApplicantId] = useState(null);
    const [scores, setScores] = useState(null);
    const [idCardFront, setIdCardFront] = useState(null);
    const [idCardBack, setIdCardBack] = useState(null);
    const [showFront, setShowFront] = useState(true);
    const [photo, setPhoto] = useState(true);
    const [loading, setLoading] = useState(true);
    const history = useHistory();

    useEffect(() => {
        async function fetchApplicantDetails() {
            const id = history.location?.applicantId
            setApplicantId(id);

            try {
                const { data, status } = await getApplicantDetails(id);

                if (status) {
                    setApplicant(data?.data?.applicant);
                    setUserEditedData(data?.data?.document?.userEditedData);
                    setUserData(data?.data?.document?.data);
                    setReport(data?.data?.documentReport);
                    setIdCardFront(data?.data?.document?.proof?.downloadHref);
                    setIdCardBack(data?.data?.document?.additionalProof?.downloadHref);
                    setPhoto(data?.data?.photo?.downloadHref);
                    setScores({
                        sabhiScore: data?.data.sabhiScore,
                        dataValidationScore: data?.data.dataValidationScore,
                        dataConsistencyScore: data?.data.dataConsistencyScore,
                        dataComparisonScore: data?.data.dataComparisonScore,
                        visualAuthenticityScore: data?.data.visualAuthenticityScore,
                        imageIntegrityScore: data?.data.imageIntegrityScore,
                        compromisedDocumentScore: data?.data.compromisedDocumentScore,
                    });
                    setLoading(false)
                }
            }
            catch (error) {
                setLoading(false)
                console.log(error, 'error')
            }
        }
        fetchApplicantDetails()
    }, [])

    const approveDecline = async (status) => {
        setLoading(true)
        try {
            const body = {
                checkId: applicantId,
                status
            }
            await applicantApprovedOrDeclined(body);
            history.push("/dashboard")
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.log(error, 'error')
        }
    }

    return (
        <div style={{ position: "relative" }}>
            {
                loading ?
                    <CustomeLoader />
                    :
                    <Row style={{ background: "#f0f2f5" }}>
                        <Col span={6}>
                            <UserDetails
                                photo={photo || '/icons/UserAvatar.svg'}
                                sabhiScore={scores?.sabhiScore}
                                applicant={userEditedData}
                                phoneNumber={applicant?.phoneNumber}
                            />
                        </Col>
                        <Col span={18}>
                            <div className="">
                                <div className="topBar">
                                    <div
                                        style={{
                                            display: 'flex',
                                            alignItems: 'start',
                                            justifyContent: 'space-between',
                                            width: '100%',
                                        }}
                                    >
                                        <div
                                            onClick={() => history.push(`/dashboard`)}
                                            style={{
                                                marginLeft: '16px',
                                                cursor: 'pointer',
                                                display: 'flex',
                                                alignItems: 'center',
                                                marginBottom: '20px',
                                            }}
                                        >
                                            <img alt="back" src="/icons/Back.svg" />
                                            <Text
                                                style={{
                                                    fontSize: '14px',
                                                    marginLeft: '10px',
                                                    color: '#1890FF',
                                                }}
                                            >
                                                Document Details
                                            </Text>
                                        </div>
                                    </div>
                                    <div
                                        style={{
                                            display: 'flex',
                                            alignItems: 'start',
                                            width: '100%',
                                            justifyContent: 'space-between',
                                        }}
                                    >
                                        <div
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                            }}
                                        >
                                            {/* <Radio.Group value={"large"} onChange={handleRadioChange}> */}
                                            <Group buttonStyle="solid" onChange={handleRadioChange}>
                                                {/* <Radio.Button value="large">National ID Card</Radio.Button>
                                                <Radio.Button value="default">Passport</Radio.Button>
                                                <Radio.Button value="small">Student Card</Radio.Button>
                                                <Radio.Button value="small">Driver’s Lincense</Radio.Button> */}
                                                <RadioButton
                                                // className={"radioButtonActive"}
                                                >
                                                    National ID Card
                                                </RadioButton>
                                                <RadioButton
                                                    disabled
                                                // className={"radioButton"}
                                                >
                                                    Passport
                                                </RadioButton>
                                                <RadioButton
                                                    disabled
                                                // className={"radioButton"}
                                                >
                                                    Student Card
                                                </RadioButton>
                                                <RadioButton
                                                    disabled
                                                // className={"radioButton"}
                                                >
                                                    Driver’s Lincense
                                                </RadioButton>
                                            </Group>
                                            <div
                                                style={{
                                                    marginLeft: '10px',
                                                }}
                                            >
                                                <Button disabled type="dashed" icon={<FileAddOutlined />}>
                                                    Add New Document
                                                </Button>
                                            </div>
                                        </div>
                                        <Button
                                            disabled
                                            onClick={() => history.push('/dashboard/history')}
                                            type="link"
                                            icon={<HistoryOutlined />}
                                        >
                                            History
                                        </Button>
                                    </div>
                                </div>

                                <div className="midSection">
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <div className="midLeft">
                                            <div>
                                                <Progress
                                                    className={
                                                        scores?.sabhiScore < 50
                                                            ? 'red-text'
                                                            : scores?.sabhiScore < 75
                                                                ? 'orange-text'
                                                                : 'green-text'
                                                    }
                                                    strokeColor={
                                                        scores?.sabhiScore < 50
                                                            ? '#CF1322'
                                                            : scores?.sabhiScore < 75
                                                                ? '#D46B08'
                                                                : '#1D6E71'
                                                    }
                                                    type="circle"
                                                    percent={scores?.sabhiScore}
                                                    width={120}
                                                />
                                            </div>
                                        </div>
                                        <div className={"midRight"}>
                                            <Col span={12} style={{ paddingRight: '15px', display: "flex", flexDirection: "column" }}>
                                                <Text>Data Validation</Text>
                                                <Progress
                                                    className={
                                                        scores?.dataValidationScore < 50
                                                            ? 'red-text'
                                                            : scores?.dataValidationScore < 75
                                                                ? 'orange-text'
                                                                : 'green-text'
                                                    }
                                                    strokeColor={
                                                        scores?.dataValidationScore < 50
                                                            ? '#CF1322'
                                                            : scores?.dataValidationScore < 75
                                                                ? '#D46B08'
                                                                : '#1D6E71'
                                                    }
                                                    percent={scores?.dataValidationScore}
                                                    steps={10}
                                                />
                                            </Col>
                                            <Col span={12} style={{ paddingLeft: '15px', display: "flex", flexDirection: "column" }}>
                                                <Text>Data Consistency</Text>
                                                <Progress
                                                    className={
                                                        scores?.dataConsistencyScore < 50
                                                            ? 'red-text'
                                                            : scores?.dataConsistencyScore < 75
                                                                ? 'orange-text'
                                                                : 'green-text'
                                                    }
                                                    strokeColor={
                                                        scores?.dataConsistencyScore < 50
                                                            ? '#CF1322'
                                                            : scores?.dataConsistencyScore < 75
                                                                ? '#D46B08'
                                                                : '#1D6E71'
                                                    }
                                                    percent={scores?.dataConsistencyScore}
                                                    steps={10}
                                                />
                                            </Col>
                                            <Col span={12} style={{ marginTop: '30px', paddingRight: '15px', display: "flex", flexDirection: "column" }}>
                                                <Text>Data Comparison</Text>
                                                <Progress
                                                    className={
                                                        scores?.dataComparisonScore < 50
                                                            ? 'red-text'
                                                            : scores?.dataComparisonScore < 75
                                                                ? 'orange-text'
                                                                : 'green-text'
                                                    }
                                                    strokeColor={
                                                        scores?.dataComparisonScore < 50
                                                            ? '#CF1322'
                                                            : scores?.dataComparisonScore < 75
                                                                ? '#D46B08'
                                                                : '#1D6E71'
                                                    }
                                                    percent={scores?.dataComparisonScore}
                                                    steps={10}
                                                />
                                            </Col>
                                            <Col span={12} style={{ marginTop: '30px', paddingLeft: '15px', display: "flex", flexDirection: "column" }}>
                                                <Text>Visual Document Authenticity</Text>
                                                <Progress
                                                    className={
                                                        scores?.visualAuthenticityScore < 50
                                                            ? 'red-text'
                                                            : scores?.visualAuthenticityScore < 75
                                                                ? 'orange-text'
                                                                : 'green-text'
                                                    }
                                                    strokeColor={
                                                        scores?.visualAuthenticityScore < 50
                                                            ? '#CF1322'
                                                            : scores?.visualAuthenticityScore < 75
                                                                ? '#D46B08'
                                                                : '#1D6E71'
                                                    }
                                                    percent={scores?.visualAuthenticityScore}
                                                    steps={10}
                                                />
                                            </Col>
                                            <Col span={12} style={{ marginTop: '30px', display: "flex", flexDirection: "column" }}>
                                                <Text>Face Match</Text>
                                                <Progress
                                                    className={
                                                        scores?.imageIntegrityScore < 50
                                                            ? 'red-text'
                                                            : scores?.imageIntegrityScore < 75
                                                                ? 'orange-text'
                                                                : 'green-text'
                                                    }
                                                    strokeColor={
                                                        scores?.imageIntegrityScore < 50
                                                            ? '#CF1322'
                                                            : scores?.imageIntegrityScore < 75
                                                                ? '#D46B08'
                                                                : '#1D6E71'
                                                    }
                                                    percent={scores?.imageIntegrityScore}
                                                    steps={10}
                                                />
                                            </Col>
                                            <Col span={12} style={{ marginTop: '30px', paddingLeft: '15px', display: "flex", flexDirection: "column" }}>
                                                <Text>Liveness Detection</Text>
                                                <Progress
                                                    className={
                                                        scores?.compromisedDocumentScore < 50
                                                            ? 'red-text'
                                                            : scores?.compromisedDocumentScore < 75
                                                                ? 'orange-text'
                                                                : 'green-text'
                                                    }
                                                    strokeColor={
                                                        scores?.compromisedDocumentScore < 50
                                                            ? '#CF1322'
                                                            : scores?.compromisedDocumentScore < 75
                                                                ? '#D46B08'
                                                                : '#1D6E71'
                                                    }
                                                    percent={scores?.compromisedDocumentScore}
                                                    steps={10}
                                                />
                                            </Col>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'end' }}>
                                        <div style={{ marginRight: '45px' }}>
                                            <Button
                                                icon={<RightOutlined />}
                                                onClick={() => history.push({ pathname: `/dashboard/score-details`, applicantId })}
                                            >
                                                More info
                                            </Button>
                                        </div>
                                    </div>
                                </div>

                                <div className="lowerSection">
                                    <Col span={13} className="lowerLeft">
                                        <div style={{ marginLeft: '16px', marginBottom: '8px' }}>
                                            <Tabs activeKey={type} onChange={setType}>
                                                <Tabs.TabPane key="Version 1" tab="Version 1" />
                                                <Tabs.TabPane key="Version 2" tab="Version 2" disabled />
                                                <Tabs.TabPane key="Version 3" tab="Version 3" disabled />
                                            </Tabs>
                                        </div>
                                        {type === 'Version 1' && <Details userEditedData={userEditedData} userData={userData} report={report} />}
                                        {type === 'Version 2' && <Details />}
                                        {type === 'Version 3' && <Details />}
                                    </Col>
                                    <Col span={11} className="lowerRight">
                                        <div style={{ marginTop: '3px', marginLeft: '16px' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <Button size="large" onClick={() => approveDecline("accepted")} type="primary">Approve</Button>
                                                <Button size="large" onClick={() => approveDecline("rejected")} style={{ borderColor: '#FF4D4F', color: '#FF4D4F' }}>
                                                    Decline
                                                </Button>
                                                <Button size="large" disabled icon={<FlagOutlined style={{ fontSize: '16px' }} />} />
                                                <Button size="large" disabled icon={<DeleteOutlined style={{ fontSize: '16px' }} />} />
                                            </div>
                                        </div>
                                        <div className="headingWrapper" style={{ marginTop: '27px' }}>
                                            <Text className="heading">Images:</Text>
                                        </div>
                                        <div style={{ marginLeft: '16px' }}>
                                            <div
                                                style={{
                                                    marginTop: '10px',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'space-between',
                                                }}
                                            >
                                                <Text
                                                    style={{
                                                        opacity: '0.5',
                                                        fontSize: '12px',
                                                    }}
                                                >
                                                    National ID Card
                                                </Text>
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    <Button
                                                        onClick={() => setShowFront(true)}
                                                        type={showFront && "primary"}
                                                        style={{ marginRight: '8px' }}
                                                    >
                                                        Front
                                                    </Button>
                                                    <Button type={!showFront && "primary"} onClick={() => setShowFront(false)}>Back</Button>
                                                </div>
                                            </div>
                                            <div>
                                                {showFront ? (
                                                    <Image
                                                        style={{ marginTop: '10px', objectFit: "contain" }}
                                                        className={"idCard"}
                                                        src={idCardFront || '/images/defaultIDCard.svg'}
                                                    />
                                                ) : (
                                                    <Image
                                                        style={{ marginTop: '10px' }}
                                                        className={"idCard"}
                                                        src={idCardBack || '/images/defaultIDCard.svg'}
                                                    />
                                                )}
                                            </div>
                                            <div
                                                style={{ marginTop: '24px' }}
                                            >
                                                <Text
                                                    style={{
                                                        opacity: '0.5',
                                                        fontSize: '12px',
                                                    }}
                                                >
                                                    Selfie video
                                                </Text>
                                            </div>
                                            <div>
                                                <Image
                                                    style={{
                                                        marginTop: '10px',
                                                    }}
                                                    className={"selfieVideo"}
                                                    src={photo || '/images/defaultSelfieVideo.svg'}
                                                />
                                            </div>
                                        </div>
                                    </Col>
                                </div>
                            </div>
                        </Col>
                    </Row>
            }
        </div>
    );
};

export default Applicant;
