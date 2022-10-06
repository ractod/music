// helper
import { hasItem } from "helpers/helpers"

const initialState = {error: null, user: null, userStatus: "loading", likedSongs: [], playlists: []}

function authReducer(state = initialState, action) {
    switch(action.type) {
        case "FETCH_USER_LOADING" :
            return { error: null, user: null, userStatus: "loading" , likedSongs: [], playlists: [] }
            
        case "FETCH_USER_FAILURE" : 
                return { error: true, user: null, userStatus: "unAuthorized", likedSongs: [], playlists: [] }

        case "FETCH_USER_SUCCESS" : 
            return { 
                error: null, 
                user: action.payload.userData,  
                userStatus: "authorized",
                likedSongs: action.payload.userData.likedSongs.reverse(),
                playlists: action.payload.userData.playlists
            }

        case "UPDATE_USER_LIKED_SONGS" : {
            const songId = action.payload.songData._id
            let likedSongs = []

            if (hasItem(state.likedSongs, songId)) {
                likedSongs = state.likedSongs.filter(item => item._id != songId)
            } else {
                likedSongs = [action.payload.songData, ...state.likedSongs ]
            }

            return {...state, likedSongs}
        }
        
        case "ADD_USER_PLAYLIST": 
            return { ...state, playlists: [ ...state.playlists, action.payload.playlistData ] }

        case "REMOVE_USER_PLAYLIST": {
            const allPlaylists = state.playlists.filter(item => item._id != action.payload.playlistId)
            return {...state, playlists: allPlaylists}
        }
        
        case "UPDATE_USER_PLAYLIST": {
            let allPlaylists = state.playlists
            const playlist = action.payload.playlistData
            const index = allPlaylists.findIndex(item => item._id == playlist._id)
            // replace the new playlist with new data
            allPlaylists[index] = playlist
            
            return {...state, playlists: allPlaylists}
        }

        default :
            return state
    }
}

export default authReducer