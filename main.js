//document.getElementById("outer3").addEventListener("click", toggleState3);
async function onRequest() {
  try {
    const response = await fetch(
      "https://api.themoviedb.org/3/movie/upcoming?api_key=49800de893daf00d2c9e840a061b3efc"
    );
    if (!response.ok) {
      const message = `Error: ${response.status}`;
      throw new Error(message);
    }
    const data = await response.json();

    data.results.forEach((element) => {
      imgObject.push(`https://image.tmdb.org/t/p/w500${element.poster_path}`);
      imgPelisid.push(element.id);
    });

    loadGallery();
    //printData(data);
  } catch (error) {
    console.log(error);
  }
}
function toggleState3() {
  let galleryView = document.getElementById("galleryView");
  let tilesView = document.getElementById("tilesView");
  let outer = document.getElementById("outer3");
  let slider = document.getElementById("slider3");
  let tilesContainer = document.getElementById("tilesContainer");
  if (slider.classList.contains("active")) {
    slider.classList.remove("active");
    outer.classList.remove("outerActive");
    galleryView.style.display = "flex";
    tilesView.style.display = "none";

    while (tilesContainer.hasChildNodes()) {
      tilesContainer.removeChild(tilesContainer.firstChild);
    }
  } else {
    slider.classList.add("active");
    outer.classList.add("outerActive");
    galleryView.style.display = "none";
    tilesView.style.display = "flex";

    for (let i = 0; i < imgObject.length - 1; i++) {
      let tileItem = document.createElement("div");
      tileItem.classList.add("tileItem");
      tileItem.style.background = "url(" + imgObject[i] + ")";
      tileItem.style.backgroundSize = "contain";
      tilesContainer.appendChild(tileItem);
    }
  }
}

let imgObject = [];
let imgPelisid = [];

let mainImg = 0;
let prevImg = imgObject.length - 1;
let nextImg = 1;

function loadGallery() {
  let mainView = document.getElementById("mainView");
  mainView.style.background = "url(" + imgObject[mainImg] + ")";

  let leftView = document.getElementById("leftView");
  leftView.style.background = "url(" + imgObject[prevImg] + ")";

  let rightView = document.getElementById("rightView");
  rightView.style.background = "url(" + imgObject[nextImg] + ")";

  let linkTag = document.getElementById("linkTag");
  linkTag.href = `detail.html?id=` + imgPelisid[mainImg];
}

function scrollRight() {
  prevImg = mainImg;
  mainImg = nextImg;
  if (nextImg >= imgObject.length - 1) {
    nextImg = 0;
  } else {
    nextImg++;
  }
  loadGallery();
}

function scrollLeft() {
  nextImg = mainImg;
  mainImg = prevImg;

  if (prevImg === 0) {
    prevImg = imgObject.length - 1;
  } else {
    prevImg--;
  }
  loadGallery();
}

document.getElementById("navRight").addEventListener("click", scrollRight);
document.getElementById("navLeft").addEventListener("click", scrollLeft);
document.getElementById("rightView").addEventListener("click", scrollRight);
document.getElementById("leftView").addEventListener("click", scrollLeft);
document.addEventListener("keyup", function (e) {
  if (e.keyCode === 37) {
    scrollLeft();
  } else if (e.keyCode === 39) {
    scrollRight();
  }
});

onRequest();
if (!isTokenExpired()) {
  document.getElementById("login").style.display = "none";
  const user = document.getElementById("user");
  const token = localStorage.getItem("name");
  user.textContent = token;
  console.log(token);
} else {
}
