import React from 'react';
import s from "../movieTvItem.module.scss";

const Aside = () => {
    return (
        <div className={s.footerColumn2}>
            <div className={s.footerColumn2Box}>
                <div className={s.footerColumnBoxItem}>
                    <h3>Исходное название</h3>
                    <p>See You Soon</p>
                </div>
                <div className={s.footerColumnBoxItem}>
                    <h3>Статус</h3>
                    <p>Выпущено</p>
                </div>
                <div className={s.footerColumnBoxItem}>
                    <h3>Исходный язык</h3>
                    <p>английский</p>
                </div>
                <div className={s.footerColumnBoxItem}>
                    <h3>Бюджет</h3>
                    <p>$59,000,000.00</p>
                </div>
                <div className={s.footerColumnBoxItem}>
                    <h3>Сборы</h3>
                    <p>$383,257,136.00</p>
                </div>
                <div className={s.footerColumnBoxItem}>
                    <h3>Ключевые слова</h3>
                    <p> Не найдено</p>
                </div>
            </div>
        </div>
    );
};

export default Aside;