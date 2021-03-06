import ConstantsActionTypes from './sendHelp.constants';

const INITIAL_STATE = {
  location: null,
  sent: false,
  isSending: false
};


const sendHelpReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ConstantsActionTypes.SET_USER_LOCATION:
      return {
        ...state,
        location: action.payload
      };
    case ConstantsActionTypes.SENT_USER_LOCATION:
      return {
        ...state,
        sent: action.payload
      };
    case ConstantsActionTypes.POST_USER_DETAILS_START:
      return {
        ...state,
        isSending: true
      };
    case ConstantsActionTypes.POST_USER_DETAILS_SUCCESS:
      return {
        ...state,
        message: action.payload,
        isSending: false
      };
    case ConstantsActionTypes.POST_USER_DETAILS_FAILED:
      return {
        ...state,
        message: action.payload,
        isSending: false
      };

    default:
      return state;
  }
};


export default sendHelpReducer;
