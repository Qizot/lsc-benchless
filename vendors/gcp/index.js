const functions = require('@google-cloud/functions-framework');

const { Storage } = require('@google-cloud/storage')

functions.http("hello", (_req, res) => {
  res.send("Hello world!");
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

