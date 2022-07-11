import {SMALL_IMG_URL} from "../../../API/indexAPI";
import {ISearchItemPayload} from "../../../models/payloadAPI_M";
import {Link} from "react-router-dom";
import {FC} from "react";
import s from "./search.module.scss"

export interface ISearchItem {
    data: ISearchItemPayload
}

const SearchItem: FC<ISearchItem> = ({data}) => {


    const title = data.media_type === "movie" ? data.title : data.name,
        src = data.media_type === "person" ? data.profile_path : data.backdrop_path || data.poster_path

    return (
        <Link to={`/${data.media_type}/${data.id}`} className={s.search_item} key={data.id}>
            <div className={s.search_imgBox}>{src && <img src={`${SMALL_IMG_URL}${src}`} alt=""/>}</div>
            <div className={s.search_mainBox}>
                <h2>{title}</h2>
                {/*<span>{type}</span>*/}
            </div>
        </Link>)
}

export default SearchItem