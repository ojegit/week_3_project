import "./styles.css";

if (document.readyState !== "loading") {
  initializeCode();
} else {
  document.addEventListener("DOMContentLoaded", function () {
    initializeCode();
  });
}

function initializeCode() {
  //breeds as JSON type of object
  const breeds = {
    akita: "",
    borzoi: "",
    finnish: "lapphund",
    retriever: "golden",
    shiba: "",
    terrier: "russell",
    pug: ""
  };

  // the entries are added to the <div class="container">
  const container = document.getElementsByClassName("container")[0];

  //generate the dogg0 entries
  for (let i = 0; i < Object.keys(breeds).length; i++) {
    addContainer(container);
  }

  //const parsedBreeds = JSON.parse(breeds);
  let containerChildren = container.children;
  let i = 0;
  for (let breed in breeds) {
    let subBreed = breeds[breed].length > 0 ? breeds[breed] : "";
    let container = containerChildren[i++];

    // set title as the dogg0's breed
    container.getElementsByTagName("h1")[0].innerHTML =
      breed[0].toUpperCase() +
      breed.slice(1) +
      (subBreed.length > 0
        ? " (" + subBreed[0].toUpperCase() + subBreed.slice(1) + ")"
        : "");

    //set dogg0 image url
    if (subBreed.length > 0) {
      var imgUrl =
        "https://dog.ceo/api/breed/" +
        breed +
        "/" +
        subBreed +
        "/images/random";
    } else {
      var imgUrl = "https://dog.ceo/api/breed/" + breed + "/images/random";
    }

    //set wikipedia url
    var textUrl = "https://en.wikipedia.org/api/rest_v1/page/summary/" + breed;

    //fetch and set dogg0 image
    fetch(imgUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data["status"] === "success") {
          container
            .getElementsByClassName("wiki-img")[0]
            .setAttribute("src", data["message"]);
        } else {
          console.log("Error finding doggo image!");
        }
      });

    //fetch and set dogg0 text
    fetch(textUrl)
      .then((response) => response.json())
      .then((data) => {
        container.getElementsByClassName("wiki-text")[0].innerHTML =
          data["extract"];
      });
  }
}

function addContainer(element) {
  /*
  <div class="wiki-item" >
    <h1 class="wiki-header">Breed X</h1>
    <div class="wiki-content">
      <p class="wiki-text">
        Some text about this breed.
      </p>
      <div class="img-container">
        <img class="wiki-img" src="">
      </div>
    </div>
  </div>
  */

  let newWikiItem = document.createElement("div");
  newWikiItem.classList.add("wiki-item");

  let newWikiHeader = document.createElement("h1");
  newWikiHeader.classList.add("wiki-header");
  newWikiHeader.innerHTML = "Breed X";

  let newWikiContent = document.createElement("div");
  newWikiContent.classList.add("wiki-content");

  let newWikiText = document.createElement("p");
  newWikiText.classList.add("wiki-text");
  newWikiText.innerHTML = "Some text about this breed.";

  let newImgContainer = document.createElement("div");
  newImgContainer.classList.add("img-container");

  let newWikiImg = document.createElement("img");
  newWikiImg.classList.add("wiki-img");

  newImgContainer.appendChild(newWikiImg);

  newWikiContent.appendChild(newWikiText);
  newWikiContent.appendChild(newImgContainer);

  newWikiItem.appendChild(newWikiHeader);
  newWikiItem.appendChild(newWikiContent);

  element.appendChild(newWikiItem);
}
