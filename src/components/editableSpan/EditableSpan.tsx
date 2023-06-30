import React, {KeyboardEvent, ChangeEvent, useState, memo} from 'react';
import {TextField} from '@mui/material';
import {RequestStatusType} from '../../app/app-reducer';

type EditableSpanPropsType = {
    title: string
    changeTaskTitle: (title: string) => void
    todolistEntityStatus?: RequestStatusType
    taskEntityStatus?: RequestStatusType
}

export const EditableSpan = memo((props: EditableSpanPropsType) => {
    const [editMode, setEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState(props.title)

    const setEditableMode = () => {
        if(props.todolistEntityStatus === 'loading' || props.taskEntityStatus === 'loading') {
            return
        }
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
            name={'editableSpan'}
            size={'small'}
            variant={'standard'}
            value={title}
            onKeyUp={onKeyUpTitleHandler}
            onChange={onChangeTitleHandler}
            onBlur={setViewMode}
            autoFocus
        />
        : <span onDoubleClick={setEditableMode} >{props.title} </span>
})