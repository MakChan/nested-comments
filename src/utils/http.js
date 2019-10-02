async function http(url = "", method = "GET", data = "") {
  const options = {
    method: method,
    headers: {
      "Content-Type": "application/json",
      "x-token": localStorage.getItem("x-token") || ""
    },
    body: method === "GET" ? undefined : JSON.stringify(data)
  };

  const response = await fetch(process.env.REACT_APP_API_URI + url, options);

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
