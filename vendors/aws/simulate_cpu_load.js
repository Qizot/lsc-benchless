function simulateLoad(numberOfIterations) {
  sum = 0;
  for(var i=0; i<numberOfIterations; i++) {
    sum+=1;
  }
}
module.exports.handler = async function(event) {
  try{
    const startTime = new Date();
    simulateLoad(event['queryStringParameters']['numberOfIterations']);
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

