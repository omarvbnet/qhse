/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    serverRuntimeConfig: {
        dbConfig: {
            host : '66.23.226.51',
            user:'usmartco_test',
            password:'cEhTLAJEZ3g4X7HwLDkA',
            database:'usmartco_test',
            port:3306,
        multipleStatements: true
        },
        secret: 'THIS IS USED TO SIGN AND VERIFY JWT TOKENS, REPLACE IT WITH YOUR OWN SECRET, IT CAN BE ANY STRING'
    },
    publicRuntimeConfig: {
        apiUrl:'https://qhse-theta.vercel.app/api'
    }
}

module.exports = nextConfig