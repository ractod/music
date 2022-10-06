// library
import { toast } from "react-toastify"
import { faCheck, faExclamation, faRadiation } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

function notify(type, message) {

    const notifyIcons = {
        success: faCheck, 
        warn: faRadiation,
        error: faExclamation
    }

    toast[type](message, { icon: <FontAwesomeIcon icon={notifyIcons[type]} /> })
}

function hasItem(array, songId) {
    const index = array.findIndex(item => item._id == songId)
    return index != -1 ? true : false
}

export { notify, hasItem }