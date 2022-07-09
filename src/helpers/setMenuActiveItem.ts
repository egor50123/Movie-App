import classNames from "classnames";

interface ISetMenuActiveItem {
    id:number,
    currentActiveId:number,
    classname:string,
    classnameActive:string
}

export const setMenuActiveItem = ({id,currentActiveId,classname,classnameActive}:ISetMenuActiveItem) => {
    return  classNames({
        [`${classname}`]: true,
        [`${classnameActive}`]: id === currentActiveId
    })
}