"use strict";
window.addEventListener("DOMContentLoaded", start);
import "@babel/polyfill";
import moment from "moment";
import { heroku } from "./components/js/heroku";

function start() {
  console.log("start");
  heroku.getData();
  //heroku.postOrder();
}
