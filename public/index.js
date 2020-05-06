var express = require('express')
var server = express()
var options = {
    index: 'index.html',
}
server.use('/', express.static('/home/site/wwwroot', options))
//server.get('*', (req, res) => res.sendFile('index.html', { root: Path2D.join(__dirname, '/home/site/wwwroot') }))

server.listen(process.env.PORT)
