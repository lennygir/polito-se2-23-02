const SERVER_URL = 'http://localhost:3000';

/**
 * A utility function for parsing the HTTP response.
 */
function getJson(httpResponsePromise) {
  return new Promise((resolve, reject) => {
    httpResponsePromise
      .then((response) => {
        if (response.ok) {
         response.json()
            .then( json => resolve(json) )
            .catch( err => reject({ error: "Cannot parse server response" }))
        } else {
          response.json()
            .then(obj => 
              reject(obj)
              )
            .catch(err => reject({ error: "Cannot parse server response" }))
        }
      })
      .catch(err => 
        reject({ error: "Cannot communicate"  })
      )
  });
}

const getServices = async () => {
    return getJson(fetch(new URL('/service',SERVER_URL))
    ).then( json => {
        return json;
    })
}

const getTicket = async (serviceId) => {
    return getJson(fetch(new URL('/service/' + serviceId +'/getTicket',SERVER_URL))
    ).then( json => {
        return json;
    })
}



const API = { getServices, getTicket};
export default API;