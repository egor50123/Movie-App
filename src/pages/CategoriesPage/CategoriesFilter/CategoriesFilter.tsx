import {Link} from "react-router-dom";
import {CategoriesSortTypes, FilterRangeNames, ICategoriesFilter, ICheckbox} from "../../../models/categoriesM";
import React, {FC, useEffect, useState} from "react";
import {setCheckbox} from "../../../helpers/setCheckbox";
import {useAction} from "../../../hooks/useAction";
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import {MTP} from "../../../constants/constants";
import {moviesGenres, tvsGenres} from "../../../store/selectors/commonSelectors";
import s from "./categoriesFilter.module.scss"
import {
    Accordion, AccordionDetails, AccordionSummary,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent, Slider
} from "@mui/material";
import {ExpandMore} from "@mui/icons-material";

const CategoriesFilter: FC<ICategoriesFilter> = ({type}) => {

    const {categoriesFilterUpdate, categoriesFilterReset} = useAction()

    const genresMovie = useTypedSelector(moviesGenres),
        genresTv = useTypedSelector(tvsGenres)

    const currentGenres = type === MTP.movie ? genresMovie : genresTv

    let [sortType, setSortType] = useState<string>(CategoriesSortTypes.popularityDown),
        [dateType, setDate] = useState("all"),
        [withGenres, setGenres] = useState({}),
        [filterSettings, changeFilterSettings] = useState({
            [FilterRangeNames.minYear]: "",
            [FilterRangeNames.maxYear]: "",
            [FilterRangeNames.minRank]: "",
            [FilterRangeNames.maxRank]: "",
            [FilterRangeNames.minRuntime]: "",
            [FilterRangeNames.maxRuntime]: ""
        })

    const [rate, setRate] = useState<number[]>([0,100])


    function onCheckbox(event: React.ChangeEvent<HTMLInputElement>) {
        setGenres({
            ...withGenres,
            [event.target.name]: event.target.checked,
        });
    }

    function onSelect(e: SelectChangeEvent) {
        let target = e.target.value as string
        setSortType(target)
    }

    function onSelectDate(e: SelectChangeEvent) {
        let target = e.target.value as string
        setDate(target)
    }

    function onFind() {
        window.scrollTo(0, 0)
        categoriesFilterUpdate(getSettings())
    }

    function getSettings() {
        return {...filterSettings, sortType, withGenres}
    }

    useEffect(() => {
        categoriesFilterReset()
        setGenres({})
        setSortType(CategoriesSortTypes.popularityDown)
        return () => {
            categoriesFilterReset()
            setGenres({})
            setSortType(CategoriesSortTypes.popularityDown)
        }
    }, [type])

    const onRateChange = (event: Event, newValue: number | number[]) => {
        setRate(newValue as number[]);
    };

    function valuetext(value: number) {
        return `${value/10}`;
    }

    const marks = [
        {
            value: 0,
            label: '0',
        },
        {
            value: 10,
            label: '10',
        },
    ];

    return (
        <div className={s.filter}>
            <div className={s.filter__item}>
                <h2 className={s.title}>Сортировать</h2>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Сортировать результаты по</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={sortType}
                        label="Сортировать результаты по"
                        onChange={onSelect}
                    >
                        <MenuItem value={`${CategoriesSortTypes.popularityDown}`}>Попуярность (убывание)</MenuItem>
                        <MenuItem value={`${CategoriesSortTypes.popularityUp}`}>Попуярность (возрасстание)</MenuItem>
                        <MenuItem value={`${CategoriesSortTypes.releaseDown}`}>Дата выпуска (убывание)</MenuItem>
                        <MenuItem value={`${CategoriesSortTypes.releaseUp}`}>Дата выпуска (возрасстание)</MenuItem>
                        <MenuItem value={`${CategoriesSortTypes.voteAverageDown}`}>Рейтинг (убывание)</MenuItem>
                        <MenuItem value={`${CategoriesSortTypes.voteAverageUp}`}>Рейтинг (возрасстание)</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <div className={s.filter__item}>
                <h2 className={s.title}>Дата выхода</h2>
                <FormControl fullWidth>
                    <InputLabel id="date">Год</InputLabel>
                    <Select
                        labelId="date"
                        id="date"
                        value={dateType}
                        label="Год"
                        onChange={onSelectDate}
                    >
                        <MenuItem value={`all`}>Все годы</MenuItem>
                        <MenuItem value={`2022`}>2022</MenuItem>
                        <MenuItem value={`2021-2022`}>2021-2022</MenuItem>
                        <MenuItem value={`2020-2022`}>2020-2022</MenuItem>
                        <MenuItem value={`2019-2020`}>2019-2020</MenuItem>
                        <MenuItem value={`2010-2020}`}>2010-2020</MenuItem>
                        <MenuItem value={`2010-2015`}>2010-2015</MenuItem>
                        <MenuItem value={`2000-2010`}>2000-2010</MenuItem>
                        <MenuItem value={`1990-2000`}>1990-2000</MenuItem>
                        <MenuItem value={`1980-1990`}>1980-1990</MenuItem>
                        <MenuItem value={`до 1980`}>до 1980</MenuItem>
                    </Select>
                </FormControl>
                {/*<div>от <input type="text" id={FilterRangeNames.minYear} onChange={onChange}*/}
                {/*               value={filterSettings[FilterRangeNames.minYear]}/></div>*/}
                {/*<div>до <input type="text" id={FilterRangeNames.maxYear} onChange={onChange}*/}
                {/*               value={filterSettings[FilterRangeNames.maxYear]}/></div>*/}
            </div>
            <div className={s.filter__item}>
                <h2 className={s.title}>Жанры</h2>
                <div className={s.genres}>
                    <FormControl>
                        <FormGroup>
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMore />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    Выберите жанр
                                </AccordionSummary>
                                <AccordionDetails>
                                    {currentGenres?.map(item =>
                                        <div className={s.genreWrapper}  key={item.id + "gen"}>
                                            <FormControlLabel control={<Checkbox onChange={onCheckbox} name={`${item.id}`}/>} label={item.name} />
                                        </div>
                                    )}
                                </AccordionDetails>
                            </Accordion>
                        </FormGroup>
                    </FormControl>
                </div>
            </div>
            <div className={s.filter__item}>
                <h2 className={s.title}>Рейтинг</h2>
                <div className={s.slider}>
                    <div className={s.slider_box}>
                        <Slider
                            marks={marks}
                            min={0}
                            max={10}
                            step={0.1}
                            getAriaLabel={() => 'Temperature range'}
                            value={rate}
                            onChange={onRateChange}
                            valueLabelDisplay="auto"
                            size={'small'}
                            getAriaValueText={valuetext}
                        />
                    </div>
                </div>
            </div>
            <button className={s.buttonSearch} onClick={onFind}><Link to={`/${type}`}>Поиск</Link></button>
        </div>
    )
}

export default CategoriesFilter