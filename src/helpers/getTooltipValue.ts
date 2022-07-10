import {accountBtnsTypes} from "../constants/constants";

export const getTooltipValue = (btnType:string) => {
    switch (btnType){
        case accountBtnsTypes.list: return "Добавить в список"
        case accountBtnsTypes.favourite: return "Избранное"
        case accountBtnsTypes.rate: return "Оценить"
        case accountBtnsTypes.watchList: return "Закладки"
        case accountBtnsTypes.delete: return "Удалить"
        default: return ""
    }
}