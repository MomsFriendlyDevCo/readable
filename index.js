/**
* Show a readable relative time
* e.g. '1h2s'
*
* @param {number} diff The difference in milliseconds
* @param {Object} [options] Additional options to pass
*
* @example
* relativeTime(new Date(Date.now() - 50)) //= "Just now"
* relativeTime(new Date(Date.now() - 50), {precision: 'ms'}) //= "50ms"
* relativeTime(new Date(Date.now() - 5000)) //= "5s"
* relativeTime(new Date(Date.now() - 60000)) //= "1m"
* relativeTime(new Date(Date.now() - 65000)) //= "1m5s"
*/
module.exports.relativeTime = (diff, options) => {
};


/**
* Show a readable file size
* e.g. '1.5kb'
*
* @param {number} bytes The bytes to format
*
* @example
* fileSize(1024) //= "1kb"
* fileSize(1536) //= "1.5kb"
* fileSize(1048576) //= "1mb"
* fileSize(1073741824) //= "1gb"
* fileSize(1288490188) //= "1.2gb"
*/
module.exports.fileSize = (bytes) => {
};
