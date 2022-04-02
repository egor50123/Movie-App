import React, {FC} from 'react';

interface ICategoriesCurrent {
    type: "movie" | "tv"
    current: "popular" | "best"
}

const CategoriesCurrent:FC<ICategoriesCurrent> = ({type,current= "popular"}) => {

    return (
        <>
            <div className={"categoriesPage__filter"}>
                {type}
            </div>
            <div className={"categoriesPage__list"}>
                {current}
            </div>
        </>
    );
};

export default CategoriesCurrent;