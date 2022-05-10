export interface ICard {
    title: string,
    overview: string,
    id: number,
    vote: number,
    bg_path: string | null,
    type: TCardTypes
    date:string,
    country?:string[],
    genres:number[],
}

export enum cardTypes {
    type_1 = "type_1",
    type_2 = "type_2"
}

export type TCardTypes = cardTypes.type_1 | cardTypes.type_2