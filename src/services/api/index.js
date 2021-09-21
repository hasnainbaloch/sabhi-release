import axios from "axios";
// import jwtDecode from "jwt-decode"; already installed
import {
    LOGIN,
    APPLICANTS_LIST_STATUS,
    APPLICANTS_BY_ID,
    APPROVE_OR_DECLINE_APPLICANTS,
    SIGNUP,
    RESET_PASSWORD,
    UPDATE_PASSWORD
} from "../../constants";

const {
    REACT_APP_AXIOS_RETRY,
    REACT_APP_API_PREFIX,
    REACT_APP_CONTENT_TYPE,
    REACT_APP_APPLICATION_X_WWW_FORM_URLENCODED,
} = process.env;

// Constants
const AXIOS_RETRY = REACT_APP_AXIOS_RETRY;
const API_PREFIX = REACT_APP_API_PREFIX;
const CONTENT_TYPE = REACT_APP_CONTENT_TYPE;
const APPLICATION_X_WWW_FORM_URLENCODED =
    REACT_APP_APPLICATION_X_WWW_FORM_URLENCODED;

export const login = ({ email, password }) => {
    return axios.post(
        `${API_PREFIX}${LOGIN}`,
        { email, password },
        {
            [AXIOS_RETRY]: {
                retries: 3,
            },
            errorHandling: {
                global: true,
            },
        }
    );
};

export const signup = (data) => {
    return axios.post(
        `${API_PREFIX}${SIGNUP}`,
        data,
        {
            [AXIOS_RETRY]: {
                retries: 3,
            },
            errorHandling: {
                global: true,
            },
        }
    );
};

export const resetPassword = (data) => {
    return axios.post(
        `${API_PREFIX}${RESET_PASSWORD}`,
        data,
        {
            [AXIOS_RETRY]: {
                retries: 3,
            },
            errorHandling: {
                global: true,
            },
        }
    );
};

export const updatePassword = (data) => {
    return axios.post(
        `${API_PREFIX}${UPDATE_PASSWORD}`,
        data,
        {
            [AXIOS_RETRY]: {
                retries: 3,
            },
            errorHandling: {
                global: true,
            },
        }
    );
};

// Get Applicant's List Api
export const getApplicantsListWithRecord = (status) => {
    return axios.get(
        `${API_PREFIX}${APPLICANTS_LIST_STATUS}${status}`,
        {
            [AXIOS_RETRY]: {
                retries: 2,
            },
            errorHandling: {
                global: true,
            },
        }
    );
}

// Get Applicant By Id Api
export const getApplicantDetails = (id) => {
    return axios.get(
        `${API_PREFIX}${APPLICANTS_BY_ID}${id}`,
        {
            [AXIOS_RETRY]: {
                retries: 2,
            },
            errorHandling: {
                global: true,
            },
        }
    );
}

// Approve Decline Applicant By Id Api
export const applicantApprovedOrDeclined = (data) => {
    return axios.put(
        `${API_PREFIX}${APPROVE_OR_DECLINE_APPLICANTS}`,
        data,
        {
            [AXIOS_RETRY]: {
                retries: 2,
            },
            errorHandling: {
                global: true,
            },
        }
    );
}