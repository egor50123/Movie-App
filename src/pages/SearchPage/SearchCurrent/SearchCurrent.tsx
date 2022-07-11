import React, {FC} from 'react';
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import s from "../searchPage.module.scss"
import {MTP, MTP_TYPES} from "../../../constants/constants";
import {useParams} from "react-router-dom";
import {TMoviesTvsPayloadResults} from "../../../models/payloadAPI_M";
import BigCard from "../../../components/Common/Card/BigCard/BigCard";
import Card from "../../../components/Common/Card/Card";
import {ISearchCurrent} from "../../../models/indexM";

const SearchCurrent: FC<ISearchCurrent> = ({type}) => {
    const params = useParams()
    let searchCurrent = params.searchCurrent as MTP_TYPES
    searchCurrent = searchCurrent === undefined ? MTP.movie : searchCurrent
    let payload = useTypedSelector(state => state.searchPage[searchCurrent].payload?.results)
    let error = useTypedSelector(state => state.search.error)

    return (
        <div className={s.searchPage__list}>
            {!error ? (payload as TMoviesTvsPayloadResults)?.map(item => <Card id={item.id}
                                                                               typeAPI={item.title === undefined ? MTP.tv : MTP.movie}
                                                                               renderCard={() => <BigCard  title={item.title || item.name}
                                                                                                           id={item.id}
                                                                                                           vote={item.vote_average}
                                                                                                           bg_path={item.poster_path}
                                                                                                           overview={item.overview}
                                                                                                           typeAPI={item.title === undefined ? MTP.tv : MTP.movie}/>}/>) :
                <div>Нет результатов</div>}
        </div>
    );
};

export default SearchCurrent;