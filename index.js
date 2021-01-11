const server = require('./server/index')
const { PORT, DATABASE } = require('./config')
const mongoose = require('mongoose')

mongoose.connect(DATABASE, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true}, (err, res) => {
    if(err) {
        throw err
    } else{
        server.listen(PORT, () => {
            console.log(`Server running on port: ${PORT}`)
        })
    }
})
