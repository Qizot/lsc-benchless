module.exports.handler = async function(event) {
  const os = require('os');

  const mb  = event['queryStringParameters']['allocateMB'];

  if (mb) {
    const array = new Uint8Array(parseInt(mb) * 1024 * 1024); 
  }

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

