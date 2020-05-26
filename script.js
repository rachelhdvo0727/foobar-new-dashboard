"use strict";
window.addEventListener("DOMContentLoaded", start);
import "@babel/polyfill";
import moment from "moment";
import { heroku } from "./components/js/heroku";
import { kegsStart } from "./components/js/kegs";
import { foobarUrl, beertypesUrl, orderUrl } from "./components/js/vars";

function start() {
  console.log("start");
  getTap();
  kegsStart();
  heroku.getData(orderNo);
}
setInterval(() => {
  heroku.getData(orderNo);
  getTap();
}, 3000);

function orderNo(order) {
  console.log(order.queue.length);
  document.querySelector(".order-number").textContent = order.queue.length;
}

function getTap() {
  fetch(foobarUrl, {
    method: "get",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  })
    .then((res) => res.json())
    .then(tapNo);
}

function tapNo(tap) {
  const bartender = tap.bartenders;
  const dannie = document.querySelector(".dannie-img");
  const jonas = document.querySelector(".jonas-img");
  const peter = document.querySelector(".peter-img");
  document.querySelector(".dannie").innerHTML =
    "Using tap <br>" + bartender[2].usingTap;
  document.querySelector(".jonas").innerHTML =
    "Using tap <br>" + bartender[1].usingTap;
  document.querySelector(".peter").innerHTML =
    "Using tap <br>" + bartender[0].usingTap;
  if (bartender[2].usingTap == null) {
    dannie.style.filter = "grayscale(100%)";
  } else {
    dannie.style.filter = "grayscale(0%)";
  }
  if (bartender[1].usingTap == null) {
    jonas.style.filter = "grayscale(100%)";
  } else {
    jonas.style.filter = "grayscale(0%)";
  }
  if (bartender[0].usingTap == null) {
    peter.style.filter = "grayscale(100%)";
  } else {
    peter.style.filter = "grayscale(0%)";
  }

  //console.log(bartender[2].usingTap);
}
