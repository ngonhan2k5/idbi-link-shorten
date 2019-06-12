import path from 'path'
import express from 'express'

import routes from './routes'

const app = express(),
            DIST_DIR = __dirname + '/' + 'public',
            HTML_FILE = path.join(DIST_DIR, 'index.html')
            
app.use(express.static(DIST_DIR))

app.use(express.json())

app.post('/api/shorter', routes.shorter)

app.get('/:url', routes.fetch)

app.get('*', (req, res) => {
    res.sendFile(HTML_FILE)
})
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`App listening to ${PORT}....`)
    console.log('Press Ctrl+C to quit.')
})