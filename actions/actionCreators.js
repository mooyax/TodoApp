import { createAction, createActions } from 'redux-actions'

//アクション関数
export const Actions = createActions(
        'TODO_ADD',
        'TODO_DELETE',
        'TODO_TOGGLE',
        'THEME_SETTINGS',
)