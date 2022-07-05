import {MTP_TYPES} from "../../../constants/constants";

export interface IProps {
    typeAPI: MTP_TYPES,
    itemId: number
    className: string
    cardRef?:null | HTMLDivElement
    listType?: string | null,
    size?: "small" | "large" | "medium"
}