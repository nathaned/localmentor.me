const express = require('express')
const next = require('next')
const passport = require('passport')
const mongoose = require('mongoose')
require('../models/User')
require('dotenv').config()

//mongoose.connect(process.env.MONGO_DB)

const port = process.env.PORT || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
/*const auth = require('./auth')

passport.serializeUser(auth.serializeUser)
passport.deserializeUser(auth.deserializeUser)
passport.use(auth.facebookStrategy)
*/
app.prepare().then(() => {
	const server = express()
	require('./server')(app, server)

	server.get('*', (req, res) => {
		return handle(req, res)
	})

	server.listen(port, (err) => {
		if (err) throw err
		console.log(2);
		console.log(`> Ready on http://localhost:${port}`)
	})
})
