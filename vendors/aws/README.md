# AWS vendor
Implementation of AWS Lambda serverless functions.

## Requirements
* `docker`
* `docker-compose`
* `aws-cli`

## Implemented functions
* `hello` - simple hello world - testing the cold start 
* `object_storage_upload` - S3 upload  - for the vendor's object storage solution (uploads a 50MB object and returns
    the execution time)
* `get_resources` - return the information about the CPU and memory used on the runtime
* `simulate_cpu_load` - returns the time in miliseconds elapsed while performing some computation of a given size (specified by the parameter).

## Structure
`bin` folder contains various scripts required for building and deploying the lambdas:
* `0-pepare-lambda.sh` - create a `zip` archive for lambda deployment
* `1-deploy-local-lambda.sh` - deploys given lambda to localstack environment (can be easily replaced with aws one)

Usage:
```bash
./bin/0-prepare-lambda.sh
./bin/1-deploy-local-lambda.sh hello
./bin/1-deploy-local-lambda.sh object_storage_upload "Variables={BUCKET_NAME=lsc-test-bucket,ACCESS_KEY_ID=access_key_id,SECRET_ACCESS_KEY=secret_access_key,S3_ENDPOINT=http://minio:9000}"
```

Note that `object_storage_upload` takes couple of environemntal variables that are necessary for connectin
with proper S3. On dev environment it connects to `minio` (the `localstack` didn't want to cooperate).

To test out the lambdas the `1-deploy-local-lambda.sh` scripts will print out the lambda's url on completion. All you
need is to perform an HTTP request against it.

The `simulate cpu load` function requires to pass a `matrixSize` query parameter to the HTTP url.

## Dev environment
Before deploying to the cloud we can freely test given lambdas by deploying them to local environment provided
by `localstack`. To spin up the enrivonment just run:
```bash
docker-compose up
```

