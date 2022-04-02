import React, {FC} from 'react';

interface ISearchCurrent {
    type: "movie" | "tv"
}

const SearchCurrent: FC<ISearchCurrent> = ({type}) => {
    let text = "movie"
    switch (type) {
        case "movie" : text = "movie";break;
        case "tv": text = "tv";break;
    }

    return (
        <div>
            {text}
        </div>
    );
};

export default SearchCurrent;