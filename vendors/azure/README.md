# Azure vendor
Implementation of Azure Function serverless functions.

## Requirements
* `docker`
* `docker-compose`
* `azure-functions-core-tools@4`

## Implemented functions
* `hello` - simple hello world - testing the cold start 
* `object_storage_upload` - Blob storage update  - for the vendor's object storage solution (uploads a 50MB object and returns
    the execution time)
* `simulate_cpu_load` - tests the CPU performance by performing a large, dense matrix multiplication
* `get_resources` - returns resources available on given machine

## Structure
Each of the functions has its own folder.
First, install the dependencies:
```
npm ci
``` 
To run any of them locally use any of following commands:
```bash
# run the hello function
func start hello
# run the storage function
func start object_storage_upload
# run the get resources function
func start get_resources
# run the simulate cpu load function
func start simulate_cpu_load
```

To run the storage function locally you need to run `azurite` with given `docker-compose` setup.

The `simulate cpu load` function requires to pass a `matrixSize` query parameter to the HTTP url.

In case of local development and storage function couple of environmental variables are required (but
provided inside `.env` file):

* `ACCOUNT_NAME` - azure accont name
* `ACCOUNT_KEY` - azure account key
* `BLOB_SERVICE_URL`- blob'z service url
* `BUCKET_NAME` - the bucket name (in Azure's philosophy this is called a `container`).

## Deployment
When deploying make sure that all necessary azure resources are present (this usually requires more work compared
to AWS and GCP) and that necessary blob storage and container is present.

