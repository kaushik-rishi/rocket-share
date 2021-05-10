const mongoose = require('mongoose');

mongoose.connect(process.env.DB_CONN_STRING, {
    useUnifiedTopology: true,
    useNewUrlParser: true
})
    .then(() => {
        const User = require('../models/User');
        User.create({
            name: 'Kaushik Rishi',
            email: 'rishi.cp01@gmail.com',
            password: 'Kamal_123'
        })
            .then(user => {
                console.log(user);
            })
    })