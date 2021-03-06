import {useTypedSelector} from "./useTypedSelector";
import {useAction} from "./useAction";
import {IUseFavorite} from "../models/hooksM";

export const useFavorite = () => {
    let sessionId = useTypedSelector(state => state.auth.session.payload?.session_id)
    let acID = useTypedSelector(state => state.account.details.payload?.id)
    let {postFavorite} = useAction()

    return ({itemId}:IUseFavorite) => {
        if (sessionId && itemId && acID)
            postFavorite({itemId,acID,sessionId,isToAdd:true})
    }
}