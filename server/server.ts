const logger = require('debug-levels')('server')
import mongoose from "mongoose"
import router from "./routes/router"

import AppConfig from './utils/AppConfig'
import DbConn from './utils/DbConn'

import { Gram } from './models/Gram'

/**
 * run at appStartup
 */
async function startUp() {
  // Connect to the database

  await DbConn.init()

  await Gram.toMarkdown()
  logger.info('finding..')

  // Gram.find({}, (err, grams) => {
  //   logger.info('found grams err', err)
  //   logger.info('found grams', grams.length)
  // })

  // const g = new Gram({ cname: 'test2' })
  // g.save()

  // Start express App
  router.listen(AppConfig.port)
  logger.log(`server ready on port: ${AppConfig.port}`)

}

startUp()
