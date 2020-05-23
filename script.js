"use strict";
import { heroku } from "./components/js/heroku";
import { kegsStart } from "./components/js/kegs";

window.addEventListener("DOMContentLoaded", start);
// import "@babel/polyfill";
// import moment from "moment";

function start() {
  console.log("start");
  kegsStart();

  //heroku.postOrder();
}
