// do this as early as possible in app setup
import * as dotenv from "dotenv"

const logger = require('debug-levels')('AppConfig')

let appName = process.env.APP_NAME
if (!appName) {
  logger.warn('APP_NAME not set. using "gramap"')
  appName = 'gramap'
}

// const envPath = `${appName}.env`
// dotenv.config({ path: envPath })
// logger.info('using envPath', envPath)


if (!appName) {
  logger.error('env', process.env)
  // logger.error('using envPath:', envPath)
  throw new Error('no APP_NAME is set in process.env')
}

const dbName = process.env.DB_NAME || appName
// logger.info('using dbName', dbName)
// const mongoUri = process.env.MONGOPATH + dbName
const mongoUri = `http://localhost:27017/${dbName}`
logger.info('mongoUri', mongoUri)

const AppConfig = {
  // maxPages: 100,  // pages of docs to scrape
  // scraperTimeout: 10000,
  // skipTasks: (process.env.skipTasks === 'true') || false,
  // scrapeDocLimit: 0,  // Projects to scrape details. better to limit maxPages
  appName: appName || 'gramap',
  dbName: dbName || appName,
  nodeEnv: process.env.NODE_ENV,
  mongoUri: mongoUri,
  // magic: process.env.magic,
  port: process.env.PORT || 3000,
  // AUTH_SHARED_SECRET: process.env.AUTH_SHARED_SECRET,
  // gramSite: process.env.gramSite,
  // AUTH_KEY: process.env.AUTH_KEY,
  show() {
    logger.log('AppConfig', AppConfig)
  }
}

AppConfig.show()

export default AppConfig
