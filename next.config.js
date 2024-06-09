const nextConfig = {
    reactStrictMode: true,
    serverRuntimeConfig: {
        dbConfig: {
            host: 'localhost',
            port: 3306,
            user: 'usmartco_qhse',
            password: 'Vbnet2008ex@',
            database: 'qhse',
            multipleStatements:true,
        },
        secret: 'THIS IS USED TO SIGN AND VERIFY JWT TOKENS, REPLACE IT WITH YOUR OWN SECRET, IT CAN BE ANY STRING'
    },
    publicRuntimeConfig: {
        apiUrl: process.env.NODE_ENV === 'development'
            ? 'http://qhse.usmart-iot.com/api' // development api
            : 'http://qhse.usmart-iot.com/api' // production api
    }
  }
  module.exports = nextConfig