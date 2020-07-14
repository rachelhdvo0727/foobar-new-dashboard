import { heroku } from "./heroku";

export function backgroundShelves() {
  scaleShelves();
  function scaleShelves() {
    document.querySelector("#mobileBg").getAttribute("viewBox", "0 0 300 300");
  }
}
