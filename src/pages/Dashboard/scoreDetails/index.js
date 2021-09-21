import React, { useState } from 'react';
import './ScoreDetails.less';
import { Typography, Col, Row, Button, Radio } from 'antd';
import {
    DownloadOutlined,
    FlagFilled,
} from '@ant-design/icons';
import AlertBox from './../../../components/alert';
import Tree from './../../../components/tree';
import UserDetails from './../../../components/userDetails';
import { getApplicantDetails } from '../../../services/api';
import { useHistory } from 'react-router-dom';
import { CustomeLoader } from '../../../components/loader';
import { getTreeArray } from "./../../../heplers/ApplicantHelper"

const { Text, Link } = Typography;

const ScoreDetail = (props) => {
    const [report, setReport] = React.useState(null);
    const [applicantId, setApplicantId] = React.useState(null);
    const [dataComparison, setDataComparison] = React.useState(null);
    const [visualAuthenticity, setVisualAuthenticity] = React.useState(null);
    const [imageIntegrity, setImageIntegrity] = React.useState(null);
    const [compromisedDocument, setCompromisedDocument] = React.useState(null);
    const [dataConsistency, setDataConsistency] = React.useState(null);
    const [dataValidation, setDataValidation] = React.useState(null);
    const [photo, setPhoto] = React.useState(true);
    const [loading, setLoading] = React.useState(true);
    const [userEditedData, setUserEditedData] = React.useState(null);
    const [scores, setScores] = React.useState(null);
    const [applicant, setApplicant] = useState(null);
    const history = useHistory();

    const [comparison, setComparison] = useState(null)

    React.useEffect(async () => {
        const id = history.location?.applicantId
        setApplicantId(id);

        try {
            const res = await getApplicantDetails(id);

            if (res.status) {
                setComparison(getTreeArray(res.data?.data?.documentReport?.breakdown?.dataComparison?.breakdown))
                console.log({ dataComparison: res.data?.data?.documentReport?.breakdown?.dataComparison?.breakdown })
                console.log({ comparison })

                setReport(res.data?.data?.documentReport);
                setUserEditedData(res.data?.data?.document?.userEditedData);
                setDataComparison(res.data?.data?.documentReport?.breakdown?.dataComparison?.breakdown);
                setVisualAuthenticity(res.data?.data?.documentReport?.breakdown?.visualAuthenticity?.breakdown);
                setImageIntegrity(res.data?.data?.documentReport?.breakdown?.imageIntegrity?.breakdown);
                setCompromisedDocument(res.data?.data?.documentReport?.breakdown?.compromisedDocument?.breakdown);
                setDataConsistency(res.data?.data?.documentReport?.breakdown?.dataConsistency?.breakdown);
                setDataValidation(res.data?.data?.documentReport?.breakdown?.dataValidation?.breakdown);
                setPhoto(res.data?.data?.photo?.downloadHref);
                setApplicant(res.data?.data?.applicant);
                setScores({
                    sabhiScore: res.data?.data.sabhiScore,
                    dataValidationScore: res.data?.data.dataValidationScore,
                    dataConsistencyScore: res.data?.data.dataConsistencyScore,
                    dataComparisonScore: res.data?.data.dataComparisonScore,
                    visualAuthenticityScore: res.data?.data.visualAuthenticityScore,
                });
                setLoading(false)
            }
        } catch (error) {
            setLoading(false)
            console.log({
                error,
            });
        }
    }, []);


    // const comparisonData = [
    //     ...comparison.map((item, i) => {

    //     })
    // ]

    const treeData = [
        {
            treeTitle: 'Date of expiry',
            checked: dataComparison?.dateOfExpiry?.result === 'clear',
            children: [
                {
                    childrenTitle: 'Properties',
                    subchildren: [
                        {
                            subChildrenTitle: 'Threshold',
                            subChildrenValue: dataComparison?.dateOfExpiry?.properties?.threshold,
                        },
                        {
                            subChildrenTitle: 'Score',
                            subChildrenValue: dataComparison?.dateOfExpiry?.properties?.score,
                        },
                    ],
                },
                {
                    childrenTitle: 'Result',
                    childrenValue: dataComparison?.dateOfExpiry?.result,
                },
            ],
        },
        {
            treeTitle: 'Issuing country',
            checked: dataComparison?.issuingCountry?.result === 'clear',
            children: [
                {
                    childrenTitle: 'Properties',
                    subchildren: [
                        {
                            subChildrenTitle: 'Threshold',
                            subChildrenValue: dataComparison?.issuingCountry?.properties?.threshold,
                        },
                        {
                            subChildrenTitle: 'Score',
                            subChildrenValue: dataComparison?.issuingCountry?.properties?.score,
                        },
                    ],
                },
                {
                    childrenTitle: 'Result',
                    childrenValue: dataComparison?.issuingCountry?.result,
                },
            ],
        },
        {
            treeTitle: 'Document type',
            checked: dataComparison?.documentType?.result === 'clear',
            children: [
                {
                    childrenTitle: 'Properties',
                    subchildren: [
                        {
                            subChildrenTitle: 'Threshold',
                            subChildrenValue: dataComparison?.documentType?.properties?.threshold,
                        },
                        {
                            subChildrenTitle: 'Score',
                            subChildrenValue: dataComparison?.documentType?.properties?.score,
                        },
                    ],
                },
                {
                    childrenTitle: 'Result',
                    childrenValue: dataComparison?.documentType?.result,
                },
            ],
        },
        {
            treeTitle: 'Document numbers',
            checked: dataComparison?.documentNumbers?.result === 'clear',
            children: [
                {
                    childrenTitle: 'Properties',
                    subchildren: [
                        {
                            subChildrenTitle: 'Threshold',
                            subChildrenValue: dataComparison?.documentNumbers?.properties?.threshold,
                        },
                        {
                            subChildrenTitle: 'Score',
                            subChildrenValue: dataComparison?.documentNumbers?.properties?.score,
                        },
                    ],
                },
                {
                    childrenTitle: 'Result',
                    childrenValue: dataComparison?.documentNumbers?.result,
                },
            ],
        },
        {
            treeTitle: 'Gender',
            checked: dataComparison?.gender?.result === 'clear',
            children: [
                {
                    childrenTitle: 'Properties',
                    subchildren: [
                        {
                            subChildrenTitle: 'Threshold',
                            subChildrenValue: dataComparison?.gender?.properties?.threshold,
                        },
                        {
                            subChildrenTitle: 'Score',
                            subChildrenValue: dataComparison?.gender?.properties?.score,
                        },
                    ],
                },
                {
                    childrenTitle: 'Result',
                    childrenValue: dataComparison?.gender?.result,
                },
            ],
        },
        {
            treeTitle: 'Date of birth',
            checked: dataComparison?.dateOfBirth?.result === 'clear',
            children: [
                {
                    childrenTitle: 'Properties',
                    subchildren: [
                        {
                            subChildrenTitle: 'Threshold',
                            subChildrenValue: dataComparison?.dateOfBirth?.properties?.threshold,
                        },
                        {
                            subChildrenTitle: 'Score',
                            subChildrenValue: dataComparison?.dateOfBirth?.properties?.score,
                        },
                    ],
                },
                {
                    childrenTitle: 'Result',
                    childrenValue: dataComparison?.dateOfBirth?.result,
                },
            ],
        },
    ];

    const visualAuthenticityData = [
        {
            treeTitle: 'Digital tampering',
            checked: visualAuthenticity?.digitalTampering?.result === 'clear',
            children: [
                {
                    childrenTitle: 'Properties',
                    subchildren: [
                        {
                            subChildrenTitle: 'Threshold',
                            subChildrenValue: visualAuthenticity?.digitalTampering?.properties?.threshold,
                        },
                        {
                            subChildrenTitle: 'Score',
                            subChildrenValue: visualAuthenticity?.digitalTampering?.properties?.score,
                        },
                    ],
                },
                {
                    childrenTitle: 'Result',
                    childrenValue: visualAuthenticity?.digitalTampering?.result,
                },
            ],
        },
        {
            treeTitle: 'Face detection',
            checked: visualAuthenticity?.faceDetection?.result === 'clear',
            children: [
                {
                    childrenTitle: 'Properties',
                    subchildren: [
                        {
                            subChildrenTitle: 'Threshold',
                            subChildrenValue: visualAuthenticity?.faceDetection?.properties?.threshold,
                        },
                        {
                            subChildrenTitle: 'Score',
                            subChildrenValue: visualAuthenticity?.faceDetection?.properties?.score,
                        },
                    ],
                },
                {
                    childrenTitle: 'Result',
                    childrenValue: visualAuthenticity?.faceDetection?.result,
                },
            ],
        },
        {
            treeTitle: 'Fonts',
            checked: visualAuthenticity?.fonts?.result === 'clear',
            children: [
                {
                    childrenTitle: 'Properties',
                    subchildren: [
                        {
                            subChildrenTitle: 'Threshold',
                            subChildrenValue: visualAuthenticity?.fonts?.properties?.threshold,
                        },
                        {
                            subChildrenTitle: 'Score',
                            subChildrenValue: visualAuthenticity?.fonts?.properties?.score,
                        },
                    ],
                },
                {
                    childrenTitle: 'Result',
                    childrenValue: visualAuthenticity?.fonts?.result,
                },
            ],
        },
        {
            treeTitle: 'Original document present',
            checked: visualAuthenticity?.originalDocumentPresent?.result === 'clear',
            children: [
                {
                    childrenTitle: 'Properties',
                    subchildren: [
                        {
                            subChildrenTitle: 'Threshold',
                            subChildrenValue: visualAuthenticity?.originalDocumentPresent?.properties?.threshold,
                        },
                        {
                            subChildrenTitle: 'Score',
                            subChildrenValue: visualAuthenticity?.originalDocumentPresent?.properties?.score,
                        },
                    ],
                },
                {
                    childrenTitle: 'Result',
                    childrenValue: visualAuthenticity?.originalDocumentPresent?.result,
                },
            ],
        },
        {
            treeTitle: 'Other',
            checked: visualAuthenticity?.other?.result === 'clear',
            children: [
                {
                    childrenTitle: 'Properties',
                    subchildren: [
                        {
                            subChildrenTitle: 'Threshold',
                            subChildrenValue: visualAuthenticity?.other?.properties?.threshold,
                        },
                        {
                            subChildrenTitle: 'Score',
                            subChildrenValue: visualAuthenticity?.other?.properties?.score,
                        },
                    ],
                },
                {
                    childrenTitle: 'Result',
                    childrenValue: visualAuthenticity?.other?.result,
                },
            ],
        },
        {
            treeTitle: 'Picture face integrity',
            checked: visualAuthenticity?.pictureFaceIntegrity?.result === 'clear',
            children: [
                {
                    childrenTitle: 'Properties',
                    subchildren: [
                        {
                            subChildrenTitle: 'Threshold',
                            subChildrenValue: visualAuthenticity?.pictureFaceIntegrity?.properties?.threshold,
                        },
                        {
                            subChildrenTitle: 'Score',
                            subChildrenValue: visualAuthenticity?.pictureFaceIntegrity?.properties?.score,
                        },
                    ],
                },
                {
                    childrenTitle: 'Result',
                    childrenValue: visualAuthenticity?.pictureFaceIntegrity?.result,
                },
            ],
        },
        {
            treeTitle: 'Security features',
            checked: visualAuthenticity?.securityFeatures?.result === 'clear',
            children: [
                {
                    childrenTitle: 'Properties',
                    subchildren: [
                        {
                            subChildrenTitle: 'Threshold',
                            subChildrenValue: visualAuthenticity?.securityFeatures?.properties?.threshold,
                        },
                        {
                            subChildrenTitle: 'Score',
                            subChildrenValue: visualAuthenticity?.securityFeatures?.properties?.score,
                        },
                    ],
                },
                {
                    childrenTitle: 'Result',
                    childrenValue: visualAuthenticity?.securityFeatures?.result,
                },
            ],
        },
        {
            treeTitle: 'Template',
            checked: visualAuthenticity?.template?.result === 'clear',
            children: [
                {
                    childrenTitle: 'Properties',
                    subchildren: [
                        {
                            subChildrenTitle: 'Threshold',
                            subChildrenValue: visualAuthenticity?.template?.properties?.threshold,
                        },
                        {
                            subChildrenTitle: 'Score',
                            subChildrenValue: visualAuthenticity?.template?.properties?.score,
                        },
                    ],
                },
                {
                    childrenTitle: 'Result',
                    childrenValue: visualAuthenticity?.template?.result,
                },
            ],
        },
    ];

    const imageIntegrityData = [
        {
            treeTitle: 'Colour picture',
            checked: imageIntegrity?.colourPicture?.result === 'clear',
            children: [
                {
                    childrenTitle: 'Properties',
                    subchildren: [
                        {
                            subChildrenTitle: 'Threshold',
                            subChildrenValue: imageIntegrity?.colourPicture?.properties?.threshold,
                        },
                        {
                            subChildrenTitle: 'Score',
                            subChildrenValue: imageIntegrity?.colourPicture?.properties?.score,
                        },
                    ],
                },
                {
                    childrenTitle: 'Result',
                    childrenValue: imageIntegrity?.colourPicture?.result,
                },
            ],
        },
        {
            treeTitle: 'Conclusive document quality',
            checked: imageIntegrity?.conclusiveDocumentQuality?.result === 'clear',
            children: [
                {
                    childrenTitle: 'Properties',
                    subchildren: [
                        {
                            subChildrenTitle: 'Threshold',
                            subChildrenValue: imageIntegrity?.conclusiveDocumentQuality?.properties?.threshold,
                        },
                        {
                            subChildrenTitle: 'Score',
                            subChildrenValue: imageIntegrity?.conclusiveDocumentQuality?.properties?.score,
                        },
                    ],
                },
                {
                    childrenTitle: 'Result',
                    childrenValue: imageIntegrity?.conclusiveDocumentQuality?.result,
                },
            ],
        },
        {
            treeTitle: 'Image quality',
            checked: imageIntegrity?.imageQuality?.result === 'clear',
            children: [
                {
                    childrenTitle: 'Properties',
                    subchildren: [
                        {
                            subChildrenTitle: 'Threshold',
                            subChildrenValue: imageIntegrity?.imageQuality?.properties?.threshold,
                        },
                        {
                            subChildrenTitle: 'Score',
                            subChildrenValue: imageIntegrity?.imageQuality?.properties?.score,
                        },
                    ],
                },
                {
                    childrenTitle: 'Result',
                    childrenValue: imageIntegrity?.imageQuality?.result,
                },
            ],
        },
        {
            treeTitle: 'Supported document',
            checked: imageIntegrity?.supportedDocument?.result === 'clear',
            children: [
                {
                    childrenTitle: 'Properties',
                    subchildren: [
                        {
                            subChildrenTitle: 'Threshold',
                            subChildrenValue: imageIntegrity?.supportedDocument?.properties?.threshold,
                        },
                        {
                            subChildrenTitle: 'Score',
                            subChildrenValue: imageIntegrity?.supportedDocument?.properties?.score,
                        },
                    ],
                },
                {
                    childrenTitle: 'Result',
                    childrenValue: imageIntegrity?.supportedDocument?.result,
                },
            ],
        },
        {
            treeTitle: 'Supported document',
            checked: imageIntegrity?.supportedDocument?.result === 'clear',
            children: [
                {
                    childrenTitle: 'Properties',
                    subchildren: [
                        {
                            subChildrenTitle: 'Threshold',
                            subChildrenValue: imageIntegrity?.supportedDocument?.properties?.threshold,
                        },
                        {
                            subChildrenTitle: 'Score',
                            subChildrenValue: imageIntegrity?.supportedDocument?.properties?.score,
                        },
                    ],
                },
                {
                    childrenTitle: 'Result',
                    childrenValue: imageIntegrity?.supportedDocument?.result,
                },
            ],
        },
    ];

    const dataConsistencyData = [
        {
            treeTitle: 'Date of birth',
            checked: dataConsistency?.dateOfBirth?.result === 'clear',
            children: [
                {
                    childrenTitle: 'Properties',
                    subchildren: [
                        {
                            subChildrenTitle: 'Threshold',
                            subChildrenValue: dataConsistency?.dateOfBirth?.properties?.threshold,
                        },
                        {
                            subChildrenTitle: 'Score',
                            subChildrenValue: dataConsistency?.dateOfBirth?.properties?.score,
                        },
                    ],
                },
                {
                    childrenTitle: 'Result',
                    childrenValue: dataConsistency?.dateOfBirth?.result,
                },
            ],
        },
        {
            treeTitle: 'Date of Expiry',
            checked: dataConsistency?.dateOfExpiry?.result === 'clear',
            children: [
                {
                    childrenTitle: 'Properties',
                    subchildren: [
                        {
                            subChildrenTitle: 'Threshold',
                            subChildrenValue: dataConsistency?.dateOfExpiry?.properties?.threshold,
                        },
                        {
                            subChildrenTitle: 'Score',
                            subChildrenValue: dataConsistency?.dateOfExpiry?.properties?.score,
                        },
                    ],
                },
                {
                    childrenTitle: 'Result',
                    childrenValue: dataConsistency?.dateOfExpiry?.result,
                },
            ],
        },
        {
            treeTitle: 'Document numbers',
            checked: dataConsistency?.documentNumbers?.result === 'clear',
            children: [
                {
                    childrenTitle: 'Properties',
                    subchildren: [
                        {
                            subChildrenTitle: 'Threshold',
                            subChildrenValue: dataConsistency?.documentNumbers?.properties?.threshold,
                        },
                        {
                            subChildrenTitle: 'Score',
                            subChildrenValue: dataConsistency?.documentNumbers?.properties?.score,
                        },
                    ],
                },
                {
                    childrenTitle: 'Result',
                    childrenValue: dataConsistency?.documentNumbers?.result,
                },
            ],
        },
        {
            treeTitle: 'Document type',
            checked: dataConsistency?.documentType?.result === 'clear',
            children: [
                {
                    childrenTitle: 'Properties',
                    subchildren: [
                        {
                            subChildrenTitle: 'Threshold',
                            subChildrenValue: dataConsistency?.documentType?.properties?.threshold,
                        },
                        {
                            subChildrenTitle: 'Score',
                            subChildrenValue: dataConsistency?.documentType?.properties?.score,
                        },
                    ],
                },
                {
                    childrenTitle: 'Result',
                    childrenValue: dataConsistency?.documentType?.result,
                },
            ],
        },
        {
            treeTitle: 'Gender',
            checked: dataConsistency?.gender?.result === 'clear',
            children: [
                {
                    childrenTitle: 'Properties',
                    subchildren: [
                        {
                            subChildrenTitle: 'Threshold',
                            subChildrenValue: dataConsistency?.gender?.properties?.threshold,
                        },
                        {
                            subChildrenTitle: 'Score',
                            subChildrenValue: dataConsistency?.gender?.properties?.score,
                        },
                    ],
                },
                {
                    childrenTitle: 'Result',
                    childrenValue: dataConsistency?.gender?.result,
                },
            ],
        },
        {
            treeTitle: 'Issuing country',
            checked: dataConsistency?.issuingCountry?.result === 'clear',
            children: [
                {
                    childrenTitle: 'Properties',
                    subchildren: [
                        {
                            subChildrenTitle: 'Threshold',
                            subChildrenValue: dataConsistency?.issuingCountry?.properties?.threshold,
                        },
                        {
                            subChildrenTitle: 'Score',
                            subChildrenValue: dataConsistency?.issuingCountry?.properties?.score,
                        },
                    ],
                },
                {
                    childrenTitle: 'Result',
                    childrenValue: dataConsistency?.issuingCountry?.result,
                },
            ],
        },
        {
            treeTitle: 'Nationality',
            checked: dataConsistency?.nationality?.result === 'clear',
            children: [
                {
                    childrenTitle: 'Properties',
                    subchildren: [
                        {
                            subChildrenTitle: 'Threshold',
                            subChildrenValue: dataConsistency?.nationality?.properties?.threshold,
                        },
                        {
                            subChildrenTitle: 'Score',
                            subChildrenValue: dataConsistency?.nationality?.properties?.score,
                        },
                    ],
                },
                {
                    childrenTitle: 'Result',
                    childrenValue: dataConsistency?.nationality?.result,
                },
            ],
        },
    ];

    const dataValidationData = [
        {
            treeTitle: 'Country of stay',
            checked: dataValidation?.countryOfStay?.result === 'clear',
            children: [
                {
                    childrenTitle: 'Properties',
                    subchildren: [
                        {
                            subChildrenTitle: 'Threshold',
                            subChildrenValue: dataValidation?.countryOfStay?.properties?.threshold,
                        },
                        {
                            subChildrenTitle: 'Score',
                            subChildrenValue: dataValidation?.countryOfStay?.properties?.score,
                        },
                    ],
                },
                {
                    childrenTitle: 'Result',
                    childrenValue: dataValidation?.countryOfStay?.result,
                },
            ],
        },
        {
            treeTitle: 'Date of birth',
            checked: dataValidation?.dateOfBirth?.result === 'clear',
            children: [
                {
                    childrenTitle: 'Properties',
                    subchildren: [
                        {
                            subChildrenTitle: 'Threshold',
                            subChildrenValue: dataValidation?.dateOfBirth?.properties?.threshold,
                        },
                        {
                            subChildrenTitle: 'Score',
                            subChildrenValue: dataValidation?.dateOfBirth?.properties?.score,
                        },
                    ],
                },
                {
                    childrenTitle: 'Result',
                    childrenValue: dataValidation?.dateOfBirth?.result,
                },
            ],
        },
        {
            treeTitle: 'Date of expiry',
            checked: dataValidation?.dateOfExpiry?.result === 'clear',
            children: [
                {
                    childrenTitle: 'Properties',
                    subchildren: [
                        {
                            subChildrenTitle: 'Threshold',
                            subChildrenValue: dataValidation?.dateOfExpiry?.properties?.threshold,
                        },
                        {
                            subChildrenTitle: 'Score',
                            subChildrenValue: dataValidation?.dateOfExpiry?.properties?.score,
                        },
                    ],
                },
                {
                    childrenTitle: 'Result',
                    childrenValue: dataValidation?.dateOfExpiry?.result,
                },
            ],
        },
        {
            treeTitle: 'Date of issue',
            checked: dataValidation?.dateOfIssue?.result === 'clear',
            children: [
                {
                    childrenTitle: 'Properties',
                    subchildren: [
                        {
                            subChildrenTitle: 'Threshold',
                            subChildrenValue: dataValidation?.dateOfIssue?.properties?.threshold,
                        },
                        {
                            subChildrenTitle: 'Score',
                            subChildrenValue: dataValidation?.dateOfIssue?.properties?.score,
                        },
                    ],
                },
                {
                    childrenTitle: 'Result',
                    childrenValue: dataValidation?.dateOfIssue?.result,
                },
            ],
        },
        {
            treeTitle: 'Document Numbers',
            checked: dataValidation?.documentNumbers?.result === 'clear',
            children: [
                {
                    childrenTitle: 'Properties',
                    subchildren: [
                        {
                            subChildrenTitle: 'Threshold',
                            subChildrenValue: dataValidation?.documentNumbers?.properties?.threshold,
                        },
                        {
                            subChildrenTitle: 'Score',
                            subChildrenValue: dataValidation?.documentNumbers?.properties?.score,
                        },
                    ],
                },
                {
                    childrenTitle: 'Result',
                    childrenValue: dataValidation?.documentNumbers?.result,
                },
            ],
        },
        {
            treeTitle: 'Document Type',
            checked: dataValidation?.documentType?.result === 'clear',
            children: [
                {
                    childrenTitle: 'Properties',
                    subchildren: [
                        {
                            subChildrenTitle: 'Threshold',
                            subChildrenValue: dataValidation?.documentType?.properties?.threshold,
                        },
                        {
                            subChildrenTitle: 'Score',
                            subChildrenValue: dataValidation?.documentType?.properties?.score,
                        },
                    ],
                },
                {
                    childrenTitle: 'Result',
                    childrenValue: dataValidation?.documentType?.result,
                },
            ],
        },
        {
            treeTitle: 'Father Name',
            checked: dataValidation?.fatherNameEnglish?.result === 'clear',
            children: [
                {
                    childrenTitle: 'Properties',
                    subchildren: [
                        {
                            subChildrenTitle: 'Threshold',
                            subChildrenValue: dataValidation?.fatherNameEnglish?.properties?.threshold,
                        },
                        {
                            subChildrenTitle: 'Score',
                            subChildrenValue: dataValidation?.fatherNameEnglish?.properties?.score,
                        },
                    ],
                },
                {
                    childrenTitle: 'Result',
                    childrenValue: dataValidation?.fatherNameEnglish?.result,
                },
            ],
        },
        {
            treeTitle: 'Gender',
            checked: dataValidation?.gender?.result === 'clear',
            children: [
                {
                    childrenTitle: 'Properties',
                    subchildren: [
                        {
                            subChildrenTitle: 'Threshold',
                            subChildrenValue: dataValidation?.gender?.properties?.threshold,
                        },
                        {
                            subChildrenTitle: 'Score',
                            subChildrenValue: dataValidation?.gender?.properties?.score,
                        },
                    ],
                },
                {
                    childrenTitle: 'Result',
                    childrenValue: dataValidation?.gender?.result,
                },
            ],
        },
        {
            treeTitle: 'Husband name',
            checked: dataValidation?.husbandNameEnglish?.result === 'clear',
            children: [
                {
                    childrenTitle: 'Properties',
                    subchildren: [
                        {
                            subChildrenTitle: 'Threshold',
                            subChildrenValue: dataValidation?.husbandNameEnglish?.properties?.threshold,
                        },
                        {
                            subChildrenTitle: 'Score',
                            subChildrenValue: dataValidation?.husbandNameEnglish?.properties?.score,
                        },
                    ],
                },
                {
                    childrenTitle: 'Result',
                    childrenValue: dataValidation?.husbandNameEnglish?.result,
                },
            ],
        },
        {
            treeTitle: 'Issuing country',
            checked: dataValidation?.issuingCountry?.result === 'clear',
            children: [
                {
                    childrenTitle: 'Properties',
                    subchildren: [
                        {
                            subChildrenTitle: 'Threshold',
                            subChildrenValue: dataValidation?.issuingCountry?.properties?.threshold,
                        },
                        {
                            subChildrenTitle: 'Score',
                            subChildrenValue: dataValidation?.issuingCountry?.properties?.score,
                        },
                    ],
                },
                {
                    childrenTitle: 'Result',
                    childrenValue: dataValidation?.issuingCountry?.result,
                },
            ],
        },
        {
            treeTitle: 'Name',
            checked: dataValidation?.nameEnglish?.result === 'clear',
            children: [
                {
                    childrenTitle: 'Properties',
                    subchildren: [
                        {
                            subChildrenTitle: 'Threshold',
                            subChildrenValue: dataValidation?.nameEnglish?.properties?.threshold,
                        },
                        {
                            subChildrenTitle: 'Score',
                            subChildrenValue: dataValidation?.nameEnglish?.properties?.score,
                        },
                    ],
                },
                {
                    childrenTitle: 'Result',
                    childrenValue: dataValidation?.nameEnglish?.result,
                },
            ],
        },
        {
            treeTitle: 'Nationality',
            checked: dataValidation?.nationality?.result === 'clear',
            children: [
                {
                    childrenTitle: 'Properties',
                    subchildren: [
                        {
                            subChildrenTitle: 'Threshold',
                            subChildrenValue: dataValidation?.nationality?.properties?.threshold,
                        },
                        {
                            subChildrenTitle: 'Score',
                            subChildrenValue: dataValidation?.nationality?.properties?.score,
                        },
                    ],
                },
                {
                    childrenTitle: 'Result',
                    childrenValue: dataValidation?.nationality?.result,
                },
            ],
        },
        {
            treeTitle: 'Permenant address',
            checked: dataValidation?.permenantAddress?.result === 'clear',
            children: [
                {
                    childrenTitle: 'Properties',
                    subchildren: [
                        {
                            subChildrenTitle: 'Threshold',
                            subChildrenValue: dataValidation?.permenantAddress?.properties?.threshold,
                        },
                        {
                            subChildrenTitle: 'Score',
                            subChildrenValue: dataValidation?.permenantAddress?.properties?.score,
                        },
                    ],
                },
                {
                    childrenTitle: 'Result',
                    childrenValue: dataValidation?.permenantAddress?.result,
                },
            ],
        },
        {
            treeTitle: 'Present address',
            checked: dataValidation?.presentAddress?.result === 'clear',
            children: [
                {
                    childrenTitle: 'Properties',
                    subchildren: [
                        {
                            subChildrenTitle: 'Threshold',
                            subChildrenValue: dataValidation?.presentAddress?.properties?.threshold,
                        },
                        {
                            subChildrenTitle: 'Score',
                            subChildrenValue: dataValidation?.presentAddress?.properties?.score,
                        },
                    ],
                },
                {
                    childrenTitle: 'Result',
                    childrenValue: dataValidation?.presentAddress?.result,
                },
            ],
        },
    ];
    return (
        <div>
            {
                loading ?
                    <CustomeLoader />
                    :
                    <Row>
                        <Col span={6}>
                            <UserDetails
                                photo={photo || '/icons/UserAvatar.svg'}
                                sabhiScore={scores?.sabhiScore}
                                applicant={userEditedData}
                                phoneNumber={applicant?.phoneNumber}
                                s />
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
                                            onClick={() => history.push({ pathname: `/dashboard/applicant`, applicantId })}
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
                                                Score Details
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
                                        <div />
                                        <div
                                            style={{
                                                marginLeft: '10px',
                                            }}
                                        >
                                            <Button disabled type="dashed" icon={<DownloadOutlined />}>
                                                Download PDF
                                            </Button>
                                        </div>
                                    </div>
                                </div>

                                <div className={"details"}>
                                    <div>
                                        <AlertBox
                                            type="warning"
                                            message="Some verifications have failed, and require additional attention."
                                        />
                                    </div>
                                    <div
                                        style={{
                                            marginRight: '32px',
                                            marginLeft: '32px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            marginTop: '25px',
                                        }}
                                    >
                                        <div>
                                            <Button type="link">Find more details about the document result here.</Button>
                                        </div>
                                        <div>
                                            <Button disabled icon={<FlagFilled />}>
                                                Flag an Issue
                                            </Button>
                                        </div>
                                    </div>
                                    <div
                                        style={{
                                            paddingLeft: '10px',
                                            borderBottom: '1px solid rgb(240, 238, 238)',
                                            paddingBottom: '30px',
                                            marginLeft: '32px',
                                            marginRight: '32px',
                                        }}
                                    >
                                        <Row>
                                            {dataComparison && (
                                                <Col
                                                    span={8}
                                                    style={{
                                                        marginTop: '30px',
                                                    }}
                                                >
                                                    <div>
                                                        <Tree grandTitle="Data comparison" data={treeData} />
                                                    </div>
                                                </Col>
                                            )}
                                            {dataConsistency && (
                                                <Col
                                                    span={8}
                                                    style={{
                                                        marginTop: '30px',
                                                    }}
                                                >
                                                    <div>
                                                        <Tree grandTitle="Data Consistency" data={dataConsistencyData} />
                                                    </div>
                                                </Col>
                                            )}
                                            {visualAuthenticity && (
                                                <Col
                                                    span={8}
                                                    style={{
                                                        marginTop: '30px',
                                                    }}
                                                >
                                                    <div>
                                                        <Tree grandTitle="Visual authenticity" data={visualAuthenticityData} />
                                                    </div>
                                                </Col>
                                            )}
                                            {dataValidation && (
                                                <Col
                                                    span={8}
                                                    style={{
                                                        marginTop: '30px',
                                                    }}
                                                >
                                                    <div>
                                                        <Tree grandTitle="Data validation" data={dataValidationData} />
                                                    </div>
                                                </Col>
                                            )}
                                            {compromisedDocument && (
                                                <Col
                                                    span={8}
                                                    style={{
                                                        marginTop: '30px',
                                                    }}
                                                >
                                                    <div>
                                                        <Tree grandTitle="Compromised document" data={treeData} />
                                                    </div>
                                                </Col>
                                            )}
                                            {imageIntegrity && (
                                                <Col
                                                    span={8}
                                                    style={{
                                                        marginTop: '30px',
                                                    }}
                                                >
                                                    <div>
                                                        <Tree grandTitle="Image integrity" data={imageIntegrityData} />
                                                    </div>
                                                </Col>
                                            )}
                                        </Row>
                                    </div>
                                    <div
                                        style={{
                                            disply: 'flex',
                                            justifyContent: 'space-between',
                                            paddingTop: '32px',
                                            paddingLeft: '44px',
                                            paddingRight: '30px',
                                        }}
                                    >
                                        <Row>
                                            <Col span={18}>
                                                <div
                                                    style={{
                                                        display: 'flex',
                                                    }}
                                                >
                                                    <Text
                                                        style={{
                                                            fontStyle: 'normal',
                                                            fontWeight: '500',
                                                            fontSize: '14px',
                                                            lineHeight: '22px',
                                                        }}
                                                    >
                                                        Details:
                                                    </Text>
                                                    <Text
                                                        style={{
                                                            marginLeft: '15px',
                                                            fontStyle: 'normal',
                                                            fontWeight: '500',
                                                            fontSize: '14px',
                                                            lineHeight: '22px',
                                                        }}
                                                    >
                                                        These document details have been extracted automatically by our system. They
                                                        might not perfectly reflect the original document.
                                                    </Text>
                                                </div>
                                            </Col>
                                            <Col span={6}>
                                                <div>
                                                    <Button disabled>View Original Document</Button>
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
            }
        </div>
    );
};

export default ScoreDetail;
