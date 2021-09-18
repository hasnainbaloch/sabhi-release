import React from 'react'
import "./UserDetails.less"
import { Avatar, Image, Typography } from 'antd';

const { Text, Link } = Typography;

const UserDetails = (props) => {
    const [applicant, setApplicant] = React.useState(null);
    React.useEffect(() => {
        setApplicant(props.applicant)
    }, [props.applicant])
    return (
        <div className={"applicantData"}>
            <div className={"avatar"}>
                <Avatar src={props.photo} style={{ width: "80px", height: "80px" }} />
            </div>
            <div style={{ marginTop: "15px" }}>
                <Text className={"userName"}>{applicant?.nameEnglish || "-- --"}</Text>
            </div>
            <div className={"userCard"} style={{ marginTop: "20px" }}>
                <Text>User Profile</Text>
            </div>
            <div className={"userCard"}>
                <div className={"detailsTextWrapper"}>
                    <Text className={"detailsTextTitle"}>Gender:</Text>
                    <Text className={"detailsTextValue"}>{applicant?.gender ? applicant?.gender === "M" ? "Male" : "Female" : "-- --"}</Text>
                </div>
                <div className={"detailsTextWrapper"} style={{ marginTop: "16px" }}>
                    <Text className={"detailsTextTitle"}>DOB:</Text>
                    <Text className={"detailsTextValue"}>{applicant?.dateOfBirth || "-- --"}</Text>
                </div>
                <div className={"detailsTextWrapper"} style={{ marginTop: "16px" }}>
                    <Text className={"detailsTextTitle"}>Email:</Text>
                    <Text className={"detailsTextValue"}>{applicant?.email || "-- --"}</Text>
                </div>
                <div className={"detailsTextWrapper"} style={{ marginTop: "16px" }}>
                    <Text className={"detailsTextTitle"}>Phone no.:</Text>
                    <Text className={"detailsTextValue"}>{props.phoneNumber || "-- --"}</Text>
                </div>
            </div>
            <div className={"userCard"} style={{ marginTop: "20px" }}>
                <Text>Hightlights</Text>
            </div>
            <div className={"userCard"} style={{ marginBottom: "20px" }}>
                <div className={"heighlightsTextWrapper"} style={{ marginTop: "16px" }}>
                    <img src="/icons/Checked.svg" style={{ width: "12px", height: "12px" }} />
                    <Text style={{ marginLeft: "10px" }} className={"detailsTextValue"}>Age over 18</Text>
                </div>
                <div className={"heighlightsTextWrapper"} style={{ marginTop: "16px" }}>
                    <img src="/icons/Checked.svg" style={{ width: "12px", height: "12px" }} />
                    <Text style={{ marginLeft: "10px" }} className={"detailsTextValue"}>ID not expired</Text>
                </div>
                <div className={"heighlightsTextWrapper"} style={{ marginTop: "16px" }}>
                    <img src={props.sabhiScore < 50 ? "/icons/Danger.svg" : "/icons/Checked.svg"} style={{ width: "12px", height: "12px" }} />
                    <Text style={{ marginLeft: "10px" }} className={"detailsTextValue"}>Valid document</Text>
                </div>
                <div className={"heighlightsTextWrapper"} style={{ marginTop: "16px" }}>
                    <img src="/icons/Checked.svg" style={{ width: "12px", height: "12px" }} />
                    <Text style={{ marginLeft: "10px" }} className={"detailsTextValue"}>Valid phone</Text>
                </div>
            </div>
        </div>
    )
}

export default UserDetails