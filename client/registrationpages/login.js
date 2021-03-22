const loginForm = document.querySelector('form#login_form')
const errorEl = document.querySelector('span#login_form__error')

loginForm.addEventListener('submit', function (e) {
    e.preventDefault()

    let user = {
        email: loginForm?.email?.value,
        password: loginForm?.password?.value
    }
    
    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(response => response.json())
        .then(json => {
            if (json.ok === true) {
                window.location = '/share'
            } else {
                errorEl.innerText = json.err
            }
        })
})

