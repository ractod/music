const openModal = (modalName, data = null) => ({
    type: "OPEN_MODAL",
    payload: {modalName, data}
})

const closeModal = (modalName) => ({
    type: "CLOSE_MODAL",
    payload: { modalName }
})

export { openModal, closeModal }