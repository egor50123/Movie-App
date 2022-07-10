import React, {FC, useRef, useState} from 'react';
import s from "../buttonMenu.module.scss"
import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent
} from "@mui/material";
import {MTP, MTP_TYPES} from "../../../../../constants/constants";
import {useTypedSelector} from "../../../../../hooks/useTypedSelector";
import * as accountSelectors from "../../../../../store/selectors/accountSelectors";
import {useAccountBtns} from "../../../../../hooks/useAccountBtns";

interface IRateMenu {
    itemId:number,
    typeAPI: MTP_TYPES,
    callback?:any
}


const ListMenu:FC<IRateMenu> = ({itemId,typeAPI,callback}) => {
    const isLoading = useTypedSelector(accountSelectors.createdListLoading)
    const createdLists = useTypedSelector(accountSelectors.createdLists)
    const {addToList} = useAccountBtns()

    const [isOpen,setOpenMenu] = useState(true)
    const [currentList, setList] = React.useState<string | number>('');
    const [open, setOpen] = React.useState(false);
    let flag = useRef(false)


    const onSubmit = (listId:number) => addToList({listId, type: MTP.movie, itemId:itemId})
    const onClose = () => setOpenMenu(false)
    const handleChange = (event: SelectChangeEvent<typeof currentList>) => setList(event.target.value);

    return (
        <>
            {isOpen && <div className={s.listMenu}>
                {isLoading ? "loading" : <div id={String(itemId)} className={s.menuBox}>
                    <h3>Создать новый список</h3>
                    <FormControl sx={{m: 1, minWidth: 250}}>
                        <InputLabel id="list">Выберите список</InputLabel>
                        <Select
                            labelId="list"
                            id="list"
                            open={open}
                            onClose={() => setOpen(false)}
                            onOpen={() => {
                                setOpen(true)
                                flag.current = true
                            }}
                            value={currentList}
                            label="Выберите список"
                            onChange={handleChange}
                        >
                            {createdLists && createdLists.map(item => (
                                <MenuItem onClick={() => {
                                    onSubmit(item.id)
                                    typeof callback === "function" && callback()
                                    onClose()
                                }} value={item.name}>{item.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>}
            </div>}
        </>
    );
};

export default ListMenu;