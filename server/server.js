import express from 'express'
import cors from 'cors'
import "dotenv/config"

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
  res.send('Server is Live')
})

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})
