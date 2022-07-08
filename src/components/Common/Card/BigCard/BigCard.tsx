import React, {FC} from 'react';
import s from "./bigCard.module.scss"
import {BASE_IMG_URL} from "../../../../API/indexAPI";
import ButtonContainer from "../../ButtonContainer/ButtonContainer";
import {accountBtnsTypes, buttonsSize, tooltipPlacementC} from "../../../../constants/constants";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import ButtonMenu from "../../ButtonContainer/ButtonMenu/ButtonMenu";
import RateMenu from "../../ButtonContainer/ButtonMenu/RateMenu/RateMenu";
import FavoriteBorderTwoToneIcon from "@mui/icons-material/FavoriteBorderTwoTone";
import FormatListBulletedTwoToneIcon from "@mui/icons-material/FormatListBulletedTwoTone";
import ListMenu from "../../ButtonContainer/ButtonMenu/ListMenu/ListMenu";
import BookmarkBorderTwoToneIcon from "@mui/icons-material/BookmarkBorderTwoTone";
import {ICard} from "../../../../models/cardM";

const BigCard:FC<ICard> = ({
                     title,
                     bg_path,
                     vote,
                     id,
                     overview,
                     typeAPI,
                     listType = null,
                     date
                 }) => {
    return (
        <div className={s.root}>
            <div className={s.imgBox}>
                <img src={`${BASE_IMG_URL}/${bg_path}`} alt=""/>
            </div>
            <div className={s.mainBox}>
                <div className={s.titleBox}>
                    <div className={s.vote}>{vote?.toFixed(1)}</div>
                    <h2>{title}</h2>
                </div>
                <div className={s.overviewBox}>
                    {overview && overview?.length > 240 ? overview.slice(0,240) + "..." : overview || "Не нашлось описания на русском языке или оно отсутствует"}
                </div>
                <div className={s.btnsBox}>
                    <ButtonContainer btnType={accountBtnsTypes.rate}
                                     itemId={id} size={buttonsSize.large}
                                     className={s.button}
                                     notLink={s.notLink}
                                     tooltipPlacement={tooltipPlacementC.top}
                                     iconComponentRender={() => StarBorderOutlinedIcon}
                                     menuRender={() => <ButtonMenu placement={"bottom"} notLink={s.notLink} render={() => <RateMenu typeAPI={typeAPI} itemId={id}/>}/>}/>
                    <ButtonContainer btnType={accountBtnsTypes.favourite}
                                     itemId={id} size={buttonsSize.large}
                                     className={s.button}
                                     tooltipPlacement={tooltipPlacementC.bottom}
                                     notLink={s.notLink}
                                     iconComponentRender={() => FavoriteBorderTwoToneIcon}/>
                    <ButtonContainer btnType={accountBtnsTypes.list}
                                     itemId={id} size={buttonsSize.large}
                                     className={s.button}
                                     notLink={s.notLink}
                                     tooltipPlacement={tooltipPlacementC.top}
                                     iconComponentRender={() => FormatListBulletedTwoToneIcon}
                                     menuRender={() => <ButtonMenu placement={"bottom"} notLink={s.notLink} render={() => <ListMenu typeAPI={typeAPI} itemId={id}/>}/>}/>
                    <ButtonContainer btnType={accountBtnsTypes.watchList}
                                     itemId={id} size={buttonsSize.large}
                                     className={s.button}
                                     tooltipPlacement={tooltipPlacementC.bottom}
                                     notLink={s.notLink}
                                     iconComponentRender={() => BookmarkBorderTwoToneIcon}/>
                </div>
            </div>
        </div>
    );
};

export default BigCard;