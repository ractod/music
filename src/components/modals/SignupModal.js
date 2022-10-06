import React, { useEffect } from 'react';

// mui components
import { Modal, Box, Typography, TextField, IconButton } from '@mui/material';
import { LoadingButton } from "@mui/lab"

// redux
import { useSelector, useDispatch } from 'react-redux';
import { openModal, closeModal } from '@reduxmodals/actions';
import { signupUser } from '@reduxauth/authActions';

// library
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useFormik } from 'formik';
import * as Yup from "yup"

const initialValues = {
    username: "",
    email: "",
    password: "",
    passwordConfirm: ""
}
const validationSchema = Yup.object({
    username: Yup.string()
        .trim()
        .min(4, "Username Must Have At Least 4 Characters")
        .required("Username is Required"),
    email: Yup.string()
        .email("Email Is Not Valid")
        .required("Email Is Required"),
    password: Yup.string()
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/g, 
            "Password Must Contain At Least 8 Characters, 1 Uppercase Letter, 1 Number, No Spaces"
        )
        .required("Password Is Required"),
    passwordConfirm: Yup.string()
        .oneOf(
            [Yup.ref("password")],
            "Password Confirm Doesn't Match Password"
        )
        .required("Password Confirm Is Required")
})

const SignupModal = () => {

    const { modalsState, authState } = useSelector(store => store)
    const dispatch = useDispatch()

    const closeHandler = () => dispatch(closeModal("signupModal"))
    const openLoginModal = () => {
        closeHandler()
        dispatch(openModal("loginModal"))
    }
    const onSubmit = values => {
        const newValues = {
            ...values, 
            email: values.email.trim(), 
            username: values.username.trim().replaceAll(/   +/g, " "),
        }

        dispatch(signupUser(newValues))
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
        <Modal onClose={closeHandler} open={modalsState.signupModal.isOpen} className="flex items-center justify-center p-2" >
            <Box className="relative w-[400px] flex flex-col items-center py-4 px-3 rounded-xl text-white bg-background-light outline-none overflow-hidden">
                {/* close button */}
                <IconButton className="absolute top-4 right-3 text-white" onClick={closeHandler}>
                    <FontAwesomeIcon icon={faXmark} />
                </IconButton>

                <Typography component="span" variant="h5" className="font-semibold text-xl md:text-2xl">Signup</Typography>

                {/* form part */}
                <form className="w-[95%] md:w-[80%] mt-5 z-10" onSubmit={formik.handleSubmit}> 

                    <Box>
                        <TextField {...formik.getFieldProps("username")} variant='standard' color="secondary" label="Username" className="w-full" InputLabelProps={{ className: "text-xs md:text-sm" }}  />
                        { formik.errors.username && formik.touched.username && <span className="block text-sm text-red bg-background-dark rounded-md p-1 mt-2"> { formik.errors.username } </span> }

                        <TextField {...formik.getFieldProps("email")} variant='standard' color="secondary" type="email" label="Email" className="mt-5 w-full" InputLabelProps={{ className: "text-xs md:text-sm" }} />
                        { formik.errors.email && formik.touched.email && <span className="block text-sm text-red bg-background-dark rounded-md p-1 mt-2"> { formik.errors.email } </span> }

                        <TextField {...formik.getFieldProps("password")} variant='standard' color="secondary" type="password" label="Password" className="mt-5 w-full" InputLabelProps={{ className: "text-xs md:text-sm" }} />
                        { formik.errors.password && formik.touched.password && <span className="block text-sm text-red bg-background-dark rounded-md p-1 mt-2"> { formik.errors.password } </span> }

                        <TextField {...formik.getFieldProps("passwordConfirm")} variant='standard' color="secondary" type="password" label="Confirm Password" className="mt-5 w-full" InputLabelProps={{ className: "text-xs md:text-sm" }} />
                        { formik.errors.passwordConfirm && formik.touched.passwordConfirm && <span className="block text-sm text-red bg-background-dark rounded-md p-1 mt-2"> { formik.errors.passwordConfirm } </span> }
                    </Box>

                    <Typography className="text-xs md:text-sm text-muted mt-4">
                        Already Have An Account ? 
                        <Typography component="span" className="font-medium cursor-pointer" onClick={openLoginModal}> Login </Typography>
                    </Typography>

                    <LoadingButton loading={authState.userStatus == "loading"} disabled={!formik.isValid} variant="contained" type="submit" color="primary" className="mt-8"> Signup </LoadingButton>
                </form>
                
                {/* backdrop */}
                <span className="absolute top-0 right-0 w-[400px] h-[150px] rotate-[45deg] bg-first-blue-gradient blur-[80px]"></span>
            </Box>
        </Modal>
    );
};

export default SignupModal;