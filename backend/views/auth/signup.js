const signupForm = document.querySelector('form#signup_form')
const errorEl = document.querySelector('span#signup_form__error')

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

signupForm.addEventListener('submit', async function(e) {
    e.preventDefault()
    console.log('submit')

    let user = {
        name: signupForm ? .name ? .value,
        email: signupForm ? .email ? .value,
        password: signupForm ? .password ? .value
    }

    fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(response => {
            console.log(response)
            return response.json()
        })
        .then(json => {
            console.log(json)

            if (json.ok === true) {
                errorEl.innerText = ''
                alert(`Welcome ${getPayload(getAuthToken()).name} Please consider logging in 😁`)
                window.location = 'login'
            } else {
                errorEl.innerText = json.err
            }
        })
})