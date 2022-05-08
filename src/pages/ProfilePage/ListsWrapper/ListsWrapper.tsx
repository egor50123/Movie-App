import React, {FC, useEffect} from 'react';
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import {TListAPIParamType} from "../../../models/ProfileM";
import "./ListWrapper.scss"
import {useAction} from "../../../hooks/useAction";
import {useParams} from "react-router-dom";
import {BASE_IMG_URL} from "../../../API/indexAPI";
import {setTypeAPILists} from "../../../helpers/setTypeAPILists";

const ListsWrapper:FC = () => {

    let {getList} = useAction()
    let data = useTypedSelector(state => state.account.list.payload?.results)
    let sessionId = useTypedSelector(state => state.auth.session.payload?.session_id)
    let acID = useTypedSelector(state => state.account.details.payload?.id)

    let params = useParams()
    let currentList = params.currentList

    let typeAPI:TListAPIParamType = setTypeAPILists(currentList)

    useEffect(() => {
        if (sessionId && acID) getList({sessionId,acID,type:typeAPI})
        return () => {

        }
    },[currentList])

    return (
        <div className={"list"}>
            {data && data.map(item => <div className={"list__item"}>
                <h1>{item.title}</h1>
                <div className={"list__imgBox"}>
                    <img src={`${BASE_IMG_URL}${item.backdrop_path}`} alt=""/>
                </div>
                <div className={"list__btnBox"}>
                    <button>Рейтинг</button>
                    <button>Избраное</button>
                    <button>Добавииь в список</button>
                    <button>Удалить</button>
                </div>
            </div>)}
        </div>
    );
};

export default ListsWrapper;