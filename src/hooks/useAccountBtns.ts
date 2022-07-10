import {useTypedSelector} from "./useTypedSelector";
import {useAction} from "./useAction";
import {IList, IRate, IRateDel, IUseFavorite, IUseWatchList} from "../models/hooksM";
import {IDeleteRate} from "../models/ProfileM";

export const useAccountBtns = () => {
    let sessionId = useTypedSelector(state => state.auth.session.payload?.session_id)
    let acID = useTypedSelector(state => state.account.details.payload?.id)
    let {postFavorite,postWatchList,postRate,getCreatedList,postListItem,deleteRating} = useAction()

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

    function addToList({type,itemId,listId}:IList) {
        if (sessionId && itemId)
            postListItem({itemId,sessionId,type,listId})
    }

    function getMyCreatedList() {
        if (sessionId && acID)
            getCreatedList({sessionId,acID})
    }

    function ratingDelete ({itemId,type}:IRateDel) {
        if (sessionId)
            deleteRating({sessionId,itemId,type})
    }



    return {setFavorite,setWatchList,setRate,getMyCreatedList,addToList,ratingDelete}

};
