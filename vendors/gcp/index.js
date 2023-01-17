const functions = require('@google-cloud/functions-framework');
const math = require("mathjs");
const { Storage } = require('@google-cloud/storage');

functions.http("hello", (_req, res) => {
  res.send("Hello world!");
});

functions.http("get_resources", (_req, res) => {
  var os = require('os');
  res.send(JSON.stringify({
    cpus: os.cpus(),
    totalmem: os.totalmem(), 
    freemem: os.freemem()
  }));
});

function simulateLoad(matrixSize) {
  var first = math.random([matrixSize, matrixSize]);
  var second = math.random([matrixSize, matrixSize]);
  return math.multiply(first, second);
}

functions.http("simulate_cpu_load", (req, res) => {
  const startTime = new Date();
  var result = simulateLoad(req['query']['matrixSize']);
  const endTime = new Date();
  res.send(JSON.stringify({
      elapsedTimeMs: (endTime-startTime)  
    }));
});


function createPayload(size) {
  return Buffer.from(new Uint8Array(size));
}

functions.http('object_storage_upload', async (_req, res) => {
  const storage = new Storage({ 
    // NOTE: this may need to be uncommented and the next line commented out when
    // running on the GCP
    // keyFilename: "google-cloud-key.json",
    apiEndpoint: process.env.STORAGE_API_ENDPOINT,
  });
  // await storage.createBucket(process.env.STORAGE_BUCKET);

  const bucket = storage.bucket(process.env.STORAGE_BUCKET);

  const payload = createPayload(50 * 1024 * 1024);

  const blob = bucket.file("test");

  const startTime = new Date();
  const blobStream = blob.createWriteStream({
    resumable: false,
  });

  blobStream.on("error", (err) => {
    res.status(500).send({ message: err.message });
  });

  blobStream.on("finish", async (_data) => {
    const endTime = new Date();

    res.status(200).send({
      "elapsedTimeMs": (endTime - startTime)
    });
  });

  blobStream.end(payload);
});

