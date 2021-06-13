import React from "react";

import userAvatar from "../../../../assets/images/userAvatar.png";
import { callToOtherUsers } from "../../../../utils/webRTC/webRTCHandler";

function ActiveUsersListItem({ activeUser }) {
  const handleListItemPress = () => {
    callToOtherUsers(activeUser);
  };
  return (
    <div className="active_user_list_item" onClick={handleListItemPress}>
      <div className="active_user_list_image_container">
        <img
          className="active_user_list_image"
          src={userAvatar}
          alt="user avatar"
        />
      </div>
      <span className="active_user_list_text">{activeUser.username}</span>
    </div>
  );
}

export default ActiveUsersListItem;
