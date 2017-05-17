const ctfConfig = require('./plugins/contentful-client').config
const client = require('./plugins/contentful-client').client

const config = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'starter',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Create a Contentful blog in 5 minutes' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://dhbhdrzi4tiry.cloudfront.net/cdn/sites/foundation.min.css' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#2199e8' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLINT on save
    */
    extend (config, ctx) {
      if (ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },

  /*
  ** ᕕ( ᐛ )ᕗ CTF-BLOG-IN-5-MINUTES
  ** Make client available everywhere via Nuxt plugins
  */
  plugins: ['~plugins/contentful-client'],

  /*
  ** ᕕ( ᐛ )ᕗ CTF-BLOG-IN-5-MINUTES
  ** Get all blog posts from Contentful
  ** and generate the needed files upfront
  **
  ** Included:
  ** - blog posts
  ** - available tags
  */
  generate: {
    routes () {
      return client.getEntries({
        'content_type': ctfConfig.CTF_BLOG_POST_TYPE_ID
      }).then(entries => {
        return [
          ...entries.items.map(entry => `blog/${entry.fields.slug}`),
          ...ctfConfig.CTF_BLOG_POST_TAGS.map(tag => `tags/${tag}`)
        ]
      })
    }
  },

  env: ctfConfig
}

module.exports = config
