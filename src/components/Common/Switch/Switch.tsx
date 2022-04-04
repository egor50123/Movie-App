import React, {FC} from 'react';
import {Types} from "../../../pages/MainPage/MainPage";
import "./Switch.scss"
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import {useAction} from "../../../hooks/useAction";

interface ISwitch {
    type:Types
}

export enum SwitchTypes {
    Movies = "Movies",
    Tv = "Tv"
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
        console.log(currentSwitch)
        if ( currentSwitch === SwitchTypes.Tv || currentSwitch === SwitchTypes.Movies){
            setCurrentSwitch(id, currentSwitch)
        }
    }

    return (
        <div className={"switch"}>
            {type === Types.Movies && <div className={"switch__list"}>
                {moviesTypes.map((text,index) =>
                    <span id={`Movies${index+1}`} key={`Movies${index+1}`} onClick={changeType} className={current.Movies === index+1 ? "active" : ""}>{text}</span>
                )}
            </div>}
            {type === Types.Tv && <div className={"switch__list"}>
                {tvTypes.map((text,index) =>
                    <span id={`Tv${index+1}`} key={`Tv${index+1}`} onClick={changeType} className={current.Tv === index+1 ? "active" : ""}>{text}</span>
                )}
            </div>}
        </div>
    );
};

export default Switch;