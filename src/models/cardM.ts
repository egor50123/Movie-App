import {MT_TYPES} from "../constants/constants";

export enum cardTypes {
    type_1 = "type_1",
    type_2 = "type_2"
}


export interface ICard {
    title: string | undefined,
    overview?: string,
    id: number,
    vote?: number,
    bg_path: string | null,
    type: TCardTypes
    typeAPI: MT_TYPES
    date?:string | undefined,
    country?:string[],
    genres?:number[],
    listType?:string | null
}

export type TCardTypes = cardTypes.type_1 | cardTypes.type_2

export interface IAccountStates {
    type:MT_TYPES,
    id:number,
    sessionId:string

}