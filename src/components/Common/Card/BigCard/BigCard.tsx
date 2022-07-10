import React, {FC} from 'react';
import s from "./bigCard.module.scss"
import {BASE_IMG_URL} from "../../../../API/indexAPI";
import ButtonContainer from "../../ButtonContainer/ButtonContainer";
import {accountBtnsTypes, buttonsSize, tooltipPlacementC} from "../../../../constants/constants";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import DeleteIcon from '@mui/icons-material/Delete';
import RateMenu from "../../ButtonContainer/ButtonMenu/RateMenu/RateMenu";
import FavoriteBorderTwoToneIcon from "@mui/icons-material/FavoriteBorderTwoTone";
import FormatListBulletedTwoToneIcon from "@mui/icons-material/FormatListBulletedTwoTone";
import ListMenu from "../../ButtonContainer/ButtonMenu/ListMenu/ListMenu";
import BookmarkBorderTwoToneIcon from "@mui/icons-material/BookmarkBorderTwoTone";
import {ICard} from "../../../../models/cardM";
import classNames from "classnames";
import {useTypedSelector} from "../../../../hooks/useTypedSelector";
import * as cardSelectors from "../../../../store/selectors/cardSelectors";


const BigCard: FC<ICard> = ({
                                title,
                                bg_path,
                                vote,
                                id,
                                overview,
                                typeAPI,
                                deleteCallback,
                                withDelete = false,
                            }) => {

    const deleteCardIds = useTypedSelector(cardSelectors.deleteId)
    const classnames = classNames({
        [`${s.root}`]: true,
        [`${s.root__delete}`]: deleteCardIds.includes(id),
    })

    return (<div className={classnames}>
            <div className={s.imgBox}>
                <img src={`${BASE_IMG_URL}/${bg_path}`} alt=""/>
            </div>
            <div className={s.mainBox}>
                <div className={s.titleBox}>
                    <div className={s.vote}>{vote?.toFixed(1)}</div>
                    <h2>{title}</h2>
                </div>
                <div className={s.overviewBox}>
                    {overview && overview?.length > 240 ? overview.slice(0, 240) + "..." : overview || "Не нашлось описания на русском языке или оно отсутствует"}
                </div>
                <div className={s.btnsBox}>
                    <ButtonContainer btnType={accountBtnsTypes.rate}
                                     itemId={id} size={buttonsSize.large}
                                     className={s.button}
                                     notLink={s.notLink}
                                     menuPlacement={"bottom"}
                                     tooltipPlacement={tooltipPlacementC.top}
                                     iconComponentRender={() => StarBorderOutlinedIcon}
                                     renderMenu={() => <RateMenu typeAPI={typeAPI}
                                                                 itemId={id}/>}
                    />
                    <ButtonContainer btnType={accountBtnsTypes.favourite}
                                     itemId={id} size={buttonsSize.large}
                                     className={s.button}
                                     tooltipPlacement={tooltipPlacementC.top}
                                     notLink={s.notLink}
                                     callback={deleteCallback}
                                     iconComponentRender={() => FavoriteBorderTwoToneIcon}/>
                    <ButtonContainer btnType={accountBtnsTypes.list}
                                     itemId={id} size={buttonsSize.large}
                                     className={s.button}
                                     notLink={s.notLink}
                                     menuPlacement={"bottom"}
                                     tooltipPlacement={tooltipPlacementC.top}
                                     iconComponentRender={() => FormatListBulletedTwoToneIcon}
                                     renderMenu={() => <ListMenu typeAPI={typeAPI}
                                                                 itemId={id}/>}
                    />
                    <ButtonContainer btnType={accountBtnsTypes.watchList}
                                     itemId={id} size={buttonsSize.large}
                                     className={s.button}
                                     callback={deleteCallback}
                                     tooltipPlacement={tooltipPlacementC.top}
                                     notLink={s.notLink}
                                     iconComponentRender={() => BookmarkBorderTwoToneIcon}/>
                    {withDelete && <ButtonContainer btnType={accountBtnsTypes.delete}
                                                    typeAPI={typeAPI}
                                                    itemId={id} size={buttonsSize.large}
                                                    className={s.button}
                                                    callback={deleteCallback}
                                                    tooltipPlacement={tooltipPlacementC.top}
                                                    notLink={s.notLink}
                                                    iconComponentRender={() => DeleteIcon}/>}
                </div>
            </div>
        </div>

    );
};

export default BigCard;