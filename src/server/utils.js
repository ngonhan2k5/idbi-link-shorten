const utils = {
    isSafeUrl : (url, slug) => {
        if (url == slug) return false
        if (url.indexOf('idbi.me') !== -1) return false


        return true
    }
}

export default utils