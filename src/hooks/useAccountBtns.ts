import {useTypedSelector} from "./useTypedSelector";
import {useAction} from "./useAction";
import {IList, IRate, IUseFavorite, IUseWatchList} from "../models/hooksM";

export const useAccountBtns = () => {
    let sessionId = useTypedSelector(state => state.auth.session.payload?.session_id)
    let acID = useTypedSelector(state => state.account.details.payload?.id)
    let {postFavorite,postWatchList,postRate,getCreatedList,postListItems} = useAction()

    function setFavorite ({itemId}:IUseFavorite) {
        if (sessionId && itemId && acID)
            postFavorite({itemId,acID,sessionId,isToAdd:true})
    }

    function setWatchList ({itemId}:IUseWatchList) {
        if (sessionId && itemId && acID)
            postWatchList({itemId,isToAdd:true,acID,sessionId})
    }

    function setRate ({type,rate,itemId}:IRate) {
        if (sessionId && itemId)
            postRate({rate,itemId,sessionId,type})
    }

    function addToList({type,itemId,listData}:IList) {
        if (sessionId && itemId)
            postListItems({itemId,sessionId,type,listData})
    }

    function getMyCreatedList() {
        if (sessionId && acID) {
            getCreatedList({sessionId,acID})
        }
    }



    return {setFavorite,setWatchList,setRate,getMyCreatedList,addToList}

};
