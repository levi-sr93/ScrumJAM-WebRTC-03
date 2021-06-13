import * as dashboardActions from "../actions/dashboardActions";

const initialState = {
  username: "",
  activeUsers: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case dashboardActions.DASHBOARD_SET_USERNAME:
      return {
        ...state,
        username: action.payload,
      };
    case dashboardActions.DASHBOARD_SET_ACTIVE_USERS:
      return {
        ...state,
        activeUsers: action.payload,
      };

    default:
      return state;
  }
};
