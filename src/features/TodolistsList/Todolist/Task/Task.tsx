import React, {ChangeEvent, memo, useCallback} from 'react';
import {Checkbox, IconButton, ListItem} from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import {EditableSpan} from '../../../../components/editableSpan/EditableSpan';
import {TaskStatusType} from '../../../../api/todolists-api';
import {RequestStatusType} from '../../../../app/app-reducer';
import {DomainTaskType} from '../../tasks-reducers';

type PropsType = {
    task: DomainTaskType
    editTaskTitle: (newTitle: string, taskId: string) => void
    removeTask: (taskId: string ) => void
    changeTaskStatus: (taskId: string, taskStatus: boolean) => void
    todolistEntityStatus: RequestStatusType
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
                        disabled={props.todolistEntityStatus === 'loading' || props.task.entityTaskStatus === 'loading'}
                    >
                        <HighlightOffIcon/>
                    </IconButton>
                }
            >
                <Checkbox
                    id={props.task.id}
                    edge={'start'}
                    size={'small'}
                    checked={task.status === TaskStatusType.Completed} onChange={changeTaskStatus}
                    disabled={props.todolistEntityStatus === 'loading'|| props.task.entityTaskStatus === 'loading' }
                />
                <EditableSpan title={task.title} changeTaskTitle={changeTaskTitle} todolistEntityStatus={props.todolistEntityStatus} taskEntityStatus={props.task.entityTaskStatus}/>
            </ListItem>
        </div>
    );
})

