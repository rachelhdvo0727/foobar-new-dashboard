"use strict";
window.addEventListener("DOMContentLoaded", start);
import "@babel/polyfill";
import moment from "moment";
import { heroku } from "./components/js/heroku";
import { foobarUrl, beertypesUrl, orderUrl } from "./components/js/vars";

function start() {
  console.log("start");
  getData();
  heroku.getData();
}

function getData() {
  fetch(foobarUrl, {
    method: "get",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  })
    .then((res) => res.json())
    .then(getOrderNo);
}

function getOrderNo(order) {
  const bartender = order.bartenders;
  //document.querySelector(".order-number").textContent = order.queue.length;
  document.querySelector(".dannie").innerHTML =
    "Using tap <br>" + bartender[2].usingTap;
  document.querySelector(".jonas").innerHTML =
    "Using tap <br>" + bartender[1].usingTap;
  document.querySelector(".peter").innerHTML =
    "Using tap <br>" + bartender[0].usingTap;
  if (bartender[2].usingTap == null) {
    console.log("adding gray");
    document.querySelector(".dannie-img").classList.add(".gray");
  }

  console.log(bartender[2].usingTap);
  setInterval(getData(), 1000);
}
