const server = require('./server/index')
const { PORT } = require('./config')

server.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`)
})