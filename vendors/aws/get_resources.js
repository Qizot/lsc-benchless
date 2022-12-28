module.exports.handler = async function(event) {
  var os = require('os');

  return {
    statusCode: 200,
    body: JSON.stringify({
      cpus: os.cpus(),
      totalmem: os.totalmem(), 
      freemem: os.freemem()
    }),
    headers: {"content-type": "application/json"}
  }
}

