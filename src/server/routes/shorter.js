import codenamize from '@codenamize/codenamize'


import Memcached from 'memcached'
var memcached = new Memcached('127.0.0.1:11211')

const routes = {
    shorter : (req, res, next) => {
        console.log(req.body.url)
        let url = codenamize(req.body.url)
        
        memcached.set(url, req.body.url, 604800, function (err, data) { 
            console.log("Save error", err, data) 
        });
        
        let shortUrl = "http://idbi.com/" + url
        
        res.json({shorted_url: shortUrl})
        // res.send('OK')
        res.end()
    },
    fetch : (req, res, next) => {
        console.log("Fetch", req.params)
        // let url = codenamize(req.body.url)
        let url = req.params.url
        memcached.get(url, function (err, data) { 
            if (err)
                console.log("Read error", err) 
            else
                res.redirect(data)
        });
    },
}


export default routes