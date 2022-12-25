const aws = require("aws-sdk");

const BUCKET_NAME = process.env.BUCKET_NAME;
const s3bucket = new aws.S3({
  credentials: {
    accessKeyId: process.env.ACCESS_KEY_ID ,
    secretAccessKey: process.env.SECRET_ACCESS_KEY 
  },
  endpoint: process.env.S3_ENDPOINT, 
  verify: false,
  s3ForcePathStyle: true
});

function uploadObjectToS3Bucket(objectName, objectData) {
  const params = {
    Bucket: BUCKET_NAME,
    Key: objectName,
    Body: objectData
  };

  return new Promise((resolve, reject) => {
    s3bucket.upload(params, function(err, _data) {
      if (err) {
        return reject(err);
      }

      return resolve();
    });
  })
}

function createEmptyPayload(size) {
  return Buffer.from(new Uint8Array(size));
}

module.exports.handler = async function(_event) {
  const payload = createEmptyPayload(50 * 1024 * 1024);

  try {
    const startTime = new Date();
    await uploadObjectToS3Bucket("test", payload)
    const endTime = new Date();

    return {
      statusCode: 200,
      body: JSON.stringify({
        "elapsedTimeMs": (endTime - startTime)
      })
    };
  } catch (error) {
    console.error(error);

    return {
      statusCode: 500,
      body: JSON.stringify(error)
    };
  }
} 
