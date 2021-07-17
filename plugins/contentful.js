const contentful = require('contentful')
let config = null

if (process.env.NODE_ENV === 'development') {
  config = {
    space: process.env.CTF_SPACE_ID,
    accessToken: process.env.CTF_PREVIEW_ACCESS_TOKEN,
    host: 'preview.contentful.com'
  }
} else {
  config = {
    space: process.env.CTF_SPACE_ID,
    accessToken: process.env.CTF_CDA_ACCESS_TOKEN
  }
}

const client = contentful.createClient(config)

export default client
