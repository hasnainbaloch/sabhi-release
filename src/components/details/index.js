import React from 'react'
import { Typography, Collapse } from 'antd';
import './Details.less';

const { Panel } = Collapse;
const { Text, Link } = Typography;

function callback(key) {
    console.log(key);
}

const DetailsCard = (props) => {
    return <div className={"collapseDataWrapper"}>
        <Text style={{ opacity: "0.5", fontSize: "12px" }}>{props.title}</Text>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
            <Text style={{ fontSize: "16px" }}>{props.value1}</Text>
            <div className={"badges"} style={{ backgroundColor: "#F5F5F5" }}>
                <p>USER INPUT</p>
            </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Text style={{ opacity: "0.5", fontSize: "16px", }}>{props.value2}</Text>
            <div className={"badges"} style={{ backgroundColor: "#F5F5F5", color: "rgba(0, 0, 0, 0.45)" }}>
                <p>SCANNED</p>
            </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
            <Text style={{ opacity: "0.5", fontSize: "12px", }}>SCORE</Text>
            <div className={"scoreBadgesWrapper"}>
                <div className={"scoreBadges"} style={{ backgroundColor: props.result === "suspected" ? "#FFF1F0" : props.result === "clear" ? "#E6FFFB" : "#FFF7E6", color: props.result === "suspected" ? "#CF1322" : props.result === "clear" ? "#1D6E71" : "#D46B08" }}>
                    {/* <div className={"scoreBadges"} style={{ backgroundColor: "#FFF7E6", color: "#D46B08" }}> */}
                    <p>{props.score}%</p>
                </div>
            </div>
        </div>
    </div>
}


const Details = (props) => {
    const [userEditedData, setUserEditedData] = React.useState(null)
    const [userData, setUserData] = React.useState(null)
    const [report, setReport] = React.useState(null)
    const [nameScore, setNameScore] = React.useState(null)
    const [nameResult, setNameResult] = React.useState(null)
    const [fatherHusbandNameResult, setFatherHusbandNameResult] = React.useState(null)
    const [fatherHusbandNameScore, setFatherHusbandNameScore] = React.useState(null)
    const [dateOfBirthScore, setDateOfBirthScore] = React.useState(null)
    const [dateOfBirthResult, setDateOfBirthResult] = React.useState(null)
    const [genderScore, setGenderScore] = React.useState(null)
    const [genderResult, setGenderResult] = React.useState(null)
    const [documentNumbersScore, setDocumentNumbersScore] = React.useState(null)
    const [documentNumbersResult, setDocumentNumbersResult] = React.useState(null)
    const [dateOfIssueScore, setDateOfIssueScore] = React.useState(null)
    const [dateOfIssueResult, setDateOfIssueResult] = React.useState(null)
    const [dateOfExpiryScore, setDateOfExpiryScore] = React.useState(null)
    const [dateOfExpiryResult, setDateOfExpiryResult] = React.useState(null)
    const [issuingCountryScore, setIssuingCountryScore] = React.useState(null)
    const [issuingCountryResult, setIssuingCountryResult] = React.useState(null)
    const [permenantAddressScore, setPermenantAddressScore] = React.useState(null)
    const [permenantAddressResult, setPermenantAddressResult] = React.useState(null)
    const [presentAddressScore, setPresentAddressScore] = React.useState(null)
    const [presentAddressResult, setPresentAddressResult] = React.useState(null)
    React.useEffect(() => {
        setUserEditedData(props.userEditedData)
        setUserData(props.userData)
        setReport(props.report)
        setNameScore(props.report?.breakdown?.dataComparison?.breakdown?.nameEnglish?.properties?.score)
        setNameResult(props.report?.breakdown?.dataComparison?.breakdown?.nameEnglish?.result)
        setDateOfBirthScore(props.report?.breakdown?.dataComparison?.breakdown?.dateOfBirth?.properties?.score)
        setDateOfBirthResult(props.report?.breakdown?.dataComparison?.breakdown?.dateOfBirth?.result)
        setGenderScore(props.report?.breakdown?.dataComparison?.breakdown?.gender?.properties?.score)
        setGenderResult(props.report?.breakdown?.dataComparison?.breakdown?.gender?.result)
        setDocumentNumbersScore(props.report?.breakdown?.dataComparison?.breakdown?.documentNumbers?.properties?.score)
        setDocumentNumbersResult(props.report?.breakdown?.dataComparison?.breakdown?.documentNumbers?.result)
        setDateOfIssueScore(props.report?.breakdown?.dataComparison?.breakdown?.dateOfIssue?.properties?.score)
        setDateOfIssueResult(props.report?.breakdown?.dataComparison?.breakdown?.dateOfIssue?.result)
        setDateOfExpiryScore(props.report?.breakdown?.dataComparison?.breakdown?.dateOfExpiry?.properties?.score)
        setDateOfExpiryResult(props.report?.breakdown?.dataComparison?.breakdown?.dateOfExpiry?.result)
        setIssuingCountryScore(props.report?.breakdown?.dataComparison?.breakdown?.issuingCountry?.properties?.score)
        setIssuingCountryResult(props.report?.breakdown?.dataComparison?.breakdown?.issuingCountry?.result)
        setPermenantAddressScore(props.report?.breakdown?.dataComparison?.breakdown?.permenantAddress?.properties?.score)
        setPermenantAddressResult(props.report?.breakdown?.dataComparison?.breakdown?.permenantAddress?.result)
        setPresentAddressScore(props.report?.breakdown?.dataComparison?.breakdown?.presentAddress?.properties?.score)
        setPresentAddressResult(props.report?.breakdown?.dataComparison?.breakdown?.presentAddress?.result)
        props.report?.breakdown?.dataComparison?.breakdown?.husbandNameEnglish ? setFatherHusbandNameScore(props.report?.breakdown?.dataComparison?.breakdown?.husbandNameEnglish?.properties?.score) : setFatherHusbandNameScore(props.report?.breakdown?.dataComparison?.breakdown?.fatherNameEnglish?.properties?.score)
        props.report?.breakdown?.dataComparison?.breakdown?.husbandNameEnglish ? setFatherHusbandNameResult(props.report?.breakdown?.dataComparison?.breakdown?.husbandNameEnglish?.result) : setFatherHusbandNameResult(props.report?.breakdown?.dataComparison?.breakdown?.fatherNameEnglish?.result)
    }, [props.userEditedData, props.userData, props.report, nameScore])
    console.log({ userEditedData: props.userEditedData, userData: props.userData, report: props.report })
    return (
        <div>
            <div className={"headingWrapper"}>
                <Text className={"heading"}>Details:</Text>
            </div>
            <div className={"detailsWrapper"}>
                <Collapse defaultActiveKey={['1']} style={{ marginTop: "11px" }} onChange={callback}>
                    <Panel header="IDENTITY DETAILS" key="1">
                        <div style={{ padding: "3px" }}>
                            <div>
                                <DetailsCard title="FULL NAME" value1={userEditedData?.nameEnglish || "-- --"} value2={userData?.nameEnglish || "-- --"} score={nameScore || 0} result={nameResult || "suspected"} />
                            </div>
                            <div>
                                <DetailsCard title="FATHER/HUSBAND NAME" value1={userEditedData?.husbandNameEnglish || userEditedData?.fatherNameEnglish || "-- --"} value2={userData?.husbandNameEnglish || userData?.fatherNameEnglish || "-- --"} score={fatherHusbandNameScore || 0} result={fatherHusbandNameResult || "suspected"} />
                            </div>
                            <div>
                                <DetailsCard title="DATE OF BIRTH" value1={userEditedData?.dateOfBirth || "-- --"} value2={userData?.dateOfBirth || "-- --"} score={dateOfBirthScore || 0} result={dateOfBirthResult || "suspected"} />
                            </div>
                            <div>
                                <DetailsCard title="GENDER" value1={userEditedData?.gender || "-- --"} value2={userData?.gender || "-- --"} score={genderScore || 0} result={genderResult || "suspected"} />
                            </div>
                        </div>
                    </Panel>
                </Collapse>
                <Collapse defaultActiveKey={['1']} style={{ marginTop: "11px" }} onChange={callback}>
                    <Panel header="CARD DETAILS" key="1">
                        <div style={{ padding: "3px" }}>
                            <div>
                                <DetailsCard title="ID CARD NUMBER" value1={userEditedData?.documentNumbers || "-- --"} value2={userData?.documentNumbers || "-- --"} score={documentNumbersScore || 0} result={documentNumbersResult || "suspected"} />
                            </div>
                            <div>
                                <DetailsCard title="DATE OF ISSUE" value1={userEditedData?.dateOfIssue || "-- --"} value2={userData?.dateOfIssue || "-- --"} score={dateOfIssueScore || 0} result={dateOfIssueResult || "suspected"} />
                            </div>
                            <div>
                                <DetailsCard title="DATE OF EXPIRY" value1={userEditedData?.dateOfExpiry || "-- --"} value2={userData?.dateOfExpiry || "-- --"} score={dateOfExpiryScore || 0} result={dateOfExpiryResult || "suspected"} />
                            </div>
                            <div>
                                <DetailsCard title="ISSUING COUNTRY" value1={userEditedData?.issuingCountry || "-- --"} value2={userData?.issuingCountry || "-- --"} score={issuingCountryScore || 0} result={issuingCountryResult || "suspected"} />
                            </div>
                        </div>
                    </Panel>
                </Collapse>
                <Collapse defaultActiveKey={['1']} style={{ marginTop: "11px" }} onChange={callback}>
                    <Panel header="ADDRESS DETAILS" key="1">
                        <div style={{ padding: "3px" }}>
                            <div>
                                <DetailsCard title="CURRENT ADDRESS" value1={userEditedData?.presentAddress || "-- --"} value2={userData?.presentAddress || "-- --"} score={presentAddressScore || 0} result={presentAddressResult || "suspected"} />
                            </div>
                            <div>
                                <DetailsCard title="PERMANANT ADDRESS" value1={userEditedData?.permenantAddress || "-- --"} value2={userData?.permenantAddress || "-- --"} score={permenantAddressScore || 0} result={permenantAddressResult || "suspected"} />
                            </div>
                            {/* <div>
                                <DetailsCard title="CURRENT ADDRESS" value1="Mall road, near PCO, Mardan Can.." value2="Mall road, near PCO, Mardan Can.." score={70 || 0} />
                            </div>
                            <div style={{ marginTop: "20px" }}>
                                <DetailsCard title="PERMANANT ADDRESS" value1="Mall road, near PCO, Mardan Can.." value2="Mall road, near PCO, Mardan Can.." score={100 || 0} />
                            </div> */}
                        </div>
                    </Panel>
                </Collapse>
            </div>
        </div>
    )
}

export default Details
