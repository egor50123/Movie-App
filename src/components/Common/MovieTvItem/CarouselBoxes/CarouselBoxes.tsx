import React from 'react';
import s from "../movieTvItem.module.scss";
import CarouselBox from "../../CarouselBox/CarouselBox";
import Card from "../../Card/Card";
import {MTP} from "../../../../constants/constants";
import SmallCard from "../../Card/SmallCard/SmallCard";
import ActorCard from "../../ActorCard/ActorCard";
import {IMoviesTvsPayload, IPeoplePayload} from "../../../../models/payloadAPI_M";
import {useTypedSelector} from "../../../../hooks/useTypedSelector";


const CarouselBoxes = () => {
        const peoplePayload: IPeoplePayload | null = useTypedSelector(state => state.movieTvPerson.people.payload),
        similarPayload: IMoviesTvsPayload | null = useTypedSelector(state => state.movieTvPerson.similar.payload);

    return (
        <div className={s.footerColumn1}>
            <CarouselBox title={"Рекомендации"} render={(boxClassName: any) => <div className={boxClassName}>
                {similarPayload && similarPayload.results?.map(item => <div
                    className={s.movieTvItem__similarItem}>
                    <Card id={item.id}
                          typeAPI={item.title === undefined ? MTP.tv : MTP.movie}
                          renderCard={() => <SmallCard  key={item.id} id={item.id}
                                                        title={item.title as string || item.name as string}
                                                        typeAPI={item.title === undefined ? MTP.tv : MTP.movie }
                                                        bg_path={item.poster_path}
                                                        overview={item.overview}
                                                        vote={item.vote_average}
                                                        date={item.release_date as string || item.first_air_date as string}
                                                        country={item.origin_country}
                                                        genres={item.genre_ids}/>}/>
                </div>)}
            </div>
            }/>
            <CarouselBox title={"Актеры"} render={(boxClassName: any) => <div className={boxClassName}>
                {peoplePayload && peoplePayload.cast.map(item =>
                    <ActorCard src={item.profile_path} name={item.name} key={item.id + "q"}/>
                )}
            </div>
            }/>
        </div>
    );
};

export default CarouselBoxes;