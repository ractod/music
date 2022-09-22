import React from 'react';

// mui components
import { Modal, Box, Typography, TextField, Button, IconButton } from '@mui/material';

// redux
import { useSelector, useDispatch } from 'react-redux';
import { openModal, closeModal } from '@reduxmodals/actions';

// library
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const SignupModal = () => {

    const { signupModal } = useSelector(store => store.modalsState)
    const dispatch = useDispatch()

    const closeHandler = () => dispatch(closeModal("signupModal"))
    const openHandler = () => {
        closeHandler()
        dispatch(openModal("loginModal"))
    }
    
    return (
        <Modal onClose={closeHandler} open={signupModal.isOpen} className="flex items-center justify-center p-2" >
        <Box className="relative w-[400px] flex flex-col items-center py-4 px-3 rounded-xl text-white bg-background-light outline-none overflow-hidden">
            {/* close button */}
            <IconButton className="absolute top-4 right-3 text-white" onClick={closeHandler}>
                <FontAwesomeIcon icon={faXmark} />
            </IconButton>

            <Typography component="span" variant="h5" className="font-semibold text-xl md:text-2xl">Signup</Typography>

            {/* form part */}
            <form className="w-[95%] md:w-[80%] mt-5 z-10">    
                <Box>
                    <TextField variant='standard' color="secondary" label="Username" className="w-full" InputLabelProps={{ className: "text-xs md:text-sm" }}  />
                    <TextField variant='standard' color="secondary" type="email" label="Email" className="mt-5 w-full" InputLabelProps={{ className: "text-xs md:text-sm" }} />
                    <TextField variant='standard' color="secondary" type="password" label="Password" className="mt-5 w-full" InputLabelProps={{ className: "text-xs md:text-sm" }} />
                    <TextField variant='standard' color="secondary" type="password" label="Confirm Password" className="mt-5 w-full" InputLabelProps={{ className: "text-xs md:text-sm" }} />
                </Box>
                <Typography className="text-xs md:text-sm text-muted mt-4">
                    Already Have An Account ? 
                    <Typography component="span" className="font-medium cursor-pointer" onClick={openHandler}> Login </Typography>
                </Typography>
                <Button variant="contained" color="primary" className="mt-8"> Signup </Button>
            </form>
            
            {/* backdrop */}
            <span className="absolute top-0 right-0 w-[400px] h-[150px] rotate-[45deg] bg-first-blue-gradient blur-[80px]"></span>
        </Box>
    </Modal>
    );
};

export default SignupModal;