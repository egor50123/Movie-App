import React from 'react';
import s from "../myLists.module.scss"

const ListItem = () => {
    return (
        <div className={s.item}>
            <div className={s.itemBox}>
                <h2 className={s.itemTitle}>Заголовок</h2>
                <p className={s.itemSize}> 3 элемента</p>
                <p className={s.itemLastUpdate}> Обновлено 8 дней назад</p>
            </div>
        </div>
    );
};

export default ListItem;