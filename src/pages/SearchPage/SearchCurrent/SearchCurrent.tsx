import React, {FC} from 'react';
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import Card from "../../../components/Common/Card/Card";
import {cardTypeAPI, cardTypes} from "../../../models/cardM";
import "../SearchPage.scss"

interface ISearchCurrent {
    type: "movie" | "tv" | "person" | "collection"
}

const SearchCurrent: FC<ISearchCurrent> = ({type}) => {
    let text = "movie"
    switch (type) {
        case "movie" : text = "movie";break;
        case "tv": text = "tv";break;
    }

    let payload = useTypedSelector(state => state.search.payload?.results)

    return (
        <div className={"searchPage__list"}>
            {payload?.map(item => <Card title={item.title || item.name}
                                        id={item.id}
                                        bg_path={item.poster_path}
                                        type={cardTypes.type_1}
                                        typeAPI={cardTypeAPI.movie}/>)}
        </div>
    );
};

export default SearchCurrent;