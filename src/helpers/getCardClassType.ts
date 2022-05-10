import {cardTypes} from "../models/cardM";

export const getCardClassType = () => {
    return {
        [cardTypes.type_1]: {
            "card":"card card--common",
            "card__header":"card__header card__header--common",
            "card__main": "card__main card__main--common",
            "card__title": "card__title card__title--common",
            "card__overview": "card__overview card__overview--common",
            "card__btns": "card__btns card__btns--common",
            "card__vote": "card__vote card__vote--common",
            "card__date": "card__date card__date--common",
            "card__genres": "card__genres card__genres--common",
            "card__titleBox": "card__titleBox card__titleBox--common"
        },
        [cardTypes.type_2]: {
            "card":"card card--list",
            "card__header":"card__header card__header--list",
            "card__main": "card__main card__main--list",
            "card__title": "card__title card__title--list",
            "card__overview": "card__overview card__overview--list",
            "card__btns": "card__btns card__btns--list",
            "card__vote": "card__vote card__vote--list",
            "card__date": "card__date card__date--list",
            "card__genres": "card__genres card__genres--list",
            "card__titleBox": "card__titleBox card__titleBox--list"
        }
    }
}