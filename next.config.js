const nextConfig = {
    reactStrictMode: true,
    serverRuntimeConfig: {
        dbConfig: {
            host : '66.23.226.51',
            user:'usmartco_test',
            password:'cEhTLAJEZ3g4X7HwLDkA',
            database:'usmartco_test',
            port:'3306',
        multipleStatements: true
        },
        secret: '12345678'
    },
    publicRuntimeConfig: {
        apiUrl: process.env.NODE_ENV === 'development'
            ? 'http://localhost:3000/api' // development api
            : 'http://localhost:3000/api' // production api
    }
  }
  module.exports = nextConfig