import * as UserActionsCreators from "./popularFilmsAC"
import * as SearchActionsCreators from "./searchAC"
import * as ItemActionCreators from "./MovieTvPersonAC"

export default {
    ...UserActionsCreators,
    ...SearchActionsCreators,
    ...ItemActionCreators
}