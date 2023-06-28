import React, {ChangeEvent, KeyboardEvent, memo, useState} from 'react';
import PlusOneIcon from '@mui/icons-material/PlusOne';
import {IconButton, TextField} from '@mui/material';
import {RequestStatusType} from '../../app/app-reducer';

export type AddItemFormPropsType = {
    addItem: (title: string) => void
    todolistEntityStatus?: RequestStatusType
}

export const AddItemForm: React.FC<AddItemFormPropsType> = memo((props) => {
    const [newTaskTitle, setNewTaskTitle] = useState<string>('')
    const [error, setError] = useState<string | null>(null)


    const onChangeAddTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setNewTaskTitle(e.currentTarget.value)
    }

    const onKeyUpAddTaskHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.code === 'Enter' && e.ctrlKey && newTaskTitle.trim() !== '') {
            props.addItem(newTaskTitle)
            setNewTaskTitle('')
        } else if (e.code === 'Enter' && e.ctrlKey && newTaskTitle.trim() === '') {
            setError('Title is require')
        }
    }
    const onClickAddTaskHandler = () => {
        if (newTaskTitle.trim() !== '') {
            props.addItem(newTaskTitle.trim())
            setNewTaskTitle('')
        } else {
            setError('Title is require')
        }
    }
    const errorMessage = error && <div className={'error-message'}>{error}</div>
    return <div>

        <TextField
            size={'small'}
            onChange={onChangeAddTaskTitleHandler}
            value={newTaskTitle} onKeyUp={onKeyUpAddTaskHandler}
            error={!!error}
            helperText={errorMessage}
        />

        <IconButton
            size={'small'}
            onClick={onClickAddTaskHandler}
            disabled={props.todolistEntityStatus === 'loading'}
        >
            <PlusOneIcon/>
        </IconButton>
    </div>
})