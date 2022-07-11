import React, {FC} from 'react';
import "./switch.module.scss"
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import {useAction} from "../../../hooks/useAction";
import {ISwitch} from "../../../models/previewItem_SwitchM";
import * as mainPageSelectors from "../../../store/selectors/mainPageSelectors";
import s from "./switch.module.scss"
import {EPreviewItems} from "../../../constants/constants";

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
        <div className={s.switch}>
            <div className={s.switch__list}>
                {switchTitles.map((item,index) =>
                    <span id={`${type}${index+1}`} key={`${type}${index+1}`} onClick={changeType} className={currentActive === index+1 ? s.active : ""}>{item[1]}</span>
                )}
            </div>
        </div>
    );
};

export default Switch;