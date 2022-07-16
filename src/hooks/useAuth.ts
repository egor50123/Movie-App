import {useEffect} from 'react';
import {useTypedSelector} from "./useTypedSelector";
import {useAction} from "./useAction";
import * as authSelectors from "../store/selectors/authSelecors"

const useAuth = () => {

    let token  = useTypedSelector(authSelectors.token)
    let sessionId = useTypedSelector(authSelectors.session)
    let {fetchAuthToken,setAuthTokenLocal,fetchAccount} = useAction()

    useEffect(() => {
        let tokenStorage = localStorage.getItem("movieAppToken")
        let isTokenActivate = localStorage.getItem("movieAppTokenActivate")
       // console.log("На вход",tokenStorage,isTokenActivate,token)
        if (tokenStorage && !isTokenActivate && !token) {
            localStorage.removeItem("movieAppToken")
            fetchAuthToken()
            //console.log("токен есть, но не активирован")
        } else if (!tokenStorage && !isTokenActivate && !token) {
            fetchAuthToken()
            //console.log("токена нет, активации нет, в сторе нет")
        }
        else if (tokenStorage && isTokenActivate && !token) {
            setAuthTokenLocal(tokenStorage)
            localStorage.removeItem("movieAppToken")
            localStorage.removeItem("movieAppTokenActivate")
            //console.log("токен есть, активация есть, в сторе нет")
        } else if (!tokenStorage && !isTokenActivate && token) {
            localStorage.setItem(`movieAppToken`,token)
            //console.log("токена нет, активации нет, в сторе есть")
        } else if (!tokenStorage  && isTokenActivate  && !token) {
            localStorage.removeItem("movieAppTokenActivate")
            //console.log("токена нет, активации есть, в сторе нет")
        } else if (tokenStorage  && !isTokenActivate  && token) {
            //console.log("токены загружены, активации нет")
        }
        tokenStorage = localStorage.getItem("movieAppToken")
        isTokenActivate = localStorage.getItem("movieAppTokenActivate")
        //console.log("На ВЫХОД",tokenStorage,isTokenActivate,token)

    },[token])

    useEffect(() => {
        if (typeof sessionId === "string") {
            fetchAccount(sessionId)
        }
    },[sessionId])

    return {}
};

export default useAuth;