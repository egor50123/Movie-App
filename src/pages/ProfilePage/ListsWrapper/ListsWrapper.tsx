import React, {FC, useEffect} from 'react';
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import {TListAPIParamType} from "../../../models/ProfileM";
import "./ListWrapper.scss"
import {useAction} from "../../../hooks/useAction";
import {useParams} from "react-router-dom";
import {setTypeAPILists} from "../../../helpers/setTypeAPILists";
import Card from "../../../components/Common/Card/Card";
import {cardTypes} from "../../../models/cardM";

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
        <div className={"list"}>
            {data && data.map(item => <Card title={item.title as string}
                                            overview={item.overview}
                                            id={item.id}
                                            vote={item.vote_average}
                                            bg_path={item.backdrop_path || item.poster_path}
                                            type={cardTypes.type_2}
                                            date={item.release_date as string || item.first_air_date as string}
                                            genres={item.genre_ids}/>)}
        </div>
    );
};

export default ListsWrapper;