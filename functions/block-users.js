const checkIfUserIsAlreadyBlocked = (username) => {
  const blockedUsers = JSON.parse(window.localStorage.getItem("blocked_users"));

  if (blockedUsers.includes(username)) return true;
  else return false;
};

const addUserToBlockedList = (username) => {
  if (checkIfUserIsAlreadyBlocked(username)) {
    console.log("-> User is already blocked");
    return;
  }

  const blockedUsers = JSON.parse(window.localStorage.getItem("blocked_users"));
  blockedUsers.push(username);
  window.localStorage.setItem("blocked_users", JSON.stringify(blockedUsers));
  console.log("-> New blocked users", blockedUsers);
};
