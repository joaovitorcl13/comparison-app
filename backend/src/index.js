const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./queries')
const port = 3000
const cors = require('cors')

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, e Postgres API - Trabalho Final de BD II' })
})

app.use(cors())
app.get('/objeto', db.selectObjeto)
app.post('/objeto', db.insertObjeto)
app.delete('/objeto/:cod', db.deleteObjeto)
app.put('/objeto/:cod', db.updateObjeto)

app.get('/criterio', db.selectCriterio)
app.post('/criterio', db.insertCriterio)
app.delete('/criterio/:cod', db.deleteCriterio)
app.put('/criterio/:cod', db.updateCriterio)

app.get('/comparacao', db.selectComparacao)
app.post('/comparacao', db.insertComparacao)
app.delete('/comparacao/:cod', db.deleteComparacao)


app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})