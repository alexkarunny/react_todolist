import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

export type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export function AddItemForm(props: AddItemFormPropsType) {
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

    return <div>
        <input onChange={onChangeAddTaskTitleHandler} value={newTaskTitle} onKeyUp={onKeyUpAddTaskHandler}
               className={error ? 'error' : ''}/>
        <button onClick={onClickAddTaskHandler}>+</button>
        {error && <div className={'error-message'}>{error}</div>}
    </div>
}