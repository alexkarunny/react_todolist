import React, {ChangeEvent, memo, useCallback} from 'react';
import {Checkbox, IconButton, ListItem} from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import {EditableSpan} from './components/EditableSpan';
import {TaskStatusType, TaskType} from './api/todolists-api';

type PropsType = {
    task: TaskType
    editTaskTitle: (newTitle: string, taskId: string) => void
    removeTask: (taskId: string ) => void
    changeTaskStatus: (taskId: string, taskStatus: boolean) => void
}

export const Task = memo((props: PropsType) => {
    const {task, ...restProps} = props

    const changeTaskTitle = useCallback((title: string) => {
        restProps.editTaskTitle(title, task.id)
    }, [restProps.editTaskTitle, task.id] )

    const removeTaskHandler = () => {
        restProps.removeTask(task.id)
    }
    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
        debugger
        restProps.changeTaskStatus(task.id, e.currentTarget.checked)
    }

    return (
        <div>
            <ListItem
                key={task.id}
                className={task.status === TaskStatusType.Completed ? 'is-done' : ''}
                divider
                disablePadding
                secondaryAction={
                    <IconButton
                        size={'small'}
                        onClick={removeTaskHandler}
                    >
                        <HighlightOffIcon/>
                    </IconButton>
                }
            >
                <Checkbox
                    edge={'start'}
                    size={'small'}
                    checked={task.status === TaskStatusType.Completed} onChange={changeTaskStatus}
                />
                <EditableSpan title={task.title} changeTaskTitle={changeTaskTitle}/>
            </ListItem>
        </div>
    );
})

