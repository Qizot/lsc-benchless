const math = require('mathjs');

function simulateLoad(matrixSize) {
  var first = math.random([matrixSize, matrixSize]);
  var second = math.random([matrixSize, matrixSize]);
  return math.multiply(first, second);
}

module.exports.handler = async function(event) {
  try{
    const startTime = new Date();
    simulateLoad(event['queryStringParameters']['matrixSize']);
    const endTime = new Date();

    return {
      statusCode: 200,
      body: JSON.stringify({
        elapsedTimeMs: (endTime-startTime)
      }),
      headers: {"content-type": "application/json"}
    }
} catch (error) {
    console.error(error);

    return {
      statusCode: 500,
      body: JSON.stringify(error)
    };
  }
}
