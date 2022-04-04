var gUsers = [];
_createUsers();
var time = new Date();
var sortOrder = "";

function _createUser(username, password, isAdmin = false) {
  return {
    id: _makeId(),
    username,
    password,
    lastLoginTime:
      time.getHours() + ":" + "0" + time.getMinutes() + ":" + time.getSeconds(),
    isAdmin,
  };
}

function _createUsers() {
  var users = loadFromStorage("usersDB");
  if (!users || !users.length) {
    users = [
      _createUser("admin", "admin", (isAdmin = true)),
      _createUser("puki", "secret"),
      _createUser("yosi", "5212"),
    ];
  }
  gUsers = users;
  _saveUsersToStorage();
}
function _saveUsersToStorage() {
  saveToStorage("usersDB", gUsers);
}

function _makeId(length = 5) {
  var txt = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return txt;
}

function doLogin(userName, password) {
  var currUser = gUsers.find((user) => {
    return user.username === userName && user.password === password;
  });
  console.log(`currUser = `, currUser);
  return currUser;
}
function getUsersToShow() {
  return loadFromStorage("usersDB");
}
function setLastLoginTime(currUser) {
  const users = gUsers.find((user) => user.id === currUser.id);
  (users.lastLoginTime =
    time.getHours() + ":" + "0" + time.getMinutes() + ":" + time.getSeconds()),
    _saveUsersToStorage();
}
function byOrder(order) {
  sortOrder = order;
}
