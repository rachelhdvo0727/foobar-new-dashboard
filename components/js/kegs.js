import { heroku } from "./heroku";
const regeneratorRuntime = require("regenerator-runtime");

export function kegsStart() {
  heroku.getData(dataForKegs);

  function dataForKegs(data) {
    console.log(data);
    console.log(data.storage[0].amount);

    getSvg("svg/only-keg.svg", svgForKegs, data);
  }

  async function getSvg(file, callback, data) {
    let response = await fetch(file);
    let svg = await response.text();
    callback(svg, data);
  }

  function svgForKegs(svg, data) {
    console.log("hej" + svg);
    console.log(data.storage[0].amount);

    createKeg(1, svg, "beers_images/elhefe.png", data.storage[0].amount);
    createKeg(2, svg, "beers_images/fairytaleale.png", data.storage[1].amount);
    createKeg(3, svg, "beers_images/githop.png", data.storage[2].amount);
    createKeg(4, svg, "beers_images/hollaback.png", data.storage[3].amount);
    createKeg(
      5,
      svg,
      "beers_images/hoppilyeverafter.png",
      data.storage[4].amount
    );
    createKeg(6, svg, "beers_images/mowintime.png", data.storage[5].amount);
    createKeg(7, svg, "beers_images/row26.png", data.storage[6].amount);
    createKeg(
      8,
      svg,
      "beers_images/ruinedchildhood.png",
      data.storage[7].amount
    );
    createKeg(9, svg, "beers_images/sleighride.png", data.storage[8].amount);
    createKeg(10, svg, "beers_images/steampunk.png", data.storage[9].amount);
  }

  function createKeg(number, svg, image, storage) {
    let kegContainer = document.createElement("article");
    kegContainer.classList.add("keg");
    document.querySelector("#kegs_container").appendChild(kegContainer);

    let kegNumber = document.createElement("div");
    kegNumber.classList.add("keg_number");
    kegNumber.textContent = number;
    kegContainer.appendChild(kegNumber);
    console.log(kegNumber);

    let kegSVG = document.createElement("div");
    kegSVG.classList.add("svg_container");
    kegSVG.id = "keg" + number;
    kegSVG.innerHTML = svg;
    kegContainer.appendChild(kegSVG);

    let kegIMG = document.createElement("img");
    kegIMG.src = image;
    kegIMG.alt = "beer";
    kegIMG.classList.add("beer_label");
    kegIMG.style.width = "60%";
    kegContainer.appendChild(kegIMG);

    let kegTap = document.createElement("div");
    kegTap.classList.add("keg_tap");
    kegContainer.appendChild(kegTap);

    let kegStorage = document.createElement("div");
    kegStorage.textContent = storage;
    kegStorage.classList.add("storage");
    kegContainer.appendChild(kegStorage);

    document.querySelector(`#keg${number} #Rectangle_174`).style.height = "120";
    document.querySelector(`#keg${number} #Rectangle_174`).style.y = "50";
  }
}
