import React, {FC, useEffect, useState} from 'react';
import s from "./categoriesFilter.module.scss";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup
} from "@mui/material";
import {ExpandMore} from "@mui/icons-material";
import {MTP, MTP_TYPES} from "../../../constants/constants";
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import {moviesGenres, tvsGenres} from "../../../store/selectors/commonSelectors";

interface IGenresFilter {
    setRef: any,
    isResetFilter:boolean,
    type: MTP_TYPES
}

const GenresFilter: FC<IGenresFilter> = ({setRef,isResetFilter,type}) => {

    const [withGenres, setGenres] = useState({})

    const genresMovie = useTypedSelector(moviesGenres),
        genresTv = useTypedSelector(tvsGenres)
    const currentGenres = type === MTP.movie ? genresMovie : genresTv

    function onCheckbox(event: React.ChangeEvent<HTMLInputElement>) {
        setGenres({
            ...withGenres,
            [event.target.name]: event.target.checked,
        });
    }

    useEffect(() => {
        setGenres({})
    },[isResetFilter])

    return (
        <div ref={setRef} data-info={JSON.stringify(withGenres)} id={"genresFilter"}>
            <h2 className={s.title}>Жанры</h2>
            <div className={s.genres}>
                <FormControl>
                    <FormGroup>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMore/>}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                Выберите жанр
                            </AccordionSummary>
                            <AccordionDetails>
                                {currentGenres?.map(item =>
                                    <div className={s.genreWrapper} key={item.id + "gen"}>
                                        <FormControlLabel
                                            control={<Checkbox onChange={onCheckbox} name={`${item.id}`}/>}
                                            label={item.name}/>
                                    </div>
                                )}
                            </AccordionDetails>
                        </Accordion>
                    </FormGroup>
                </FormControl>
            </div>
        </div>
    );
};

export default GenresFilter;