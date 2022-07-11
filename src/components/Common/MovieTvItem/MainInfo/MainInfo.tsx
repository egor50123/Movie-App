import React, {FC} from 'react';
import s from "../movieTvItem.module.scss";
import ButtonContainer from "../../ButtonContainer/ButtonContainer";
import {accountBtnsTypes, buttonsSize, MTP_TYPES, tooltipPlacementC} from "../../../../constants/constants";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import RateMenu from "../../ButtonContainer/ButtonMenu/RateMenu/RateMenu";
import FavoriteBorderTwoToneIcon from "@mui/icons-material/FavoriteBorderTwoTone";
import FormatListBulletedTwoToneIcon from "@mui/icons-material/FormatListBulletedTwoTone";
import ListMenu from "../../ButtonContainer/ButtonMenu/ListMenu/ListMenu";
import BookmarkBorderTwoToneIcon from "@mui/icons-material/BookmarkBorderTwoTone";
import {IMoviePayload, ITvPayload} from "../../../../models/payloadAPI_M";
import {getMovieTvData} from "../../../../helpers/getMovieTvData";

interface Props {
    type: MTP_TYPES,
    movieTvPayload:IMoviePayload | ITvPayload | null
    id:string
}

const MainInfo:FC<Props> = ({type,movieTvPayload,id}) => {

    const moviePayload: IMoviePayload = movieTvPayload as IMoviePayload,
        tvPayload: ITvPayload = movieTvPayload as ITvPayload;

    const {releaseDate,title,runtime,genres} = getMovieTvData({type, moviePayload, tvPayload})

    return (
        <div className={s.headerBox}>
            <div className={s.headerTittleBox}>
                <h1 className={s.titleMain}>{title} <span>({releaseDate && releaseDate.slice(0, 4)})</span>
                </h1>
                <p className={s.titleFooter}>
                    <span>{releaseDate}</span>
                    <span>{genres}</span>
                    <span>{runtime} м</span>
                </p>
            </div>
            <div className={s.headerFunctionsBox}>
                <div className={s.voteBox}>
                    <div className={s.vote}>{movieTvPayload?.vote_average}</div>
                    <h3>Рейтинг</h3>
                </div>
                <div className={s.btnBox}>
                    <ButtonContainer btnType={accountBtnsTypes.rate}
                                     itemId={+id} size={buttonsSize.large}
                                     className={s.button}
                                     notLink={s.notLink}
                                     menuPlacement={"bottom"}
                                     tooltipPlacement={tooltipPlacementC.top}
                                     iconComponentRender={() => StarBorderOutlinedIcon}
                                     renderMenu={() => <RateMenu typeAPI={type}
                                                                 itemId={+id}/>}/>
                    <ButtonContainer btnType={accountBtnsTypes.favourite}
                                     itemId={+id} size={buttonsSize.large}
                                     className={s.button}
                                     tooltipPlacement={tooltipPlacementC.top}
                                     notLink={s.notLink}
                                     iconComponentRender={() => FavoriteBorderTwoToneIcon}/>
                    <ButtonContainer btnType={accountBtnsTypes.list}
                                     itemId={+id} size={buttonsSize.large}
                                     className={s.button}
                                     notLink={s.notLink}
                                     tooltipPlacement={tooltipPlacementC.top}
                                     iconComponentRender={() => FormatListBulletedTwoToneIcon}
                                     menuPlacement={"bottom"}
                                     renderMenu={() => <ListMenu typeAPI={type}
                                                                 itemId={+id}/>}/>
                    <ButtonContainer btnType={accountBtnsTypes.watchList}
                                     itemId={+id} size={buttonsSize.large}
                                     className={s.button}
                                     tooltipPlacement={tooltipPlacementC.top}
                                     notLink={s.notLink}
                                     iconComponentRender={() => BookmarkBorderTwoToneIcon}/>
                </div>
            </div>
            <div className={s.headerOverviewBox}>
                <p className={s.tagline}>{movieTvPayload?.tagline}</p>
                <h2>Обзор</h2>
                <p className={s.overviewMain}>{movieTvPayload?.overview}</p>
            </div>
        </div>
    );
};

export default MainInfo;