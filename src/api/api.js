export function post(url, data, user) {

    let headers =  {
        "Content-Type": "application/json",
    }
    if(user) {
        headers["Authorization"] = "Bearer " + user.credential
    }

    return fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify(data)
    });
}

export function get(url, user) {
    let headers = {}
    if(user) {
        headers["Authorization"] = "Bearer " + user.credential
    }
    return fetch(url, {
        method: "GET",
        headers
    });
}