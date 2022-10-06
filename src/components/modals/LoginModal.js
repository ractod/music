import React, { useEffect } from 'react';

// mui components
import { Modal, Box, Typography, TextField, IconButton } from '@mui/material';
import { LoadingButton } from '@mui/lab';

// redux
import { useSelector, useDispatch } from 'react-redux';
import { closeModal, openModal } from '@reduxmodals/actions';
import { loginUser } from '@reduxauth/authActions';

// library
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useFormik } from 'formik';
import * as Yup from "yup"

const initialValues = {
    email: "",
    password: ""
}
const validationSchema = Yup.object({
    email: Yup.string()
        .email("Email Is Not Valid")
        .required("Email Is Required"),
    password: Yup.string()
        .required("Password Is Required")
})

const LoginModal = () => {

    const { modalsState, authState } = useSelector(store => store)
    const dispatch = useDispatch()

    const closeHandler = () => dispatch(closeModal("loginModal"))
    const openSignupModal = () => {
        closeHandler()
        dispatch(openModal("signupModal"))
    }

    const onSubmit = values => {
        const newValues = {...values, email: values.email.trim()}
        dispatch(loginUser(newValues))
    }

    const formik = useFormik({ 
        validateOnMount: true, 
        validateOnBlur: true, 
        validateOnChange: true, 
        initialValues,
        validationSchema,
        onSubmit
    })

    useEffect(() => {
        if(authState.userStatus == "authorized") closeHandler()
    }, [authState.userStatus])

    return (
        <Modal onClose={closeHandler} open={modalsState.loginModal.isOpen} className="flex items-center justify-center p-2" >
            <Box className="relative w-[400px] flex flex-col items-center py-4 px-3 rounded-xl text-white bg-background-light outline-none overflow-hidden">
                
                {/* close button */}
                <IconButton className="absolute top-4 right-3 text-white" onClick={closeHandler}>
                    <FontAwesomeIcon icon={faXmark} />
                </IconButton>

                <Typography component="span" variant="h5" className="font-semibold text-xl md:text-2xl">login</Typography>

                {/* form part */}
                <form className="w-[95%] md:w-[80%] mt-5 z-10" onSubmit={formik.handleSubmit}>    
                    <Box>
                        <TextField {...formik.getFieldProps("email")} variant='standard' color="secondary" type="email" label="Email" className="mt-5 w-full" InputLabelProps={{ className: "text-xs md:text-sm" }} />
                        { formik.errors.email && formik.touched.email && <span className="block text-sm text-red bg-background-dark rounded-md p-1 mt-2"> { formik.errors.email } </span> }

                        <TextField {...formik.getFieldProps("password")} variant='standard' color="secondary" type="password" label="Password" className="mt-5 w-full" InputLabelProps={{ className: "text-xs md:text-sm" }} />
                        { formik.errors.password && formik.touched.password && <span className="block text-sm text-red bg-background-dark rounded-md p-1 mt-2"> { formik.errors.password } </span> }
                    </Box>

                    <Typography className="text-xs md:text-sm text-muted mt-4">
                        Don&#39;t Have An Account ? 
                        <Typography component="span" className="font-medium cursor-pointer" onClick={openSignupModal}> Signup </Typography>
                    </Typography>

                    <LoadingButton loading={authState.userStatus == "loading"} disabled={!formik.isValid} variant="contained" type="submit" color="primary" className="mt-8"> Login </LoadingButton>
                </form>
                
                {/* backdrop */}
                <span className="absolute top-0 right-0 w-[400px] h-[150px] rotate-[45deg] bg-first-blue-gradient blur-[80px]"></span>
            </Box>
        </Modal>
    );
};

export default LoginModal;