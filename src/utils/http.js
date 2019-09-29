import { API_URL } from "./constants";

async function http(url = "", method = "GET", data = "") {
  const options = {
    method: method,
    headers: {
      "Content-Type": "application/json",
      "x-token": localStorage.getItem("x-token") || ""
    },
    body: method === "POST" ? JSON.stringify(data) : undefined
  };

  const response = await fetch(API_URL + url, options);

  return new Promise(async (resolve, reject) => {
    if (response.status === 200) return resolve(response.json());
    else {
      const error = await response.json();
      reject({
        message: error.message,
        status: response.status
      });
    }
  });
}

export default http;
