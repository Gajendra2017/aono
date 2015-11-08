const express = require('express')
const ipfsAPI = require('ipfs-api')

const ipfs = ipfsAPI('localhost', '5001')

const app = express()

app.get('/:hash', (req, res) => {
  ipfs.cat(req.params.hash, (err, file) => {
    if (err || !file) {
      return console.error(err)
    }

    if(file.readable) {
      file.pipe(res)
    } else {
      res.send(file)
    }
    res.setHeader("Access-Control-Allow-Origin", "*");
  })
})

const port = 8081
app.set('x-powered-by', false)
app.listen(port)
console.log('Express server started on port %s', port)
