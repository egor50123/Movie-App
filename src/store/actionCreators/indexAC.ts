import * as UserActionsCreators from "./popularFilmsAC"
import * as SearchActionsCreators from "./searchAC"

export default {
    ...UserActionsCreators,
    ...SearchActionsCreators
}