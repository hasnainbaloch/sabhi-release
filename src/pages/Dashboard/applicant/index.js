import React, { useState } from 'react';
import './Applicant.less';
import {
    Typography,
    Col,
    Row,
    Input,
    Button,
    Radio,
    Progress,
    Tabs,
    Image,
} from 'antd';
import {
    AudioOutlined,
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

const { Text, Link } = Typography;
const { Search } = Input;
const suffix = (
    <AudioOutlined
        style={{
            fontSize: 16,
            color: '#1890ff',
        }}
    />
);

const onSearch = (value) => {
    console.log(value);
};

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
    React.useEffect(async () => {
        const id = history.location?.applicantId
        setApplicantId(id);

        try {
            const res = await getApplicantDetails(id);

            if (res.status) {
                setApplicant(res.data.data?.applicant);
                setUserEditedData(res.data.data?.document?.userEditedData);
                setUserData(res.data.data?.document?.data);
                setReport(res.data.data?.documentReport);
                setIdCardFront(res.data.data?.document?.proof?.downloadHref);
                setIdCardBack(res.data.data?.document?.additionalProof?.downloadHref);
                setPhoto(res.data.data?.photo?.downloadHref);
                setScores({
                    sabhiScore: res.data.data.sabhiScore,
                    dataValidationScore: res.data.data.dataValidationScore,
                    dataConsistencyScore: res.data.data.dataConsistencyScore,
                    dataComparisonScore: res.data.data.dataComparisonScore,
                    visualAuthenticityScore: res.data.data.visualAuthenticityScore,
                });
                setLoading(false)
            } // setUserLoginState(res);
        } catch (error) {
            setLoading(false)
            console.log({
                error,
            }); // const defaultLoginFailureMessage = intl.formatMessage({
            //     id: 'pages.applicantList.failure',
            //     defaultMessage: error?.data?.message,
            // });
            // message.error(defaultLoginFailureMessage);
        }
    }, []);

    const approveDecline = async (status) => {
        try {
            const body = {
                checkId: applicantId,
                status
            }
            const res = await applicantApprovedOrDeclined(body);
        } catch (error) {
            console.log({ error });
        }
    }

    return (
        <div style={{ position: "relative" }}>
            {
                loading ?
                    <CustomeLoader />
                    :
                    <Row gutter={[16, 16]}>
                        <Col span={6}>
                            <UserDetails
                                photo={photo || '/icons/UserAvatar.svg'}
                                sabhiScore={scores?.sabhiScore}
                                applicant={userEditedData}
                                phoneNumber={applicant?.phoneNumber}
                            />
                        </Col>
                        <Col span={18}>
                            <div className={"applicantDetails"}>
                                <div className={"topBar"}>
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
                                            <img src="/icons/Back.svg" />
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
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <div
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                            }}
                                        >
                                            {/* <Radio.Group value={"large"} onChange={handleRadioChange}> */}
                                            <Radio.Group onChange={handleRadioChange}>
                                                {/* <Radio.Button value="large">National ID Card</Radio.Button>
                    <Radio.Button value="default">Passport</Radio.Button>
                    <Radio.Button value="small">Student Card</Radio.Button>
                    <Radio.Button value="small">Driver’s Lincense</Radio.Button> */}
                                                <Radio.Button
                                                    style={{
                                                        backgroundColor: '#1D6E71',
                                                        color: '#FFFFFF',
                                                    }}
                                                    className={"radioButtonActive"}
                                                >
                                                    National ID Card
                                                </Radio.Button>
                                                <Radio.Button
                                                    disabled
                                                    style={{
                                                        backgroundColor: '#FFFFFF',
                                                        color: '#1D6E71',
                                                    }}
                                                    className={"radioButton"}
                                                >
                                                    Passport
                                                </Radio.Button>
                                                <Radio.Button
                                                    disabled
                                                    style={{
                                                        backgroundColor: '#FFFFFF',
                                                        color: '#1D6E71',
                                                    }}
                                                    className={"radioButton"}
                                                >
                                                    Student Card
                                                </Radio.Button>
                                                <Radio.Button
                                                    disabled
                                                    style={{
                                                        backgroundColor: '#FFFFFF',
                                                        color: '#1D6E71',
                                                    }}
                                                    className={"radioButton"}
                                                >
                                                    Driver’s Lincense
                                                </Radio.Button>
                                            </Radio.Group>
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
                                        {/* <div style={{ marginLeft: "10px" }}> */}
                                        <Button
                                            disabled
                                            onClick={() => history.push('/dashboard/history')}
                                            type="link"
                                            icon={<HistoryOutlined />}
                                        >
                                            History
                                        </Button>
                                        {/* </div> */}
                                    </div>
                                </div>

                                <div className={"midSection"}>
                                    <div
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <div className={"midLeft"}>
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
                                            <Col
                                                span={12}
                                                style={{
                                                    paddingRight: '15px',
                                                }}
                                            >
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
                                            <Col
                                                span={12}
                                                style={{
                                                    paddingLeft: '15px',
                                                }}
                                            >
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
                                            <Col
                                                span={12}
                                                style={{
                                                    marginTop: '30px',
                                                    paddingRight: '15px',
                                                }}
                                            >
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
                                            <Col
                                                span={12}
                                                style={{
                                                    marginTop: '30px',
                                                    paddingLeft: '15px',
                                                }}
                                            >
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
                                        </div>
                                    </div>
                                    <div
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                        }}
                                    >
                                        <div />
                                        <div
                                            style={{
                                                marginRight: '45px',
                                            }}
                                        >
                                            <Button
                                                icon={<RightOutlined />}
                                                onClick={() => history.push({ pathname: `/dashboard/score-details`, applicantId: applicantId })}
                                            >
                                                More info
                                            </Button>
                                        </div>
                                    </div>
                                </div>

                                <div className={"lowerSection"}>
                                    <Col span={13} className={"lowerLeft"}>
                                        <div
                                            style={{
                                                width: '260px',
                                                marginLeft: '16px',
                                            }}
                                        >
                                            <Tabs activeKey={type} onChange={setType}>
                                                <Tabs.TabPane key="Version 1" tab="Version 1" />
                                                <Tabs.TabPane key="Version 2" tab="Version 2" disabled />
                                                <Tabs.TabPane key="Version 3" tab="Version 3" disabled />
                                            </Tabs>
                                        </div>
                                        {type === 'Version 1' && (
                                            <>
                                                <Details userEditedData={userEditedData} userData={userData} report={report} />
                                            </>
                                        )}
                                        {type === 'Version 2' && (
                                            <>
                                                <Details />
                                            </>
                                        )}
                                        {type === 'Version 3' && (
                                            <>
                                                <Details />
                                            </>
                                        )}
                                    </Col>
                                    <Col span={11} className={"lowerRight"}>
                                        <div
                                            style={{
                                                marginTop: '3px',
                                                marginLeft: '16px',
                                            }}
                                        >
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'space-between',
                                                    width: '100%',
                                                }}
                                            >
                                                <Button onClick={() => approveDecline("accepted")} type="primary">Approve</Button>
                                                <Button onClick={() => approveDecline("rejected")}
                                                    style={{
                                                        borderColor: '#FF4D4F',
                                                        color: '#FF4D4F',
                                                    }}
                                                >
                                                    Decline
                                                </Button>
                                                <Button
                                                    disabled
                                                    icon={
                                                        <FlagOutlined
                                                            style={{
                                                                fontSize: '12px',
                                                            }}
                                                        />
                                                    }
                                                />
                                                <Button
                                                    disabled
                                                    icon={
                                                        <DeleteOutlined
                                                            style={{
                                                                fontSize: '12px',
                                                            }}
                                                        />
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <div
                                            className={"headingWrapper"}
                                            style={{
                                                marginTop: '27px',
                                            }}
                                        >
                                            <Text className={"heading"}>Images:</Text>
                                        </div>
                                        <div
                                            style={{
                                                marginLeft: '16px',
                                            }}
                                        >
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
                                                <div
                                                    style={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                    }}
                                                >
                                                    <Button
                                                        onClick={() => setShowFront(true)}
                                                        type="primary"
                                                        style={{
                                                            marginRight: '8px',
                                                        }}
                                                    >
                                                        Front
                                                    </Button>
                                                    <Button onClick={() => setShowFront(false)}>Back</Button>
                                                </div>
                                            </div>
                                            <div>
                                                {showFront ? (
                                                    <Image
                                                        style={{
                                                            marginTop: '10px',
                                                        }}
                                                        className={"idCard"}
                                                        src={idCardFront || '/images/defaultIDCard.svg'}
                                                    />
                                                ) : (
                                                    <Image
                                                        style={{
                                                            marginTop: '10px',
                                                        }}
                                                        className={"idCard"}
                                                        src={idCardBack || '/images/defaultIDCard.svg'}
                                                    />
                                                )}
                                            </div>
                                            <div
                                                style={{
                                                    marginTop: '24px',
                                                }}
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
