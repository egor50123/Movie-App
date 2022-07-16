import React, {FC, useEffect} from 'react';
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import s from "../searchPage.module.scss"
import {MTP, MTP_TYPES} from "../../../constants/constants";
import {useParams} from "react-router-dom";
import {TMoviesTvsPayloadResults} from "../../../models/payloadAPI_M";
import BigCard from "../../../components/Common/Card/BigCard/BigCard";
import Card from "../../../components/Common/Card/Card";
import {ISearchCurrent} from "../../../models/indexM";
import * as searchSelectors from "../../../store/selectors/searchSelectors"
import {useAction} from "../../../hooks/useAction";
import {Pagination, Stack} from "@mui/material";


const SearchCurrent: FC<ISearchCurrent> = ({type}) => {
    const text = useTypedSelector(searchSelectors.text)
    const params = useParams()
    const {fetchItemSearchPage,clearSearchPage} = useAction()
    let searchCurrent = params.searchCurrent as MTP_TYPES
    searchCurrent = searchCurrent === undefined ? MTP.movie : searchCurrent
    let results = useTypedSelector((state) => searchSelectors.results(state,searchCurrent))
    const payload = useTypedSelector((state) => searchSelectors.payload(state,searchCurrent));
    let error = useTypedSelector(state => state.search.error)


    function onPagination(event: React.ChangeEvent<unknown>, currentPage: number) {
        fetchItemSearchPage(text, type,currentPage)
    }

    useEffect(() => {
        return () => {
            clearSearchPage()
        }
    },[])

    return (
        <div className={s.searchPage__list}>
            {payload?.total_results && Math.round(payload?.total_results/20) > 1 && <div className={s.pagination}>
              <Stack spacing={4}>
                <Pagination onChange={onPagination} count={Math.round(payload?.total_results/20)}/>
              </Stack>
            </div>}

            {!error ? (results as TMoviesTvsPayloadResults)?.map(item => <Card id={item.id} key={item.id}
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