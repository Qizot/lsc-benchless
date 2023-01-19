const { BlobServiceClient, ContainerClient, AnonymousCredential, StorageSharedKeyCredential } = require("@azure/storage-blob");
require("dotenv").config();

const blobService = new BlobServiceClient(process.env.BLOB_SERVICE_URL,
    new StorageSharedKeyCredential(process.env.ACCOUNT_NAME, process.env.ACCOUNT_KEY));
const containerClient = blobService.getContainerClient(process.env.BUCKET_NAME);


function createPayload(size) {
  const { randomBytes } = require('crypto');
  return randomBytes(size);
}

module.exports = async function(context, req) {
    try {
        const payload = createPayload(50 * 1024 * 1024);
        await containerClient.createIfNotExists();

        const startTime = new Date();

        const blockBlocClient = containerClient.getBlockBlobClient("test");

        await blockBlocClient.upload(payload, payload.length);

        const endTime = new Date();


        context.res = {
            body: JSON.stringify({
                elapsedTimeMs: (endTime - startTime)
            })
        };
    } catch (error) {
        console.error(error);

        context.res = {
            status: 500,
            body: "Something went wrong..."
        };
    }
}
