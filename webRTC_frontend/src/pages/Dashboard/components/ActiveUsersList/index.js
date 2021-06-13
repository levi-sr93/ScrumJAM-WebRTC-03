import React from "react";

import { useSelector } from "react-redux";

import ActiveUsersListItem from "./ActiveUsersListItem";

import "./styles.css";

function ActiveUsersItem() {
  const activeUsers = useSelector((state) => state.dashboard.activeUsers);

  return (
    <div className="active_user_list_container">
      {activeUsers.map((activeUser) => (
        <ActiveUsersListItem
          key={activeUser.socketId}
          activeUser={activeUser}
        />
      ))}
    </div>
  );
}

export default ActiveUsersItem;
