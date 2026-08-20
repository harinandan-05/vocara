import express from 'express';
import dataRoute from './routes/dataRoute';
import cors from 'cors'
import apiRoute from './routes/apiRoute';

const app = express()
const port = 3000;
app.use(cors())
app.use(express.json())
apiRoute.use(express.text({ type: ["application/sdp", "text/plain"] }));

app.use('/api/v1',dataRoute)
app.use('/api/v1',apiRoute)
app.listen(port,() => {
    console.log(`server up on port: ${port}`)
})


export default app