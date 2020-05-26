import { heroku } from "./heroku";
const regeneratorRuntime = require("regenerator-runtime");

export function kegsStart() {
  heroku.getData(dataForSvgs);

  setTimeout(() => {
    heroku.getData(dataForKegs);
  }, 10);

  setInterval(() => {
    console.log("nu");
    heroku.getData(dataForKegs);
  }, 3000);

  function dataForSvgs(data) {
    getSvg("svg/only-keg.svg", placeKegs, data);
    getSvg("svg/only-keg-tap.svg", placeTaps, data);
  }

  async function getSvg(file, callback, data) {
    let response = await fetch(file);
    let svg = await response.text();
    callback(svg, data);
  }

  function placeKegs(svg, data) {
    let taps = data.taps;
    taps.forEach((tap) => {
      placeKegsSvg(svg, data, tap.id);
    });
  }

  function placeKegsSvg(svg, data, number) {
    let kegContainer = document.createElement("article");
    kegContainer.classList.add("keg");
    kegContainer.id = "container" + number;
    document.querySelector("#kegs_container").appendChild(kegContainer);

    let kegNumber = document.createElement("div");
    kegNumber.classList.add("keg_number");
    kegNumber.textContent = number + 1;
    kegContainer.appendChild(kegNumber);

    let kegSVG = document.createElement("div");
    kegSVG.classList.add("svg_container");
    kegSVG.id = "keg" + number;
    kegSVG.innerHTML = svg;
    kegContainer.appendChild(kegSVG);
  }

  function placeTaps(svg, data) {
    let taps = data.taps;
    taps.forEach((tap) => {
      placeTapsSvg(svg, data, tap.id);
    });
  }

  function placeTapsSvg(svg, data, number) {
    let kegContainer = document.querySelector(`#container${number}`);

    let kegTap = document.createElement("div");
    kegTap.classList.add("keg_tap");
    kegTap.innerHTML = svg;
    kegContainer.appendChild(kegTap);
  }

  function dataForKegs(data) {
    console.log(data);
    heroku.getBeertypeData(allData, data);
  }

  function allData(data, beertypeData) {
    let taps = data.taps;
    taps.forEach((tap) => {
      let storage = data.storage;
      let filter = storage.filter(function (storage) {
        return storage.name == tap.beer;
      });

      let category = beertypeData.filter(function (beertypeData) {
        return beertypeData.name == tap.beer;
      });

      createKeg(
        tap.id,
        tap.beer,
        filter[0].amount,
        tap.level,
        category[0].category
      );
    });
  }

  function createKeg(number, beertype, storage, level, category) {
    let kegContainer = document.querySelector(`#container${number}`);

    if (document.querySelector(`#image${number}`)) {
      document.querySelector(`#image${number}`).remove();
    }

    let kegIMG = document.createElement("img");
    let beerLower = beertype.toLowerCase();
    let beerArray = beerLower.split(" ");
    if (beerArray[0] == "hollaback") {
      kegIMG.src = "beers_images/" + beerArray[0] + ".png";
    } else if (beerArray.length < 2) {
      console.log("hallo!!" + beerArray[0] + ".png");
      kegIMG.src = "beers_images/" + beerArray[0] + ".png";
    } else if (beerArray.length == 2) {
      kegIMG.src = "beers_images/" + beerArray[0] + beerArray[1] + ".png";
    } else if (beerArray.length == 3) {
      kegIMG.src =
        "beers_images/" + beerArray[0] + beerArray[1] + beerArray[2] + ".png";
    }
    kegIMG.alt = beertype;
    kegIMG.classList.add("beer_label");
    kegIMG.id = "image" + number;
    kegIMG.style.width = "60%";
    kegContainer.appendChild(kegIMG);

    if (document.querySelector(`#storage${number}`)) {
      document.querySelector(`#storage${number}`).remove();
    }

    let kegStorage = document.createElement("div");
    kegStorage.textContent = storage;
    kegStorage.classList.add("storage");
    kegStorage.id = "storage" + number;

    kegContainer.appendChild(kegStorage);
    if (storage == "0") {
      document
        .querySelector(`#storage${number}`)
        .classList.add("blinking_red_color");
    }

    if (level > 2000) {
      document.querySelector(`#keg${number} #Rectangle_174`).style.height =
        "120";
      document.querySelector(`#keg${number} #Rectangle_174`).style.y = "50";
      document.querySelector(`#keg${number} #Rectangle_173`).style.height =
        "157.88";
      document.querySelector(`#keg${number} #Rectangle_173`).style.y = "113.28";
      document
        .querySelector(`#keg${number} #Rectangle_172`)
        .classList.remove("blinking_red");
    }

    if (level < 2000 && level > 1000) {
      document.querySelector(`#keg${number} #Rectangle_174`).style.y = "150";
      document.querySelector(`#keg${number} #Rectangle_174`).style.height =
        "70";
      document.querySelector(`#keg${number} #Rectangle_173`).style.height =
        "100";
      document.querySelector(`#keg${number} #Rectangle_173`).style.y = "170";
      document
        .querySelector(`#keg${number} #Rectangle_172`)
        .classList.remove("blinking_red");
    }

    if (level < 1000 && level > 200) {
      document.querySelector(`#keg${number} #Rectangle_174`).style.y = "180";
      document.querySelector(`#keg${number} #Rectangle_174`).style.height =
        "40";
      document.querySelector(`#keg${number} #Rectangle_173`).style.height =
        "90";
      document.querySelector(`#keg${number} #Rectangle_173`).style.y = "180";
      document
        .querySelector(`#keg${number} #Rectangle_172`)
        .classList.remove("blinking_red");
    }

    if (level < 200) {
      document.querySelector(`#keg${number} #Rectangle_174`).style.height = "0";
      document.querySelector(`#keg${number} #Rectangle_173`).style.height = "0";
      document
        .querySelector(`#keg${number} #Rectangle_172`)
        .classList.add("blinking_red");
    }

    if (category == "IPA") {
      document.querySelector(`#keg${number} #Rectangle_174`).style.fill =
        "#6D2D20";
      document.querySelector(`#keg${number} #Rectangle_173`).style.fill =
        "#6D2D20";
      document.querySelector(`#keg${number} #Path_126`).style.fill = "#6D2D20";
    }
    if (category == "Oktoberfest" || category == "European Lager") {
      document.querySelector(`#keg${number} #Rectangle_174`).style.fill =
        "#BF820F";
      document.querySelector(`#keg${number} #Rectangle_173`).style.fill =
        "#BF820F";
      document.querySelector(`#keg${number} #Path_126`).style.fill = "#BF820F";
    }
    if (category == "Stout") {
      document.querySelector(`#keg${number} #Rectangle_174`).style.fill =
        "black";
      document.querySelector(`#keg${number} #Rectangle_173`).style.fill =
        "black";
      document.querySelector(`#keg${number} #Path_126`).style.fill = "black";
    }
    if (category == "California Common") {
      document.querySelector(`#keg${number} #Rectangle_174`).style.fill =
        "#BF7245";
      document.querySelector(`#keg${number} #Rectangle_173`).style.fill =
        "#BF7245";
      document.querySelector(`#keg${number} #Path_126`).style.fill = "#BF7245";
    }
  }
}
