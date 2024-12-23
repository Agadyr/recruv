import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { END_POINT, SEARCH_END_POINT } from '@/config/end-point';


export const resumeSlice = createSlice({
    name: 'resume',
    initialState: {
        resumes: [],
        resume: {},
        search: false
    },
    reducers: {
        setMyResumes: (state, action) =>{
            state.resumes = action.payload.resumes
            console.log(state.resumes)
        },
        appendResume: (state, action) => {
            state.resumes = [...state.resumes, action.payload.newresume]
        },
        setResume: (state, action) => {
            state.resume = action.payload.resume
        },
        handleDeleteResume: (state, action) => {
            let resumes = [...state.resumes]
            resumes = resumes.filter(item => item.id !== action.payload)
            state.resumes = resumes
        },
        setSearchResumes: (state) => {
            state.search = !state.search
        }
        
    },
})

export const {setMyResumes, appendResume, setResume, handleDeleteResume, setSearchResumes} = resumeSlice.actions

export const getMyResumes = () => async(dispatch) => {
    try {
        const res = await axios.get(`${END_POINT}/api/resume`);
        dispatch(setMyResumes({resumes: res.data}))
    } catch (e) {
        alert("Что то пошло не так, сообщите об ошибке тех. спецам" )
        console.log(e)
    }    
}

export const getMyResumeById = (id) => async(dispatch) => {
    try {
        const res = await axios.get(`${END_POINT}/api/resume/${id}`);
        console.log(res.data);
        dispatch(setResume({resume: res.data}))
    } catch (e) {
        alert("Что то пошло не так, сообщите об ошибке тех. спецам" )
        console.log(e)
    }    
}

export const createResume = (sendData, router) => async(dispatch) => {
    try {
        const res = await axios.post(`${END_POINT}/api/resume`, sendData);
        router.push('/resumes')
        dispatch(appendResume({newresume: res.data}))
    } catch (e) {
        alert("Что то пошло не так, сообщите об ошибке тех. спецам" )
        console.log(e)
    }   
} 

export const editResume = (sendData, router) => async(dispatch) => {
    try {
        const res = await axios.put(`${END_POINT}/api/resume`, sendData);
        router.push('/resumes')
    } catch (e) {
        alert("Что то пошло не так, сообщите об ошибке тех. спецам" )
        console.log(e)
    }   
} 

export const deleteResume = (id) => async(dispatch) => {
    try {
        const res = await axios.delete(`${END_POINT}/api/resume/${id}`);
        dispatch(handleDeleteResume(id))
    } catch (e) {
        alert("Что то пошло не так, сообщите об ошибке тех. спецам" )
        console.log(e)
    }   
}

export const getSearchedResumes = (params, router) => async (dispatch) => {
    try {
        console.log(params);
        const res = await axios.post(`${SEARCH_END_POINT}/api/resumes/searchResumesByParams`, params );
        dispatch(setMyResumes({ resumes: res.data.original }));
        const queryString = new URLSearchParams(params).toString()
        router.push(`/search-resume?${queryString}`);
    } catch (e) {
        console.log(e);
        alert("Что-то пошло не так, сообщите об ошибке технической поддержке сайта!");
    }
};


export default resumeSlice.reducer