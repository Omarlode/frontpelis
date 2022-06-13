onRequest();

async function onRequest() {
  const jwt = localStorage.getItem("jwt");
  try {
    const response = await fetch(url + "users/me", {
      method: "GET",
      headers: { Authorization: "Bearer " + jwt },
    });

    if (!response.ok) {
      if (response.status == 401) {
        logout();
        return;
      } else {
        const message = `Error: ${response.status}`;
        throw new Error(message);
      }
    }
    const data = await response.json();
    printData(data);
  } catch (error) {
    console.log(error);
  }
}

function printData(data) {
  const container = document.getElementById("container");

  const p = document.createElement("p");
  const div = document.createElement("div");

  p.textContent = "Bienvenido " + data.username + " " + data.subname;

  div.appendChild(p);
  container.appendChild(div);

  //console.log(data);
}
const borrar = document.getElementById("btRequest2");

borrar.addEventListener("click", () => {
  sendData();
});

function sendData() {
  logout();
}
function checkToken() {
  if (isTokenExpired()) {
    logout();
  }
}
checkToken();

function logout() {
  localStorage.removeItem("jwt");

  window.location.href = "login.html";
}
