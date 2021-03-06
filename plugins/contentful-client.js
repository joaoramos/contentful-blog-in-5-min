let ctfConfig

try {
  ctfConfig = require('../.contentful')
} catch (e) {
  if (
    !process.env.CTF_PERSON_ID ||
    !process.env.CTF_BLOG_POST_TYPE_ID ||
    !process.env.CTF_SPACE_ID ||
    !process.env.CTF_CDA_ACCESS_TOKEN ||
    !process.env.CTF_CMA_ACCESS_TOKEN
  ) {
    throw new Error(
      'Please provide needed Contentful configs:\n' +
      'There are two way to do so:\n' +
      '- define a .contentful.js file (similar to .contentful.sample) in the root of this directory\n' +
      '- define environment variables CTF_PERSON_ID, CTF_BLOG_POST_TYPE_ID, CTF_SPACE_ID, CTF_ACCESS_TOKEN'
    )
  }

  ctfConfig = {
    CTF_PERSON_ID: process.env.CTF_PERSON_ID,
    CTF_BLOG_POST_TYPE_ID: process.env.CTF_BLOG_POST_TYPE_ID,
    CTF_SPACE_ID: process.env.CTF_SPACE_ID,
    CTF_CDA_ACCESS_TOKEN: process.env.CTF_CDA_ACCESS_TOKEN,
    CTF_CMA_ACCESS_TOKEN: process.env.CTF_CMA_ACCESS_TOKEN
  }
}

const cdaContentful = require('contentful')
const cmaContentful = require('contentful-management')

const cdaClient = cdaContentful.createClient({
  space: ctfConfig.CTF_SPACE_ID,
  accessToken: ctfConfig.CTF_CDA_ACCESS_TOKEN
})

const cmaClient = cmaContentful.createClient({
  accessToken: ctfConfig.CTF_CMA_ACCESS_TOKEN
})

module.exports = {
  cdaClient,
  cmaClient,
  config: ctfConfig
}
