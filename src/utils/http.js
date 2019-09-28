import { API_URL } from "./constants";

async function http(url = "", method = "GET", data = "") {
  // Default options are marked with *
  const options = {
    method: method,
    headers: {
      "Content-Type": "application/json",
      "x-token": localStorage.getItem("x-token") || ""
    },
    body: method === "POST" ? JSON.stringify(data) : undefined
  };
  console.log('options ==>', options); // TODO: remove this
  const response = await fetch(API_URL + url, options);
  return await response.json();
}

export default http;
