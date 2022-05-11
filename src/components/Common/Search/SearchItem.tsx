import {BASE_IMG_URL} from "../../../API/indexAPI";
import {ISearchItemPayload} from "../../../models/payloadAPI_M";
import {Link} from "react-router-dom";
import {FC} from "react";
import "./Search.scss"

export interface ISearchItem {
    data:ISearchItemPayload
}

const SearchItem:FC<ISearchItem> = ({data}) => {
    const type = data.media_type === "movie" ? "Фильм" :
        data.media_type === "tv" ? "Сериал" : "Актер"

    const title = data.media_type === "movie" ? data.title : data.name,
        src = data.media_type === "person" ? data.profile_path : data.poster_path || data.backdrop_path

    return <Link to={`/${data.media_type}/${data.id}`} className={"search_item"} key={data.id}>
        <div className={"search_imgBox"} >{src && <img src={`${BASE_IMG_URL}${src}`} alt=""/>}</div>
        <div className={"search_mainBox"}>
            <h2>{title}</h2>
            <span>{type}</span>
        </div>

    </Link>
}

export default SearchItem