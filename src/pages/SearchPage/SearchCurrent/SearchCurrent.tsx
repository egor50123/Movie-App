import React, {FC} from 'react';
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import Card from "../../../components/Common/Card/Card";
import {cardTypes} from "../../../models/cardM";
import s from "../searchPage.module.scss"
import {MTP, MTP_TYPES} from "../../../constants/constants";
import {useParams} from "react-router-dom";
import {TMoviesTvsPayloadResults} from "../../../models/payloadAPI_M";
import BigCard from "../../../components/Common/BigCard/BigCard";

interface ISearchCurrent {
    type: "movie" | "tv" | "person" | "collection"
}


const SearchCurrent: FC<ISearchCurrent> = ({type}) => {

    const params = useParams()
    let searchCurrent = params.searchCurrent as MTP_TYPES
    searchCurrent = searchCurrent === undefined ? MTP.movie : searchCurrent
    let payload = useTypedSelector(state => state.searchPage[searchCurrent].payload?.results)
    let error = useTypedSelector(state => state.search.error)


    let text = MTP.movie
    switch (type) {
        case MTP.movie :
            text = MTP.movie;
            break;
        case MTP.tv:
            text = MTP.tv;
            break;
        case MTP.person:
            text = MTP.person;
            break;
    }


    return (
        <div className={s.searchPage__list}>
            {!error ? (payload as TMoviesTvsPayloadResults)?.map(item => <BigCard title={item.title || item.name}
                                                                                  id={item.id}
                                                                                  vote={item.vote_average}
                                                                                  bg_path={item.poster_path}
                                                                                  type={cardTypes.type_1}
                                                                                  overview={item.overview}
                                                                                  typeAPI={item.title === undefined ? MTP.tv : MTP.movie}/>) :
                <div>Нет результатов</div>}
        </div>
    );
};

export default SearchCurrent;