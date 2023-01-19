
module.exports = async function (context, req){
  var os = require('os');

  const mb = req['query']['allocateMB'];

  if (mb) {
    const array = new Uint8Array(parseInt(mb * 1024 * 1024)); 
  }

  context.res = {
    status: 200,
    body: JSON.stringify({
      cpus: os.cpus(),
      totalmem: os.totalmem(), 
      freemem: os.freemem()
    }),
    headers: {"content-type": "application/json"}
  }
}

