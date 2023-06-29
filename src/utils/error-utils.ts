import {AppDispatch} from '../app/store';
import {setAppError, switchRequestStatus} from '../app/app-reducer';
import {ResponseType} from '../api/todolists-api';


export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: AppDispatch) => {
    if (data.messages.length) {
        dispatch(setAppError(data.messages[0]))
    } else {
        dispatch(setAppError('Some error occurred'))
    }
    dispatch(switchRequestStatus('failed'))
}

export const handleServerNetworkError = (error: {message: string}, dispatch: AppDispatch) => {
    dispatch(setAppError(error.message))
    dispatch(switchRequestStatus('failed'))
}
