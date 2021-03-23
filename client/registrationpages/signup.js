const signupForm = document.querySelector('form#signup_form')
const errorEl = document.querySelector('span#signup_form__error')

signupForm.addEventListener('submit', function (e) {
    e.preventDefault()
    
    let user = {
        name: signupForm?.name?.value,
        email: signupForm?.email?.value,
        password: signupForm?.password?.value
    }
    
    fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(response => response.json())
        .then(json => {
            console.log(json)
            if (json.ok === true) {
                window.location = '/share'
            } else {
                errorEl.innerText = json.err
            }
        })
})

