const b = require('bcryptjs');

(async function (){
    let x = await b.compare('Kamal_123', '$2a$10$LOpxzOg3thjVX0xl8KY99uu5ZtA7rfXW7qNAl0bYNJBlYJAypQHGG');
    console.log(x);
})();