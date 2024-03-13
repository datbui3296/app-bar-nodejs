// import { env } from '*/config/environtment'
const env  = require("../config/environtment");

 const HttpStatusCode = {
    OK: 200,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404,
    INTERNAL_SERVER: 500,
    EXPIRED: 410,
    REFRESH_EXPIRED: 411,
    INVALID_TOKEN: 424,
    INVALID_IMAGE: 422,
   

}

 const WHITELIST_DOMAINS = [
    'http://localhost:3000',
    'http://localhost:3001',
    'http://web.dangkha.net'
]

 const DEFAULT_ITEMS_PER_PAGE = 12
 const DEFAULT_CURRENT_PAGE = 1

//Default la moi truong dev
let websiteDomain = 'http://localhost:3000'
if (env.BUILD_MODE === 'production') {
    websiteDomain = 'http://api.dangkha.net'
}
 module.exports = {HttpStatusCode,WHITELIST_DOMAINS,DEFAULT_ITEMS_PER_PAGE,DEFAULT_CURRENT_PAGE,websiteDomain}