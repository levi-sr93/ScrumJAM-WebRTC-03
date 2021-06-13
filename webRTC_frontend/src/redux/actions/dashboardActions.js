export const DASHBOARD_SET_USERNAME = "DASHBOARD_SET_USERNAME";
export const DASHBOARD_SET_ACTIVE_USERS = "DASHBOARD_SET_ACTIVE_USERS";

export const setUsername = (username) => {
  return {
    type: DASHBOARD_SET_USERNAME,
    payload: username,
  };
};

export const setActiveUsers = (activeUsers) => {
  return {
    type: DASHBOARD_SET_ACTIVE_USERS,
    payload: activeUsers,
  };
};
