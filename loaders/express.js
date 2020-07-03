const express = require('express')
const cors = require('cors')
const postRoutes = require('../routes/posts')
const authRoutes = require('../routes/auth')
const userRoutes = require('../routes/users')
const helmet = require('helmet')

module.exports = async ({ app }) => {


    app.use(helmet())
    app.use(express.json());    // body parser
    app.use(cors());            // cros-origin middleware

    app.use('/api', postRoutes);
    app.use('/api/user/', authRoutes);
    app.use('/api', userRoutes);

    // error handling middleware
    app.use(function (err, req, res, next) {
        console.log(err.message);
        res.status(422).json({ "error": "bad request" });
    })

    return app;
}