import express from 'express';
import dataRoute from './routes/dataRoute';
import cors from 'cors'

const app = express()
const port = 3000;
app.use(cors())
app.use(express.json())

app.use('/api/v1',dataRoute)
app.listen(port,() => {
    console.log(`server up on port: ${port}`)
})


export default app