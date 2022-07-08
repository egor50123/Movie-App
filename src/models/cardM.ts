import {MT_TYPES} from "../constants/constants";

export interface ICard {
    title: string | undefined,
    overview?: string,
    id: number,
    vote?: number,
    bg_path: string | null,
    typeAPI: MT_TYPES
    date?:string | undefined,
    country?:string[],
    genres?:number[],
    listType?:string | null
}


export interface IAccountStates {
    type:MT_TYPES,
    id:number,
    sessionId:string

}