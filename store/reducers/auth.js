import * as actionTypes from "../actions/actionTypes"

const initialState = {
  user: null,
  userLoading: false,
  isModalVisible: false,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTHENTICATE:
      return { ...state, user: action.user }
    case actionTypes.LOGOUT:
      return { ...state, user: null }
    case actionTypes.SET_LOADING:
      return { ...state, userLoading: action.action }
    case actionTypes.SET_MODAL_VISIBILITY:
      return { ...state, isModalVisible: action.action }

    default:
      return state
  }
}

export default reducer
