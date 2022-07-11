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
import {accountId, commonList} from "../../../store/selectors/accountSelectors";
import {session} from "../../../store/selectors/authSelecors";

const ListsWrapper: FC = () => {
    const {getList, clearLists} = useAction()
    const data = useTypedSelector(commonList)
    const sessionId = useTypedSelector(session)
    const acID = useTypedSelector(accountId)
    const params = useParams()
    const currentList = params.currentList

    const typeAPI: TListAPIParamType = setTypeAPILists(currentList)

    useEffect(() => {
        if (sessionId && acID) getList({sessionId, acID, type: typeAPI})
        window.scrollTo(0, 0)
        return () => {
            clearLists()
        }
    }, [currentList])

    return (
        <div className={s.list}>
            {data && data.map(item => <Card id={item.id}
                                            typeAPI={item.title === undefined ? MTP.tv : MTP.movie}
                                            canDelete={true}
                                            renderCard={(deleteCallback: any) => <BigCard
                                                title={item.title || item.name}
                                                id={item.id}
                                                withDelete={true}
                                                vote={item.vote_average}
                                                bg_path={item.poster_path}
                                                overview={item.overview}
                                                deleteCallback={deleteCallback}
                                                typeAPI={item.title === undefined ? MTP.tv : MTP.movie}/>}/>)}
        </div>
    );
};

export default ListsWrapper;