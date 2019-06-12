import path from 'path'
import express from 'express'

import routes from './routes'

const app = express(),
            DIST_DIR = __dirname + '/' + 'public',
            // HTML_FILE = path.join(DIST_DIR, 'index.html')
            HTML_FILE = path.join(DIST_DIR, 'index.html'),
            ERROR_FILE = path.join(DIST_DIR, 'error.html')
            
app.use(express.static(DIST_DIR))

app.use(express.json())

// app.use(routes.errorPage)

app.post('/api/shorter', routes.shorter)

app.get('/:url-:lru', routes.fetch, (req, res) => {
    res.sendFile(HTML_FILE)
})

app.get('*', (req, res) => {
    res.sendFile(HTML_FILE)
})

app.use(routes.errorPage(null, ERROR_FILE))

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`App listening to ${PORT}....`)
    console.log('Press Ctrl+C to quit.')
})