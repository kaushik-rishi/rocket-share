const loginForm = document.querySelector('form#login_form')
const errorEl = document.querySelector('span#login_form__error')

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

loginForm.addEventListener('submit', function (e) {
    e.preventDefault()

    let user = {
        email: loginForm?.email?.value,
        password: loginForm?.password?.value
    }
    
    fetch('/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(response => response.json())
        .then(json => {
            if (json.ok === true) {
                alert(`Hello Again 👋 ${getPayload(getAuthToken()).name}`)
                window.location = '/share'
            } else {
                errorEl.innerText = json.err
            }
        })
})

