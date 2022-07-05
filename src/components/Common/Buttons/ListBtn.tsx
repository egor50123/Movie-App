import React, {FC, useState} from 'react';
import {
    Checkbox,
    FormControl,
    FormControlLabel,
    IconButton,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
    SelectChangeEvent,
    SvgIcon,
    Tooltip,
} from "@mui/material";
import styles from "../Card/card.module.scss";
import FormatListBulletedTwoToneIcon from "@mui/icons-material/FormatListBulletedTwoTone";
import s from "./buttons.module.scss"
import {useAccountBtns} from "../../../hooks/useAccountBtns";
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import * as accountSelectors from "../../../store/selectors/accountSelectors"
import {MT_TYPES, MTP, MTP_TYPES} from "../../../constants/constants";
import {IProps} from "./types";


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 0;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

export interface IListBtnCurrentList {
    [id:number]: {
        flag:boolean,
        name:string
    }
}


const ListBtn:FC<IProps> = ({itemId,typeAPI,className,size = "small"}) => {
    const isLoading = useTypedSelector(accountSelectors.createdListLoading)
    const createdLists = useTypedSelector(accountSelectors.createdLists)
    const [currentLists, setCurrentLists] = useState<IListBtnCurrentList>({})
    const [labelText,setLabelText] = useState<string[]>([])

    const {getMyCreatedList,addToList} = useAccountBtns()
    const handleChange = (event: SelectChangeEvent<typeof labelText>) => {
        const value = event.target.value
        setLabelText(typeof value === "string" ? value.split(",") : value)
    };


    const [isOpen, setOpen] = useState(false)

    function onOpen(e:any) {
        setOpen(prev => !prev)
        getMyCreatedList()
    }

    function onCheckbox(event: React.ChangeEvent<HTMLInputElement>) {
        setCurrentLists({
            ...currentLists,
            [event.target.id]: {
                flag:event.target.checked,
                name: event.target.name,
                id: event.target.id
            },
        });
    }

    function onSubmit() {
        addToList({listData:currentLists, type: MTP.movie, itemId:itemId})
    }


    return (
        <div className={s.button}>
            <Tooltip title={"Добавить в список"} placement={"right"}>
                <div onClick={(e) => onOpen(e)} className={className}>
                    <IconButton color={'default'} size={size}>
                        <SvgIcon sx={{fontSize: 15}} component={FormatListBulletedTwoToneIcon} inheritViewBox/>
                    </IconButton>
                </div>
            </Tooltip>
            {isOpen && <div className={s.listMenu}>
                {isLoading ? "loading" : <>
                    <h3>Создать новый список</h3>
                    <FormControl sx={{m: 1, width: 250}}>
                        <InputLabel id="demo-multiple-checkbox-label">Выбрать список</InputLabel>
                        <Select
                            labelId="List"
                            id="List"
                            multiple
                            value={['Выюерите из списка']}
                            onChange={handleChange}
                            input={<OutlinedInput label="Выбрать список"/>}
                            renderValue={(selected) => selected.join(", ")}
                            MenuProps={MenuProps}
                        >
                            {createdLists && createdLists.map((item) => (
                                <MenuItem key={item.id} value={item.name} sx={{
                                    padding: 0,
                                }}>
                                    <FormControlLabel
                                        sx={{
                                            minWidth: "100%",
                                            margin: 0,
                                            padding: "5px 8px"
                                        }}
                                        label={item.name}
                                        control={<Checkbox disabled={item.id === itemId} checked={currentLists[item.id]?.flag === undefined ? false : currentLists[item.id].flag}
                                                           onChange={onCheckbox}
                                                           id={`${item.id}`}
                                                           name={`${item.name}`}/>}/>
                                </MenuItem>
                            ))}
                            <button onClick={onSubmit} className={s.submitBtn}>Добавить</button>
                        </Select>
                    </FormControl>
                </>}

              {/*<button onClick={onSubmit} className={s.submitBtn}>Добавить</button>*/}
            </div>}
        </div>
    );
};

export default ListBtn;