const SERVER_URL = "http://localhost:3000";

/**
 * A utility function for parsing the HTTP response.
 */
function getJson(httpResponsePromise) {
  return new Promise((resolve, reject) => {
    httpResponsePromise
      .then((response) => {
        if (response.ok) {
          response
            .json()
            .then((json) => resolve(json))
            .catch(() => reject({ error: "Cannot parse server response" }));
        } else {
          response
            .json()
            .then((obj) => reject(obj))
            .catch(() => reject({ error: "Cannot parse server response" }));
        }
      })
      .catch(() => reject({ error: "Cannot communicate with the server" }));
  });
}

const updateCounter = async (counter) => {
  return getJson(
    fetch(new URL("/counters/" + counter.id, SERVER_URL), {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(counter),
    })
  ).then((json) => {
    return json.data;
  });
};

const getCountersServices = async () => {
  return getJson(fetch(new URL("/counter/getData", SERVER_URL))).then(
    (json) => {
      return json.data;
    }
  );
};

const getServices = async () => {
  return getJson(fetch(new URL("/service", SERVER_URL))).then((json) => {
    return json.data;
  });
};

const getTicket = async (serviceId) => {
  return getJson(
    fetch(new URL("/service/" + serviceId + "/getTicket", SERVER_URL))
  ).then((json) => {
    return json;
  });
};

const API = { getCountersServices, updateCounter, getServices, getTicket };
export default API;
