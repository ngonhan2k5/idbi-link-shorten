import codenamize from '@codenamize/codenamize'
import db from '../db'

const routes = {
    shorter: (req, res, next) => {
        console.log(req.body.url)
        let url = codenamize(req.body.url)
        
        db.saveUrl(url, req.body.url)

        let shortUrl = "http://idbi.me/" + url

        res.json({ shorted_url: shortUrl })
        // res.send('OK')
        res.end()
    },
    fetch: (req, res, next) => {
        console.log("Fetch", req.params)
        // let url = codenamize(req.body.url)
        let url = req.params.url + req.params.lru
        db.fetchUrl(url).then(
            (data)=>{
                console.log("Fetched: ", data)
                res.end()
            }),
            (err) => {
                console.log("Fetch fail",err)
                res.end()
            }
    },
}


export default routes