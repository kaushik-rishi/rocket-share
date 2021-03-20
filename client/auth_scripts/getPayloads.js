function getAuthToken() {
    var arrayb = document.cookie.split(";");
    for (const item of arrayb) {
        if (item.startsWith("authtoken=")) {
            return item.substr(10);
        }
    }
}

function getPayload(token) {
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(atob(base64));
}

