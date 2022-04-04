var h1Modal = document.querySelector(".welcome");
var elLogin = document.querySelector(".sign-in");
var elLogOutButton = document.querySelector(".logout");
var adminButton = document.querySelector(".admin");
function signIn(ev) {
  ev.preventDefault();
  const eluserName = document.querySelector("input[name=username]");
  const elPassword = document.querySelector("input[name=password]");

  const attempt = doLogin(eluserName.value, elPassword.value);

  if (attempt) {
    setLastLoginTime(attempt);
    welcomeUser(eluserName.value);
    closeSignIn();
    if (attempt.isAdmin === true) {
      adminButton.setAttribute("onclick", "moveToAdmin()");
    } else adminButton.setAttribute("onclick", "moveToIndex()");
  }
  eluserName.value = "";
  elPassword.value = "";
}

function welcomeUser(username) {
  h1Modal.innerText = `Welcome ${username}`;
}

function closeSignIn() {
  elLogin.classList.add("hide");
  elLogOutButton.classList.toggle("hide");
  h1Modal.classList.remove("hide");
  adminButton.classList.remove("hide");
}

function logOut() {
  removeFromStorage("currUser");
  elLogin.classList.remove("hide");
  elLogOutButton.classList.add("hide");
  h1Modal.classList.add("hide");
  adminButton.classList.add("hide");
}

function moveToAdmin() {
  window.location.href = "admin.html";
}
function moveToIndex() {
  window.location.href = "index.html";
}

function setTable() {
  var elTable = document.querySelector(".users");
  var users2 = getUsersToShow();

  for (var i = 0; i < users2.length; i++) {
    elTable.innerHTML +=
      "<tr><td>" +
      users2[i].username +
      "</td><td>" +
      users2[i].password +
      "</td><td>" +
      users2[i].lastLoginTime +
      "</td><td>" +
      users2[i].isAdmin +
      "</td><td>" +
      "</tr>";
  }
}
setTable();
function onSortBy(order) {
  byOrder(order);
  renderTodos();
}
