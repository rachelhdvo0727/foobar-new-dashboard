"use strict";
import { heroku } from "./components/js/heroku";
const regeneratorRuntime = require("regenerator-runtime");

window.addEventListener("DOMContentLoaded", start);
// import "@babel/polyfill";
// import moment from "moment";

function start() {
  console.log("start");
  heroku.getData(dataForKegs);
  //heroku.postOrder();
}

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
}

function createKeg(number, svg, image, storage) {
  let kegContainer = document.createElement("article");
  kegContainer.classList.add("keg");
  document.querySelector("#kegs_container").appendChild(kegContainer);

  let kegSVG = document.createElement("div");
  kegSVG.classList.add("svg_container");
  kegSVG.id = "keg" + number;
  kegSVG.innerHTML = svg;
  kegContainer.appendChild(kegSVG);

  let kegIMG = document.createElement("img");
  kegIMG.src = image;
  kegIMG.alt = "beer";
  kegIMG.classList.add("beer_label");
  kegIMG.style.width = "70%";
  kegContainer.appendChild(kegIMG);

  let kegNumber = document.createElement("div");
  kegNumber.classList.add("keg_number");
  kegNumber.textContent = number;
  kegContainer.appendChild(kegNumber);
  console.log(kegNumber);

  let kegStorage = document.createElement("div");
  kegStorage.textContent = storage;
  kegStorage.classList.add("storage");
  kegContainer.appendChild(kegStorage);

  document.querySelector(`#keg${number} #Rectangle_174`).style.height = "100";
  document.querySelector(`#keg${number} #Rectangle_174`).style.y = "50";
}
