
module.exports = async function (context, req){
  var os = require('os');

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

