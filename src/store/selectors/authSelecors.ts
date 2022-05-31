import {RootState} from "../index";

export const isAuth = (state:RootState) => state.auth.session.payload?.success
export const token = (state:RootState) => state.auth.payload?.request_token
export const session = (state:RootState) => state.auth.session.payload?.session_id

//import * as authSelectors from "../../store/selectors/authSelecors"