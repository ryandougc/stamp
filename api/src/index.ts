import App from './App'

const app = new App().express
const port = process.env.PORT || 5000

app.listen(port, err => {
    if (err) return console.log(err)

    return console.log(`Server is running on port ${port}`)
})