import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button, TextField} from "@mui/material";

export type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export function AddItemForm(props: AddItemFormPropsType) {
    const [newTitle, setNewTitle] = useState("")
    const [error, setError] = useState<string | null>(null)

    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.charCode == 13) {
            props.addItem(newTitle)
            setNewTitle("")
        }
    }
    const addTask = () => {
        if (newTitle.trim() !== '') {
            props.addItem(newTitle.trim())
            setNewTitle("")
        } else {
            setError('Tile is required')
        }

    }

    return (
        <div>
            <TextField variant={'standard'}
                       label={'Type title'}
                       value={newTitle}
                       onChange={onChangeTitleHandler}
                       onKeyPress={onKeyPressHandler}
                // className={error ? "error" : ''}
                       error={!!error}
            />
            <Button onClick={addTask} variant={'contained'} color={'secondary'}>+
            </Button>
            {error && <div className={"error-message"}>{error}</div>}
        </div>
    )

}