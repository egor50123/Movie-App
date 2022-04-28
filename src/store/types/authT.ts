export interface authPayload {
    success: boolean,
    request_token: string,
}

export interface sessionPayload {
    session_id:string,
    success: boolean
}

export interface deleteSessionPayload {
    success:boolean
}

export interface authState {
    payload: authPayload | null
    isLoading: boolean,
    error: string | null
    session: {
        payload: sessionPayload | null
        isLoading: boolean,
        error: string | null
    }
}

export enum authActionCreators {
    FETCH_TOKEN = "FETCH_TOKEN",
    FETCH_TOKEN_SUCCESS = "FETCH_TOKEN_SUCCESS",
    SET_TOKEN_LOCAL = "SET_TOKEN_LOCAL",
    FETCH_TOKEN_ERROR = "FETCH_TOKEN_ERROR",
    CREATE_SESSION = "CREATE_SESSION",
    CREATE_SESSION_SUCCESS = "CREATE_SESSION_SUCCESS",
    CREATE_SESSION_ERROR = "CREATE_SESSION_ERROR",
    DELETE_SESSION = "DELETE_SESSION"
}

interface FetchTokenAction {
    type: authActionCreators.FETCH_TOKEN,
}

interface FetchTokenSuccessAction {
    type: authActionCreators.FETCH_TOKEN_SUCCESS,
    payload: authPayload,
}

interface SetTokenLocal {
    type: authActionCreators.SET_TOKEN_LOCAL,
    token: string
}

interface FetchTokenErrorAction {
    type: authActionCreators.FETCH_TOKEN_ERROR,
    error: string,
}

interface createSessionSuccessAction {
    type: authActionCreators.CREATE_SESSION_SUCCESS
    payload:sessionPayload
}

interface createSessionAction {
    type:authActionCreators.CREATE_SESSION
}

interface createSessionErrorAction {
    type:authActionCreators.CREATE_SESSION_ERROR,
    error: string
}

interface deleteSessionAction {
    type:authActionCreators.DELETE_SESSION
}



export type authActions = FetchTokenAction | FetchTokenSuccessAction | FetchTokenErrorAction | createSessionSuccessAction | createSessionAction | createSessionErrorAction | deleteSessionAction | SetTokenLocal