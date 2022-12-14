import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
    apiCreateIG,
    apiDeleteIG,
    apiFetchIG,
    apiUpdateIG,
} from "../../Axios/data";
import { logout } from "./Auth";
import { message } from "antd";

//假資料
// const initialState = [
//   {
//     name: "US Core",
//     category: "National Base",
//     "npm-name": "hl7.fhir.us.core",
//     description: "Base US national implementation guide",
//     authority: "HL7",
//     country: "us",
//     language: ["en"],
//     implementations: [
//       {
//         name: "Test Server",
//         type: "server",
//         url: "http://test.fhir.org",
//       },
//       {
//         name: "Source Code",
//         type: "source",
//         url: "http://github.com/HealthIntersections/fhirserver",
//       },
//     ],
//     history: "http://hl7.org/fhir/us/core/history.html",
//     canonical: "http://hl7.org/fhir/us/core",
//     "ci-build": "http://build.fhir.org/ig/HL7/US-Core",
//     analysis: {
//       content: true,
//       rest: true,
//       documents: true,
//       clinicalCore: true,
//       medsMgmt: true,
//       profiles: 42,
//       extensions: 5,
//       operations: 1,
//       valuesets: 31,
//       codeSystems: 4,
//       examples: 111,
//     },
//     editions: [
//       {
//         name: "STU5",
//         "ig-version": "5.0.1",
//         package: "hl7.fhir.us.core#5.0.1",
//         "fhir-version": ["4.0.1"],
//         url: "http://hl7.org/fhir/us/core/STU5.0.1",
//       },
//       {
//         name: "STU5",
//         "ig-version": "5.0.0",
//         package: "hl7.fhir.us.core#5.0.0",
//         "fhir-version": ["4.0.1"],
//         url: "http://hl7.org/fhir/us/core/STU5",
//       },
//       {
//         name: "STU4",
//         "ig-version": "4.0.0",
//         package: "hl7.fhir.us.core#4.0.0",
//         "fhir-version": ["4.0.1"],
//         url: "http://hl7.org/fhir/us/core/STU4",
//       },
//       {
//         name: "STU3",
//         "ig-version": "3.1.1",
//         package: "hl7.fhir.us.core#3.1.1",
//         "fhir-version": ["4.0.1"],
//         url: "http://hl7.org/fhir/us/core/STU3.1.1",
//       },
//       {
//         name: "STU3",
//         "ig-version": "3.1.0",
//         package: "hl7.fhir.us.core#3.1.0",
//         "fhir-version": ["4.0.1"],
//         url: "http://hl7.org/fhir/us/core/STU3.1",
//       },
//       {
//         name: "STU3",
//         "ig-version": "3.0.0",
//         package: "hl7.fhir.us.core#3.0.0",
//         "fhir-version": ["4.0.0"],
//         url: "http://hl7.org/fhir/us/core/STU3",
//       },
//       {
//         name: "STU2",
//         "ig-version": "2.0.0",
//         package: "hl7.fhir.us.core#2.0.0",
//         "fhir-version": ["3.0.1"],
//         url: "http://hl7.org/fhir/us/core/STU2",
//       },
//       {
//         name: "STU1",
//         "ig-version": "1.0.1",
//         package: "hl7.fhir.us.core#1.0.1",
//         "fhir-version": ["3.0.1"],
//         url: "http://hl7.org/fhir/us/core/1.0.1",
//       },
//       {
//         name: "STU1",
//         "ig-version": "1.0.0",
//         package: "hl7.fhir.us.core#1.0.0",
//         "fhir-version": ["3.0.1"],
//         url: "http://hl7.org/fhir/us/core/STU1",
//       },
//     ],
//   },
//   {
//     name: "AU Base",
//     category: "National Base",
//     "npm-name": "hl7.fhir.au.base",
//     description: "Base Australian national implementation guide",
//     authority: "HL7",
//     country: "au",
//     language: ["en"],
//     history: "http://fhir.hl7.org.au/fhir/base/history.html",
//     canonical: "http://fhir.hl7.org.au/fhir/base",
//     "ci-build": "http://build.fhir.org/ig/hl7au/au-fhir-base",
//     editions: [
//       {
//         name: "Release 1 Draft",
//         "ig-version": "1.0.1",
//         package: "hl7.fhir.au.base#1.0.1",
//         "fhir-version": ["3.0.1"],
//         url: "http://hl7.org.au/fhir/base/2019Feb",
//       },
//     ],
//     analysis: {
//       error: "JsonObject",
//     },
//   },
//   {
//     name: "NZ Base",
//     category: "National Base",
//     "npm-name": "fhir.org.nz.ig.base",
//     description: "Base New Zealand national implementation guide",
//     authority: "HL7",
//     country: "nz",
//     language: ["en"],
//     canonical: "http://fhir.org.nz/ig/base",
//     "ci-build":
//       "http://build.fhir.org/ig/HL7NZ/nzbase/branches/master/index.html",
//     editions: [
//       {
//         name: "Release 1",
//         "ig-version": "1.0.0",
//         package: "fhir.org.nz.ig.base#1.0.0",
//         "fhir-version": ["4.0.1"],
//         url: "http://fhir.org.nz/ig/base",
//       },
//     ],
//     analysis: {
//       error:
//         "Error fetching package directly (http://fhir.org.nz/ig/base/1.0.0/package.tgz), or fetching package list for fhir.org.nz.ig.base from http://fhir.org.nz/ig/base/package-list.json: Unable to fetch: Invalid HTTP response 404 from https://fhir.org.nz/ig/base/1.0.0/package.tgz (Not Found) (content in /var/folders/85/j9nrkr152ds51j69d7nrxq7r0000gn/T/fhir-http-6.log)",
//     },
//   },
//   {
//     name: "CCDA on FHIR",
//     category: "Clinical Documents",
//     "npm-name": "hl7.fhir.us.ccda",
//     description:
//       "US Realm Implementation Guide (IG) addressing the key aspects of Consolidated CDA (C-CDA) required for Meaningful Use (MU). This IG focuses on the clinical document header and narrative constraints necessary for human readability, and references the Data Access Framework (DAF) implementation guide for coded data representation",
//     authority: "HL7",
//     country: "us",
//     language: ["en"],
//     history: "http://hl7.org/fhir/us/ccda/history.html",
//     canonical: "http://hl7.org/fhir/us/ccda",
//     "ci-build": "http://build.fhir.org/ig/HL7/ccda-on-fhir",
//     analysis: {
//       content: true,
//       rest: true,
//       profiles: 12,
//       extensions: 8,
//       valuesets: 10,
//       examples: 32,
//     },
//     editions: [
//       {
//         name: "STU 1.1",
//         "ig-version": "1.1.0",
//         package: "hl7.fhir.us.ccda#1.1.0",
//         "fhir-version": ["4.0.1"],
//         url: "http://hl7.org/fhir/us/ccda/STU1.1",
//       },
//       {
//         name: "STU 1",
//         "ig-version": "1.0.0",
//         package: "hl7.fhir.us.ccda#1.0.0",
//         "fhir-version": ["3.0.1"],
//         url: "http://hl7.org/fhir/us/ccda/STU1",
//       },
//     ],
//   },
//   {
//     name: "SDC (Structured Data Capture)",
//     category: "Forms Management",
//     "npm-name": "hl7.fhir.uv.sdc",
//     description:
//       "Defines expectations for sharing of Questionnaires and answers, including mechanisms for automatically populating portions of a questionnaire based on embedded mappings to underlying data elements",
//     authority: "HL7",
//     country: "uv",
//     language: ["en"],
//     history: "http://hl7.org/fhir/us/sdc/history.html",
//     canonical: "http://hl7.org/fhir/uv/sdc",
//     "ci-build": "http://build.fhir.org/ig/HL7/sdc",
//     analysis: {
//       content: true,
//       rest: true,
//       clinicalCore: true,
//       carePlanning: true,
//       questionnaire: true,
//       profiles: 26,
//       extensions: 42,
//       logicals: 2,
//       operations: 7,
//       valuesets: 9,
//       codeSystems: 7,
//       examples: 48,
//     },
//     editions: [
//       {
//         name: "STU 3",
//         "ig-version": "3.0.0",
//         package: "hl7.fhir.uv.sdc#3.0.0",
//         "fhir-version": ["4.0.1"],
//         url: "http://hl7.org/fhir/uv/sdc/STU3",
//       },
//       {
//         name: "STU 2",
//         "ig-version": "2.0.0",
//         package: "hl7.fhir.uv.sdc#2.0.0",
//         "fhir-version": ["3.0.1"],
//         url: "http://hl7.org/fhir/us/sdc/STU2",
//       },
//       {
//         name: "DSTU 1",
//         "ig-version": "1.0.2",
//         package: "hl7.fhir.uv.sdc#1.0.2",
//         "fhir-version": ["1.0.2"],
//         url: "http://hl7.org/fhir/DSTU2/sdc/sdc.html",
//       },
//     ],
//   },
//   {
//     name: "SDC Data Elements Registry",
//     category: "Forms Management",
//     "npm-name": "hl7.fhir.us.sdcde",
//     description:
//       "Defines expectations for sharing of data elements between registries",
//     authority: "HL7",
//     country: "us",
//     language: ["en"],
//     history: "http://hl7.org/fhir/us/sdcde/history.html",
//     canonical: "http://hl7.org/fhir/us/sdcde",
//     "ci-build": "http://build.fhir.org/ig/HL7/sdc-de",
//     analysis: {
//       error: "Unable to resolve package id hl7.fhir.us.sdcde#1.0.2",
//     },
//     editions: [
//       {
//         name: "STU 2",
//         "ig-version": "2.0",
//         package: "hl7.fhir.us.sdcde#2.0",
//         "fhir-version": ["3.0.1"],
//         url: "http://hl7.org/fhir/us/sdcde/STU2",
//       },
//       {
//         name: "STU 1",
//         "ig-version": "1.0.2",
//         package: "hl7.fhir.us.sdcde#1.0.2",
//         "fhir-version": ["1.0.2"],
//         url: "http://hl7.org/fhir/DSTU2/sdcde/sdcde.html",
//       },
//     ],
//   },
//   {
//     name: "US Lab",
//     category: "Diagnostics",
//     "npm-name": "hl7.fhir.us.lab",
//     description:
//       "US Realm Laboratory ordering and reporting between ambulatory care setting and the laboratory and laboratory reporting to public health jurisdictions",
//     authority: "HL7",
//     country: "us",
//     language: ["en"],
//     editions: [
//       {
//         name: "DSTU2",
//         "ig-version": "n/a",
//         package: "hl7.fhir.us.lab#n/a",
//         "fhir-version": ["1.0.2"],
//         url: "http://hl7.org/fhir/DSTU2/uslab/uslab.html",
//       },
//     ],
//     analysis: {
//       error: "Unable to resolve package id hl7.fhir.us.lab#n/a",
//     },
//   },
//   {
//     name: "RCPA Cancer Reports",
//     category: "Diagnostics",
//     "npm-name": "hl7.fhir.au.rcpa",
//     description:
//       "Structured Cancer Reporting Protocols (FHIR adaptation of joint CAP/RCPA protocols)",
//     authority: "HL7",
//     country: "au",
//     language: ["en"],
//     "ci-build": "http://build.fhir.org/ig/hl7au/au-fhir-rcpa",
//     canonical: "http://hl7.org.au/fhir/rcpa",
//     editions: [
//       {
//         name: "Release 1 Draft",
//         "ig-version": "0.1.0",
//         package: "hl7.fhir.au.rcpa#0.1.0",
//         "fhir-version": ["3.0.1"],
//         url: "http://hl7.org.au/fhir/rcpa/0.1.0",
//       },
//     ],
//     analysis: {},
//   },
//   {
//     name: "DAF",
//     category: "EHR Access",
//     "npm-name": "hl7.fhir.us.daf",
//     description:
//       "Basic arrangements for accessing meaningful use data from EHR systems **NOTE: DAF has been superseded by Argonaut, DAF-Research and US-Core**",
//     authority: "HL7",
//     country: "us",
//     language: ["en"],
//     history: "http://hl7.org/fhir/us/daf/history.html",
//     canonical: "http://hl7.org/fhir/us/daf",
//     "ci-build": "http://build.fhir.org/ig/HL7/daf-research",
//     analysis: {
//       content: true,
//       rest: true,
//       clinicalCore: true,
//       carePlanning: true,
//       profiles: 5,
//       extensions: 2,
//       operations: 3,
//       valuesets: 2,
//       codeSystems: 2,
//     },
//     editions: [
//       {
//         name: "STU 2",
//         "ig-version": "2.0.0",
//         package: "hl7.fhir.us.daf#2.0.0",
//         "fhir-version": ["3.0.1"],
//         url: "http://hl7.org/fhir/us/daf-research/STU2",
//       },
//       {
//         name: "DSTU 1",
//         "ig-version": "1.0.2",
//         package: "hl7.fhir.us.daf#1.0.2",
//         "fhir-version": ["1.0.2"],
//         url: "http://hl7.org/fhir/DSTU2/daf/daf.html",
//       },
//     ],
//   },
//   {
//     name: "Argonaut Data Query",
//     category: "EHR Access",
//     "npm-name": "fhir.argonaut.r2",
//     description:
//       "This implementation guide is based upon DSTU2 FHIR standard and covers the US EHR data access for the ONC Common Clinical Data Set and retrieval of static documents",
//     authority: "Argonaut",
//     country: "us",
//     language: ["en"],
//     history: "http://www.fhir.org/guides/argonaut/r2/history.html",
//     "ci-build": "http://build.fhir.org/ig/argonautproject/data-query",
//     canonical: "http://fhir.org/guides/argonaut/r2",
//     editions: [
//       {
//         name: "First Release",
//         "ig-version": "1.0.0",
//         package: "fhir.argonaut.r2#1.0.0",
//         "fhir-version": ["1.0.2"],
//         url: "http://fhir.org/guides/argonaut/r2/1.0",
//       },
//     ],
//     analysis: {
//       content: true,
//       rest: true,
//       documents: true,
//       clinicalCore: true,
//       medsMgmt: true,
//       profiles: 17,
//       extensions: 5,
//       operations: 1,
//       valuesets: 25,
//     },
//   },
//   {
//     name: "HSPC EHR Guide",
//     category: "EHR Access",
//     "npm-name": "fhir.hspc.core",
//     description:
//       "Builds on Argonaut to make agreements around consistent data (in progress)",
//     authority: "HSPC",
//     country: "us",
//     language: ["en"],
//     history: "http://fhir.org/guides/hspc/core/history.html",
//     canonical: "http://fhir.org/guides/hspc/core",
//     "ci-build": "http://build.fhir.org/ig/hspc/core",
//     editions: [],
//     analysis: {},
//   },
//   {
//     name: "US Meds Maturity Project",
//     category: "Medications / Immunizations",
//     "npm-name": "hl7.fhir.us.meds",
//     description:
//       "US Meds Maturity Project: promote consistent use of the FHIR pharmacy resources in the US Realm",
//     authority: "HL7",
//     country: "us",
//     language: ["en"],
//     history: "http://hl7.org/fhir/us/meds/history.html",
//     canonical: "http://hl7.org/fhir/us/meds",
//     "ci-build": "http://build.fhir.org/ig/HL7/FHIR-ONC-Meds",
//     analysis: {
//       content: true,
//       rest: true,
//       clinicalCore: true,
//       medsMgmt: true,
//       profiles: 2,
//     },
//     editions: [
//       {
//         name: "STU 2",
//         "ig-version": "1.2.0",
//         package: "hl7.fhir.us.meds#1.2.0",
//         "fhir-version": ["3.0.1"],
//         url: "http://hl7.org/fhir/us/meds/STU2",
//       },
//       {
//         name: "STU 1",
//         "ig-version": "1.0.0",
//         package: "hl7.fhir.us.meds#1.0.0",
//         "fhir-version": ["3.0.1"],
//         url: "http://hl7.org/fhir/us/meds/STU1",
//       },
//     ],
//   },
// ];

const initialState = {
    status: 0,
    rows: 0,
    category: [],
    authority: [],
    loading: false,
    searchData: [],
    data: [],
    searchQuery: {},
};

const fetchAndSortIG = async (params) => {
    const response = await apiFetchIG(params);
    if (response.data.status !== 1) throw "something went wrong";
    const sortData = response.data.data.sort(
        (a, b) => new Date(b._createTime) - new Date(a._createTime)
    );
    return { ...response.data, data: sortData, searchData: sortData };
};

export const fetchIG = createAsyncThunk(
    "data/fetchIG",
    async (params, thunkAPI) => {
        try {
            const data = await fetchAndSortIG(params);
            const category = new Set(data.data.map((d) => d.category));
            const authority = new Set(data.data.map((d) => d.authority));

            return {
                ...data,
                category: [...category],
                authority: [...authority],
            };
        } catch (e) {
            return thunkAPI.rejectWithValue();
        }
    }
);
export const createIG = createAsyncThunk(
    "data/createIG",
    async (data, thunkAPI) => {
        try {
            const response = await apiCreateIG(data);
            if (response.data.status !== 1) throw "something went wrong";
            if (response.status === 401) throw response.data.message;
            if (response.status === 402) throw response.data.message;
            const res = await fetchAndSortIG();
            return res;
        } catch (e) {
            if (e.response.status === 401) thunkAPI.dispatch(logout());
            return thunkAPI.rejectWithValue(e.response.data.message);
        }
    }
);
export const updateIG = createAsyncThunk(
    "data/updateIG",
    async ({ id, data }, thunkAPI) => {
        try {
            const response = await apiUpdateIG(id, data);
            if (response.data.status !== 1) throw "something went wrong";
            if (response.status === 401) throw response.data.message;
            if (response.status === 402) throw response.data.message;
            const res = await fetchAndSortIG();
            return res;
        } catch (e) {
            if (e.response.status === 401) thunkAPI.dispatch(logout());
            return thunkAPI.rejectWithValue(e.response.data.message);
        }
    }
);
export const deleteIG = createAsyncThunk(
    "data/deleteIG",
    async (id, thunkAPI) => {
        try {
            const response = await apiDeleteIG(id);
            if (response.data.status !== 1) throw "something went wrong";
            if (response.status === 401) throw response.data.message;
            if (response.status === 402) throw response.data.message;
            const res = await fetchAndSortIG();
            return res;
        } catch (e) {
            if (e.response.status === 401) thunkAPI.dispatch(logout());
            return thunkAPI.rejectWithValue(e.response.data.message);
        }
    }
);

const dataSlice = createSlice({
    name: "data",
    initialState,
    reducers: {
        searchData: (state, action) => {
            const query = action.payload;

            const searchResult = state.data.filter((d) => {
                return Object.entries(query).every(([key, value]) => {
                    const regexValue = new RegExp(value.toLowerCase());
                    const dataValue = d[key].toLowerCase();
                    return regexValue.test(dataValue);
                });
            });
            return {
                ...state,
                rows: searchResult.length || 1,
                searchData: searchResult,
            };
        },
        resetSearchData: (state, action) => {
            return {
                ...state,
                rows: state.data.length,
                searchData: state.data,
            };
        },
    },
    extraReducers: {
        [fetchIG.pending]: (state, action) => {
            return {
                ...state,
                loading: true,
            };
        },
        [fetchIG.fulfilled]: (state, action) => {
            return {
                ...action.payload,
                loading: false,
            };
        },
        [createIG.pending]: (state, action) => {
            return {
                ...state,
                loading: true,
            };
        },
        [createIG.fulfilled]: (state, action) => {
            message.success(`新增成功`);
            return {
                ...state,
                ...action.payload,
                loading: false,
            };
        },
        [createIG.rejected]: (state, action) => {
            message.error(action.payload);
            return {
                ...state,
                loading: false,
            };
        },
        [updateIG.pending]: (state, action) => {
            return {
                ...state,
                loading: true,
            };
        },
        [updateIG.fulfilled]: (state, action) => {
            message.success(`更新成功`);
            return {
                ...state,
                ...action.payload,
                loading: false,
            };
        },
        [updateIG.rejected]: (state, action) => {
            message.error(action.payload);
            return {
                ...state,
                loading: false,
            };
        },
        [deleteIG.pending]: (state, action) => {
            return {
                ...state,
                loading: true,
            };
        },
        [deleteIG.fulfilled]: (state, action) => {
            message.success(`刪除成功`);
            return {
                ...state,
                ...action.payload,
                loading: false,
            };
        },
        [deleteIG.rejected]: (state, action) => {
            message.error(action.payload);
            return {
                ...state,
                loading: false,
            };
        },
    },
});

export const { addData, removeData, editData, searchData, resetSearchData } =
    dataSlice.actions;

export default dataSlice.reducer;
