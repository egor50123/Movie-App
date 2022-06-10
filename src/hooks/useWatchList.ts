import {useTypedSelector} from "./useTypedSelector";
import {useAction} from "./useAction";
import {IUseWatchList} from "../models/hooksM";

export const useWatchList = () => {
    let sessionId = useTypedSelector(state => state.auth.session.payload?.session_id)
    let acID = useTypedSelector(state => state.account.details.payload?.id)
    let {postWatchList} = useAction()

    return ({itemId}:IUseWatchList) => {
        if (sessionId && itemId && acID)
            postWatchList({itemId,isToAdd:true,acID,sessionId})
    }
}