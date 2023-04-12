import React, {KeyboardEvent, ChangeEvent, useState} from 'react';
import {TextField} from '@mui/material';

type EditableSpanPropsType = {
    title: string
    changeTaskTitle: (title: string) => void
}

export function EditableSpan(props: EditableSpanPropsType) {
    const [editMode, setEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState(props.title)

    const setEditableMode = () => {
        setEditMode(true)
    }

    const setViewMode = () => {
        if (title.trim() !== '') {
            props.changeTaskTitle(title.trim())
            setEditMode(false)
        }
    }

    const onKeyUpTitleHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.code === 'Enter' && e.altKey && title.trim() !== '') {
            setViewMode()
        }
    }

    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return editMode
        ? <TextField
            size={'small'}
            variant={'standard'}
            value={title}
            onKeyUp={onKeyUpTitleHandler}
            onChange={onChangeTitleHandler}
            onBlur={setViewMode}
            autoFocus
        />
        : <span onDoubleClick={setEditableMode}>{props.title} </span>
}