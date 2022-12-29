function simulateLoad(numberOfIterations) {
  sum = 0;
  for(var i=0; i<numberOfIterations; i++) {
    sum+=1;
  }
}

module.exports = async function (context, req){
  try{
    const startTime = new Date();
    simulateLoad(req['query']['numberOfIterations']);
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

