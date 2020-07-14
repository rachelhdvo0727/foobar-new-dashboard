"use strict";
window.addEventListener("DOMContentLoaded", start);
import "@babel/polyfill";
import moment from "moment";
import { heroku } from "./components/js/heroku";
import { kegsStart } from "./components/js/kegs";
import { backgroundShelves } from "./components/js/shelf";
import { foobarUrl, beertypesUrl, orderUrl } from "./components/js/vars";

function start() {
  console.log("start");
  getTap();
  kegsStart();
  orderNo();
  heroku.getData();
  backgroundShelves();
}
function orderNo() {
  fetch(foobarUrl, {
    method: "get",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  })
    .then((res) => res.json())
    .then(orderNumber);
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
//sending data from Heroku to tapNo
function tapNo(tap) {
  // console.log(tap);
  //finding the array for bartenders
  const bartender = tap.bartenders;
  const dannie = document.querySelector(".dannie-img");
  const jonas = document.querySelector(".jonas-img");
  const peter = document.querySelector(".peter-img");
  //finding usingTap in the array for each bartender
  document.querySelector(".dannie").innerHTML =
    "Using tap <br>" + bartender[2].usingTap;
  document.querySelector(".jonas").innerHTML =
    "Using tap <br>" + bartender[1].usingTap;
  document.querySelector(".peter").innerHTML =
    "Using tap <br>" + bartender[0].usingTap;
  //if/else statement for when the tap = null, add grayscale effect
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

  // console.log(bartender[2].usingTap);
  //setting interval to reset the data evert 10 secs
  setInterval(getTap(), 1000);
}

function orderNumber(order) {
  //fetching the queue length to order-number div
  document.querySelector(".order-number").textContent = order.queue.length;
  //setting interval to reset the data evert 5 secs
  setInterval(orderNo(), 3000);
}
