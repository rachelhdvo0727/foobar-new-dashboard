"use strict";
import { heroku } from "./components/js/heroku";

window.addEventListener("DOMContentLoaded", start);
// import "@babel/polyfill";
// import moment from "moment";

function start() {
  console.log("start");
  heroku.getData(showData);
  //heroku.postOrder();
}

function showData(data) {
  console.log(data);
  console.log(data.storage[0].amount);
  console.log(data.storage[1].amount);
  console.log(data.storage[2].amount);
  console.log(data.storage[3].amount);
  console.log(data.storage[4].amount);
  console.log(data.storage[5].amount);
}
