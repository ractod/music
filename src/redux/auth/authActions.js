// library
import axios from "axios"

// helper
import { notify } from "helpers/helpers"

// redux
import store from "@reduxstore"
import { closeModal } from "@reduxmodals/actions"

const fetchUserSuccess = (userData) => ({
    type: "FETCH_USER_SUCCESS",
    payload: { userData }
})

const fetchUserLoading = () => ({
    type: "FETCH_USER_LOADING"
})

const fetchUserFailure = () => ({
    type: "FETCH_USER_FAILURE"
})

const updateUserLikedSongs = (songData) => ({
    type: "UPDATE_USER_LIKED_SONGS",
    payload: { songData }
})

const addUserPlaylist = (playlistData) => ({
    type: "ADD_USER_PLAYLIST",
    payload: { playlistData }
})

const removeUserPlaylist = (playlistId) => ({
    type: "REMOVE_USER_PLAYLIST",
    payload: { playlistId }
})

const updateUserPlaylists = (playlistData, songData) => ({
    type: "UPDATE_USER_PLAYLIST",
    payload: { playlistData, songData }
})

const signupUser = (userData) => dispatch => {
    dispatch(fetchUserLoading())
    axios.post("/user/signup", userData)
        .then(response => {
            dispatch(fetchUserSuccess(response.data.user))
            notify("success", response.data.message)
            dispatch(closeModal("signupModal"))
        })
        .catch(error => {
            dispatch(fetchUserFailure())
            notify("error", error?.response?.data?.message || "failed to connect to the server")
        })
}

const loginUser = (userData) => dispatch => {
    dispatch(fetchUserLoading())
    axios.post("/user/signin", userData)
        .then(response => {
            dispatch(fetchUserSuccess(response.data.user))
            notify("success", response.data.message)
            dispatch(closeModal("loginModal"))
        })
        .catch(error => {
            dispatch(fetchUserFailure())
            notify("error", error?.response?.data?.message || "failed to connect to the server")
        })
}

const logoutUser = () => () => {
    axios.get("/user/logout")
        .then(response => {
            notify("success", response.data.message)
            window.location.pathname = '/'
        })
        .catch(error => {
            notify("error", error?.response?.data?.message || "failed to connect to the server")
        })
}

// for the times when user enter the site
const loadUser = () => {
    axios.get("/user/load")
        .then(response => store.dispatch(fetchUserSuccess(response.data.user)))
        .catch(() => {
            store.dispatch(fetchUserFailure())
        })
}

export { 
    fetchUserFailure, 
    fetchUserLoading, 
    fetchUserSuccess, 
    loginUser, 
    signupUser, 
    loadUser, 
    logoutUser,
    updateUserLikedSongs,
    addUserPlaylist,
    removeUserPlaylist,
    updateUserPlaylists
}