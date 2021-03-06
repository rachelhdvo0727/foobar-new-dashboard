import { foobarUrl, beertypesUrl, orderUrl } from "./vars";
function getData(callback) {
  fetch(foobarUrl, {
    method: "get",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  })
    .then((res) => res.json())
    .then((data) => callback(data));
}

function getBeertypeData(callback, data) {
  fetch(beertypesUrl, {
    method: "get",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  })
    .then((res) => res.json())
    .then((beertypeData) => callback(data, beertypeData));
}

function postOrder(callback, data) {
  const postData = JSON.stringify(data);
  fetch(orderUrl, {
    method: "post",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: postData,
  })
    .then((res) => res.json())
    .then((orders) => console.log(orders));
}

export const heroku = {
  getData,
  postOrder,
  getBeertypeData,
};
