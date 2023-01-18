const math = require("mathjs");

function simulateLoad(matrixSize) {
  var first = math.random([matrixSize, matrixSize]);
  var second = math.random([matrixSize, matrixSize]);
  return math.multiply(first, second);
}

module.exports = async function (context, req){
  try{
    const startTime = new Date();
    simulateLoad(req['query']['matrixSize']);
    const endTime = new Date();

    context.res = {
      status: 200,
      body: JSON.stringify({
        elapsedTimeMs: (endTime-startTime)
      }),
      headers: {"content-type": "application/json"}
    }
} catch (error) {
    console.error(error);
    context.res = {
      status: 500,
      body: JSON.stringify(error)
    };
  }
}

