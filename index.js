const express = require ("express");
const app = express()
const port = process.env.PORT || 5000;

const users = [
    {id: 1, name: 'Shobuj', email: 'shobuj@gmail.com'},
    {id: 1, name: 'Sabit', email: 'sabit@gmail.com'},
    {id: 1, name: 'Shoaib', email: 'shoaib@gmail.com'},
]

app.get('/', (req, res) => {
    res.send('User Management server is running')
})

app.get('/users', (req, res) => {
    res.send(users)
})

app.listen(port, () => {
    console.log(` Server is running port: ${port} `)
})
