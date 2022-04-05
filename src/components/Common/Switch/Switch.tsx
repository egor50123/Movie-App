import React, {FC} from 'react';
import "./Switch.scss"
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import {useAction} from "../../../hooks/useAction";
import {EPreviewItems, PreviewItemsTypes} from "../../../models/previewItem_SwitchM";

interface ISwitch {
    type:PreviewItemsTypes
}



const Switch:FC<ISwitch> = ({type}) => {
    const moviesTypes = ["Смотрят сейчас","Популярное","Ожидаемые","Лучшие"];
    const tvTypes = ["Популярное","В эфире","По телевидению","Лучшее"]
    let current = useTypedSelector(state => state.mainPage.switchType)

    const {setCurrentSwitch} = useAction()


    function changeType(e:React.MouseEvent<HTMLElement>) {
        let targetId = (e.target as HTMLElement).id
        let id = Number(targetId.replace(/[a-z]/gi,""))
        let currentSwitch = String(targetId.replace(/\d/g,""))
        if ( currentSwitch === EPreviewItems.Tv || currentSwitch === EPreviewItems.Movies){
            setCurrentSwitch(id, currentSwitch)
        }
    }

    return (
        <div className={"switch"}>
            {type === EPreviewItems.Movies && <div className={"switch__list"}>
                {moviesTypes.map((text,index) =>
                    <span id={`${EPreviewItems.Movies}${index+1}`} key={`${EPreviewItems.Movies}${index+1}`} onClick={changeType} className={current.Movies === index+1 ? "active" : ""}>{text}</span>
                )}
            </div>}
            {type === EPreviewItems.Tv && <div className={"switch__list"}>
                {tvTypes.map((text,index) =>
                    <span id={`${EPreviewItems.Tv}${index+1}`} key={`${EPreviewItems.Tv}${index+1}`} onClick={changeType} className={current.Tv === index+1 ? "active" : ""}>{text}</span>
                )}
            </div>}
        </div>
    );
};

export default Switch;