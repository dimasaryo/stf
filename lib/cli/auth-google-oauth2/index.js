module.exports.command = 'auth-google-oauth2'

module.exports.describe = 'Start an Google OAuth 2.0 auth client.'

module.exports.builder = function(yargs) {
  return yargs
    .env('STF_AUTH_GOOGLE_OAUTH2')
    .strict()
    .option('app-url', {
      alias: 'a'
    , describe: 'URL to the app unit.'
    , type: 'string'
    , demand: true
    })
    .option('oauth-authorization-url', {
      describe: 'OAuth 2.0 authorization URL.'
    , type: 'string'
    , default: process.env.OAUTH_AUTHORIZATION_URL || "https://accounts.google.com/o/oauth2/v2/auth"
    , demand: true
    })
    .option('oauth-token-url', {
      describe: 'OAuth 2.0 token URL.'
    , type: 'string'
    , default: process.env.OAUTH_TOKEN_URL || "https://www.googleapis.com/oauth2/v4/token"
    , demand: true
    })
    .option('oauth-userinfo-url', {
      describe: 'OAuth 2.0 user info URL.'
    , type: 'string'
    , default: process.env.OAUTH_USERINFO_URL || "https://www.googleapis.com/oauth2/v3/userinfo"
    , demand: true
    })
    .option('oauth-client-id', {
      describe: 'OAuth 2.0 client ID.'
    , type: 'string'
    , default: process.env.OAUTH_CLIENT_ID
    , demand: true
    })
    .option('oauth-client-secret', {
      describe: 'OAuth 2.0 client secret.'
    , type: 'string'
    , default: process.env.OAUTH_CLIENT_SECRET
    , demand: true
    })
    .option('oauth-callback-url', {
      describe: 'OAuth 2.0 callback URL.'
    , type: 'string'
    , default: process.env.OAUTH_CALLBACK_URL
    , demand: true
    })
    .option('oauth-scope', {
      describe: 'Space-separated OAuth 2.0 scope.'
    , type: 'string'
    , default: process.env.OAUTH_SCOPE
    , demand: true
    })
    .option('oauth-hd', {
      describe: 'Optional email domain to allow authentication for.'
    , type: 'string'
    , default: process.env.OAUTH_HD || ''
    , demand: false
    })
    .option('port', {
      alias: 'p'
    , describe: 'The port to bind to.'
    , type: 'number'
    , default: process.env.PORT || 7120
    })
    .option('secret', {
      alias: 's'
    , describe: 'The secret to use for auth JSON Web Tokens. Anyone who ' +
        'knows this token can freely enter the system if they want, so keep ' +
        'it safe.'
    , type: 'string'
    , default: process.env.SECRET
    , demand: true
    })
    .option('ssid', {
      alias: 'i'
    , describe: 'The name of the session ID cookie.'
    , type: 'string'
    , default: process.env.SSID || 'ssid'
    })
    .epilog('Each option can be be overwritten with an environment variable ' +
      'by converting the option to uppercase, replacing dashes with ' +
      'underscores and prefixing it with `STF_AUTH_OAUTH2_` (e.g. ' +
      '`STF_AUTH_OAUTH2_SECRET`). Legacy environment variables like ' +
      'OAUTH_SCOPE are still accepted, too, but consider them ' +
      'deprecated.')
}

module.exports.handler = function(argv) {
  return require('../../units/auth/google-oauth2')({
    port: argv.port
  , secret: argv.secret
  , ssid: argv.ssid
  , appUrl: argv.appUrl
  , oauth: {
      authorizationURL: argv.oauthAuthorizationUrl
    , tokenURL: argv.oauthTokenUrl
    , userinfoURL: argv.oauthUserinfoUrl
    , clientID: argv.oauthClientId
    , clientSecret: argv.oauthClientSecret
    , callbackURL: argv.oauthCallbackUrl
    , scope: argv.oauthScope.split(/\s+/)
    , hd: argv.oauthHd
    }
  })
}