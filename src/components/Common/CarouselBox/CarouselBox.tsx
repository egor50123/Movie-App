import React, {FC} from 'react';
import s from "./carouselBox.module.scss"

interface IProps {
    cardWidth?:string,
    cardHeight?:string,
    cardGap?:string
    render?:any
    title: string
}

const CarouselBox:FC<IProps> = ({cardWidth="100px",cardHeight="200px",cardGap="15px" ,render,title}) => {
    return (
        <div className={s.root}>
            <h2>{title}</h2>
            {render(s.box)}
        </div>
    );
};

export default CarouselBox;