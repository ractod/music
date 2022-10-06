import React, { useState } from 'react';

// mui components
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Slide, TextField, Typography } from '@mui/material';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '@reduxmodals/actions';
import { addUserPlaylist } from '@reduxauth/authActions';

// library
import { useFormik } from 'formik';
import * as Yup from "yup"
import axios from 'axios';

// helper
import { notify } from 'helpers/helpers';
import { LoadingButton } from '@mui/lab';

const DialogTransition = React.forwardRef((props, ref) => (
    <Slide direction="up" ref={ref} {...props} />
));

DialogTransition.displayName = "DialogTransition"

const initialValues = { name: "" }
const validationSchema = Yup.object({
    name: Yup.string().required("Playlist Name Is Required")
})

const AddPlaylistModal = () => {

    const [isLoading, setIsloading] = useState(false)

    const { addPlaylistModal } = useSelector(store => store.modalsState)
    const dispatch = useDispatch()

    const closeHandler = () => dispatch(closeModal("addPlaylistModal"))
    const onSubmit = values => {
        setIsloading(true)
        axios.post("/playlist", values)
            .then(response => {
                setIsloading(false)
                notify("success", response.data.message)
                dispatch(addUserPlaylist(response.data.playlist))
                closeHandler()
            })
            .catch((error) => {
                setIsloading(false)
                notify("error", error?.response?.data?.message || "failed to connect to the server")
            })
    }
    
    const formik = useFormik({
        validateOnMount: true, 
        validateOnChange: true, 
        validateOnBlur: true, 
        initialValues,
        validationSchema,
        onSubmit
    })
    
    return (
        <Dialog
            open={addPlaylistModal.isOpen}
            TransitionComponent={DialogTransition}
            className="p-2"
            PaperProps={{ className: "w-full sm:w-[400px] m-0 rounded-md bg-background-light bg-none" }}
            onClose={closeHandler}
        >
            <DialogTitle className="text-primary">Create</DialogTitle>

            <DialogContent className="overflow-visible">
                <TextField {...formik.getFieldProps("name")} variant="outlined" label="Enter The Name" fullWidth />
                { formik.errors.name && formik.touched.name && <span className="block text-sm text-red bg-background-dark rounded-md p-1 mt-2"> { formik.errors.name } </span> }
            </DialogContent>

            <DialogActions>
                <LoadingButton loading={isLoading} disabled={!formik.isValid} variant="contained" onClick={formik.handleSubmit}>
                    Create
                </LoadingButton>
                <Button variant="outlined" onClick={closeHandler}>Cancel</Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddPlaylistModal;