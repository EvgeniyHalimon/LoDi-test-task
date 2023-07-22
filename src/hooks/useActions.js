import { bindActionCreators } from "@reduxjs/toolkit"
import { useDispatch } from "react-redux"

import { setModalOpen, setQuestionNumber } from '../lib/modalSlice'

const useActions = () => {
    const dispatch = useDispatch()

    return bindActionCreators({ setModalOpen, setQuestionNumber }, dispatch)
}

export default useActions