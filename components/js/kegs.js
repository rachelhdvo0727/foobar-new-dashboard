import { heroku } from "./heroku";
const regeneratorRuntime = require("regenerator-runtime");

export function kegsStart() {
  heroku.getData(dataForKegs);
  setInterval(() => {
    document.querySelector("#kegs_container").innerHTML = "";
    heroku.getData(dataForKegs);
  }, 10000);

  function dataForKegs(data) {
    console.log(data);

    getSvg("svg/only-keg.svg", svgForKegs, data);
  }

  async function getSvg(file, callback, data) {
    let response = await fetch(file);
    let svg = await response.text();
    callback(svg, data);
  }

  function svgForKegs(svg, data) {
    let taps = data.taps;
    taps.forEach((tap) => {
      let storage = data.storage;
      let filter = storage.filter(function (storage) {
        return storage.name == tap.beer;
      });

      createKeg(tap.id, svg, tap.beer, filter[0].amount, tap.level);
    });
  }

  function createKeg(number, svg, beertype, storage, level) {
    let kegContainer = document.createElement("article");
    kegContainer.classList.add("keg");
    document.querySelector("#kegs_container").appendChild(kegContainer);

    let kegNumber = document.createElement("div");
    kegNumber.classList.add("keg_number");
    kegNumber.textContent = number + 1;
    kegContainer.appendChild(kegNumber);
    console.log(kegNumber);

    let kegSVG = document.createElement("div");
    kegSVG.classList.add("svg_container");
    kegSVG.id = "keg" + number;
    kegSVG.innerHTML = svg;
    kegContainer.appendChild(kegSVG);

    let kegIMG = document.createElement("img");
    let beerLower = beertype.toLowerCase();
    let beerArray = beerLower.split(" ");
    console.log(beerArray.length);
    if (beerArray.length < 2) {
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
    kegIMG.style.width = "60%";
    kegContainer.appendChild(kegIMG);

    let kegTap = document.createElement("div");
    kegTap.classList.add("keg_tap");
    kegContainer.appendChild(kegTap);

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
    }

    if (level < 2000 && level > 1000) {
      document.querySelector(`#keg${number} #Rectangle_174`).style.y = "150";
      document.querySelector(`#keg${number} #Rectangle_174`).style.height =
        "70";
      document.querySelector(`#keg${number} #Rectangle_173`).style.height =
        "100";
      document.querySelector(`#keg${number} #Rectangle_173`).style.y = "170";
    }

    if (level < 1000 && level > 200) {
      document.querySelector(`#keg${number} #Rectangle_174`).style.y = "180";
      document.querySelector(`#keg${number} #Rectangle_174`).style.height =
        "40";
      document.querySelector(`#keg${number} #Rectangle_173`).style.height =
        "90";
      document.querySelector(`#keg${number} #Rectangle_173`).style.y = "180";
    }

    if (level < 200) {
      document.querySelector(`#keg${number} #Rectangle_174`).style.height = "0";
      document.querySelector(`#keg${number} #Rectangle_173`).style.height = "0";
      document
        .querySelector(`#keg${number} #Rectangle_172`)
        .classList.add("blinking_red");
    }
  }
}
