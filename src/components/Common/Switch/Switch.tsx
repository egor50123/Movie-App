import React, {FC} from 'react';
import "./Switch.scss"
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import {useAction} from "../../../hooks/useAction";
import {EPreviewItems, PreviewItemsTypes} from "../../../models/previewItem_SwitchM";
import * as mainPageSelectors from "../../../store/selectors/mainPageSelectors";

interface ISwitch {
    type:PreviewItemsTypes,
    switchTitles:string[][]
}

const Switch:FC<ISwitch> = ({type,switchTitles}) => {
    let currentSwitch = useTypedSelector(mainPageSelectors.currentSwitch)
    let currentActive = currentSwitch[type] === undefined ? 1 : currentSwitch[type]

    const {setCurrentSwitch} = useAction()

    function changeType(e:React.MouseEvent<HTMLElement>) {
        let targetId = (e.target as HTMLElement).id
        let id = Number(targetId.replace(/[a-z]/gi,""))
        let currentSwitch = String(targetId.replace(/\d/g,""))

        if ( currentSwitch === EPreviewItems[type]){
            setCurrentSwitch(id, currentSwitch)
        }
    }

    return (
        <div className={"switch"}>
            <div className={"switch__list"}>
                {switchTitles.map((item,index) =>
                    <span id={`${type}${index+1}`} key={`${type}${index+1}`} onClick={changeType} className={currentActive === index+1 ? "active" : ""}>{item[1]}</span>
                )}
            </div>
        </div>
    );
};

export default Switch;