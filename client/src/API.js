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
    return getJson(fetch(new URL('/service',SERVER_URL), { credentials: 'include' })
    ).then( json => {
        return json;
    })
}

const getTicket = async (serviceId) => {
    return getJson(fetch(new URL('/service/' + serviceId +'/getTicket',SERVER_URL), { credentials: 'include' })
    ).then( json => {
        return json;
    })
}

function putServices(counterId,services){
  return getJson(fetch(new URL('/counters/' + counterId,SERVER_URL),{
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(services)
  })
  )
}

function deleteServices(counterId,serviceId){
  return getJson(fetch(new URL('/counters/' + counterId + '/services/' +serviceId,SERVER_URL),{
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include'
  })
  )
}

const getServedClient = async (counterId) => {
  return getJson(fetch(new URL('/counters/' + counterId +'/served-client',SERVER_URL), { credentials: 'include' })
  ).then( json => {
      return json;
  })
}

const getNextClient = async (counterId) => {
  return getJson(fetch(new URL('/counters/' + counterId +'/served-client',SERVER_URL), { credentials: 'include' })
  ).then( json => {
      return json;
  })
}

const getCounters = async () => {
  return getJson(fetch(new URL('/counter/retCounters',SERVER_URL), { credentials: 'include' })
  ).then( json => {
      return json;
  })
}


const getCountersServices = async () => {
  return getJson(fetch(new URL('/counter/getData',SERVER_URL), { credentials: 'include' })
  ).then( json => {
      return json;
  })
}


const API = { getServices, getTicket, putServices, deleteServices, getServedClient, getNextClient, getCounters, getCountersServices};
module.exports= API;