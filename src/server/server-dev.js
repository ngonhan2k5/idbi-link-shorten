import path from 'path'
import express from 'express'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'

import webpackHotMiddleware from 'webpack-hot-middleware'

// import history from 'connect-history-api-fallback'

import config from '../../webpack.dev.config.js'
import routes from './routes'

const app = express(),
    DIST_DIR = __dirname,
    HTML_FILE = path.join(DIST_DIR, 'index.html'),
    compiler = webpack(config)

    // app.use(history()); 

app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath
}))
app.use(webpackHotMiddleware(compiler))

app.use(express.json())

app.post('/api/shorter', routes.shorter)

app.get('/u/:url', routes.fetch)


// app.get('*', (req, res, next) => {
//     console.log("here")
//     compiler.outputFileSystem.readFile(HTML_FILE, (err, result) => {
//         if (err) {
//             return next(err)
//         }
//         res.set('content-type', 'text/html')
//         res.send(result)
//         res.end()
//     })
// })


const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`App listening to ${PORT}....`)
    console.log('Press Ctrl+C to quit.')
})