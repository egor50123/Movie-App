import React from "react";

export const setCheckbox = (e: React.ChangeEvent<HTMLInputElement>,withGenres:string) => {
    let id = e.target.id,
        target = e.target.name,
        isActive = e.target.checked,
        newGenres = withGenres

    if (id !== undefined) {
        if (withGenres.includes(id)) {
            newGenres = newGenres.replace(`${id}|`, "")
        } else {
            newGenres += `${id}|`
        }
    }
    return {newGenres,target,isActive}
}