"use strict";
window.addEventListener("DOMContentLoaded", start);
import "@babel/polyfill";
import moment from "moment";
import { heroku } from "./components/js/heroku";
import { kegsStart } from "./components/js/kegs";
import { foobarUrl, beertypesUrl, orderUrl } from "./components/js/vars";

function start() {
  console.log("start");
  getData();
  kegsStart();
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
  document.querySelector(".order-number").textContent = order.queue.length;
  setInterval(getData, 10000);
}
