import React, {useEffect, useRef} from 'react';
import {useTypedSelector} from "./useTypedSelector";
import {useAction} from "./useAction";

const useAuth = () => {

    let token  = useTypedSelector(state => state.auth.payload?.request_token)
    let sessionId = useTypedSelector(state => state.auth.session.payload?.session_id)
    let wasTokenDeleted = useRef(false)
    let {fetchAuthToken,setAuthTokenLocal,fetchAccount} = useAction()

    useEffect(() => {
        let tokenStorage = localStorage.getItem("movieAppToken")
        if (tokenStorage) {
            setAuthTokenLocal(tokenStorage)
            wasTokenDeleted.current = true
            localStorage.removeItem("movieAppToken")
        } else if (typeof tokenStorage !== "string" && typeof token !== "string") {
            wasTokenDeleted.current = false
            fetchAuthToken()
        } else if( typeof token === "string" && !wasTokenDeleted.current) {
            localStorage.setItem(`movieAppToken`,token)
        }

    },[token])

    useEffect(() => {
        if (typeof sessionId === "string") {
            fetchAccount(sessionId)
        }
    },[sessionId])

    return {}
};

export default useAuth;