import * as actionTypes from "../actions/actionTypes"

const initialState = {
  isCollapsed: true,
  isToggled: false,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.TOGGLE_COLLAPSE:
      return { ...state, isCollapsed: !state.isCollapsed }
    case actionTypes.COLLAPSE_MOBILE_TOGGLE:
      return { ...state, isToggled: !state.isToggled }
    default:
      return state
  }
}

export default reducer
