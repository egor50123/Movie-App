import React, {FC, useEffect} from 'react';
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import {TListAPIParamType} from "../../../models/ProfileM";
import {useAction} from "../../../hooks/useAction";
import {useParams} from "react-router-dom";
import {setTypeAPILists} from "../../../helpers/setTypeAPILists";
import Card from "../../../components/Common/Card/Card";
import {MTP} from "../../../constants/constants";
import s from "../profilePage.module.scss"
import BigCard from "../../../components/Common/Card/BigCard/BigCard";

const ListsWrapper:FC = () => {

    let {getList,clearLists} = useAction()
    let data = useTypedSelector(state => state.account.list.payload?.results)
    let sessionId = useTypedSelector(state => state.auth.session.payload?.session_id)
    let acID = useTypedSelector(state => state.account.details.payload?.id)

    let params = useParams()
    let currentList = params.currentList

    let typeAPI:TListAPIParamType = setTypeAPILists(currentList)

    useEffect(() => {
        if (sessionId && acID) getList({sessionId,acID,type:typeAPI})
        window.scrollTo(0,0)
        return () => {
            clearLists()
        }
    },[currentList])

    return (
        <div className={s.list}>
            {data && data.map(item => <Card id={item.id}
                                            typeAPI={item.title === undefined ? MTP.tv : MTP.movie}
                                            renderCard={() => <BigCard  title={item.title || item.name}
                                                                        id={item.id}
                                                                        vote={item.vote_average}
                                                                        bg_path={item.poster_path}
                                                                        overview={item.overview}
                                                                        typeAPI={item.title === undefined ? MTP.tv : MTP.movie}/>}/>)}
        </div>
    );
};

export default ListsWrapper;