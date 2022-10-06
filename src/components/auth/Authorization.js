import React, { useEffect } from 'react';

// component
import Loading from '@components/common/Loading';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { openModal } from '@reduxmodals/actions';
import { Alert } from '@mui/material';

const Authorization = ({ children }) => {

    const { userStatus } = useSelector(store => store.authState)
    const dispatch = useDispatch()

    useEffect(() => {
        if(userStatus == "unAuthorized") {
            dispatch(openModal("loginModal"))
        }
    }, [userStatus])

    return userStatus == "loading" ?
    <Loading /> :
    userStatus == "authorized" ?
    children :
    <Alert severity='error' variant='outlined'>
        Please Login To Access This Page
    </Alert>
};

export default Authorization;