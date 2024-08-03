const BASE_URL = process.env.REACT_APP_BASE_URL;

function api(path, method, body, options) {
  const url = BASE_URL + path;
  const contentType = options?.contentType;
  const option = {
    method,
    headers: {},
    body: contentType ? body : JSON.stringify(body),
  };

  const token = localStorage.getItem("token");
  if (token) {
    option.headers["access-token"] = token;
  }

  if (!contentType) {
    option.headers["Content-Type"] = "application/json";
  }

  return new Promise((resolve, reject) => {
    fetch(url, option)
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 401) {
          localStorage.clear();
          return window.location.replace("/login");
        }
        resolve(data);
      })
      .catch((error) => reject(error));
  });
}

export { api };
