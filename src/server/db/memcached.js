import Memcached from 'memcached'
var memcached = new Memcached('127.0.0.1:11211')

const db = {
    saveUrl : (slug, shortedUrl) => {
        memcached.set(slug, shortedUrl, 604800, function (err, data) { 
            console.log("Save error", err, data) 
        });
    },
    fetchUrl : (slug) => {
        return new Promise((resolve, reject) => {
            memcached.get(slug, function (err, data) {
                if (err){
                    console.log("Read error", err)
                    reject(err)
                }else{
                    resolve({url:data})
                }
            });
        })
    }
}
export default db