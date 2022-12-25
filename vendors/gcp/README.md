# GCP vendor
Implementation of GCP Cloud Function serverless functions.

## Requirements
* `docker`
* `docker-compose`

## Implemented functions
* `hello` - simple hello world - testing the cold start 
* `object_storage_upload` - Google Cloud Storage upload  - for the vendor's object storage solution (uploads a 50MB object and returns
    the execution time)


## Structure
All functions are implemented in a single file `index.js`.

To run them locally one can run the following commands:
```bash
# run the hello function
npm run hello
# run the storage function, env variables are necessary for using storage
STORAGE_API_ENDPOINT=http://localhost:4443 STORAGE_BUCKET=lsc-test-bucket npm run storage
```

Once the functions gets started it is available at `http://localhost:8080` address.

**NOTE:** 
When testing locally it may happen that there is no storage bucket created yet,
therefore one needs to uncomment the following line in `index.js` file when running
for the first time:
```js
// await storage.createBucket(process.env.STORAGE_BUCKET);
```

Also to test the storage function one needs to run the `docker-compose` which consists of a fakte Google Cloud Storage 
container.

