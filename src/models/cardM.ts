export enum cardTypes {
    type_1 = "type_1",
    type_2 = "type_2"
}

export enum cardTypeAPI {
    movie = "movie",
    tv = "tv"
}

export type TCardTypeAPI = cardTypeAPI.tv | cardTypeAPI.movie

export interface ICard {
    title: string | undefined,
    overview?: string,
    id: number,
    vote?: number,
    bg_path: string | null,
    type: TCardTypes
    typeAPI: TCardTypeAPI
    date?:string | undefined,
    country?:string[],
    genres?:number[],
}

export type TCardTypes = cardTypes.type_1 | cardTypes.type_2