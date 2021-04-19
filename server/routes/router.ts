// import { MongoClient, Db, Collection } from "mongodb"
// import createError from 'http-errors'
import express from "express"
// import path from "path"
// import morgan from "morgan"
// import morgan = require("morgan")
// import fs = require("fs")
// import cookieParser = require('cookie-parser')
// import errorHandler = require("errorhandler")

// import DbConn from "./utils/DbConn"

// Create the express application
const app: express.Application = express()
// morgan('tiny')


// Import controllers
// import itemsController from "./items/items.controller"
// import mealsController from "./meals/meals.controller"

// Assign controllers to routes
// app.use("/api/items", itemsController)
// app.use("/api/meals", mealsController)

// for login
// import usersController from "./BaseChat/users/users.controller"
// app.use("/api/users", usersController)

// bots
// import Plexer from "./Plexer"
// import TixBotAdmin from "./bots/TixBot/TixBotAdmin"
// import GramBot from "./bots/GramBot/GramBot"
// import Loco from "./utils/Loco"

const main = async () => {
  process.on('unhandledRejection', error => {
    console.log('unhandledRejection =>', error)
  })

  // await DbConn.init()

  app.use(express.json())
  app.use(express.urlencoded({ extended: false }))
  // app.use(cookieParser())

  // logger.log('TixBotAdmin initModels')
  // await TixBotAdmin.initTasks()
  // await TixBotAdmin.initModels(DbConn)
  // await TixBotAdmin.initRoutes(app)

  // await GramBot.init({
  //   DbConn,
  //   app
  // })

  // await Plexer.init()
  // await Plexer.register(app)

  // await Loco.init()

  // Declare the path to frontend's static assets
  // early in the flow for development
  // this is just for development
  // const adminBuild = path.resolve("..", "frontend", "build")
  // const adminBuild = path.resolve(__dirname, "..", "admin")
  // logger.log('static /admin', adminBuild)
  // app.use('/admin', express.static(adminBuild))

  // serve timeline files from the root /
  // const timelinePath = path.resolve(__dirname, "..", "timeline")
  // logger.info('static /x', timelinePath)
  // app.use("/x/", express.static(timelinePath))

  // static assets in production
  // should be server by nginx
  // const publicPath = path.resolve(__dirname, "..", "public")
  // logger.info('static /public', publicPath)
  // app.use(express.static(publicPath))

  // const staticPath = path.resolve(__dirname, "..", "static")
  // logger.info('static /static', staticPath)
  // app.use("/cdn/",express.static(staticPath))

  // const clientPath = path.resolve(__dirname, "..", "client")
  // logger.info('static /client', clientPath)
  // app.use("/client/",express.static(clientPath))

  // const cdnPath = path.resolve(__dirname, "..", "cdn")
  // logger.info('static /cdn', cdnPath)
  // app.use("/cdn/", express.static(cdnPath))

  // // Error Handler. Provides full stack - remove for production
  // // app.use(errorHandler())

  // app.get("/pinger", (request, response) => {
  //   const msg = `ponger: ${process.env.APP_NAME}`
  //   logger.log('/pinger/' + msg)
  //   response.send(msg)
  // })

  // // Intercept requests to return the frontend's static entry point
  // // this is only for production
  // // so it might return an old build during dev
  // // make sure not to reload /XXX urls in devlopment
  // // this assumes the public client assets are all in /client
  // app.get("*", (request, response) => {
  //   response.sendFile(path.resolve("client", "index.html"))
  //   // res.sendFile(path.join(__dirname, './index.html'));
  // })

  //// TODO access logs are a problem on travis CI
  // const accessFile = path.join(__dirname, "./logs/access.log") // needs webpack config
  // const accessLogStream = fs.createWriteStream(accessFile, { flags: "a" })
  // app.use(morgan("combined", { stream: accessLogStream }))
  // app.use(morgan)

  // app.use(morgan('dev', {
  //   // filter >200 responses
  //   skip(req, res) { return false } // return res.statusCode < 150 }
  // }))

  // catch 404 and forward to error handler
  // we should never get this since we have a * route above
  // app.use((req, res, next) => {
  //   logger.error('404.path:', req.url)
  //   next(createError(404))
  // })

}

// await
main()

export default app
