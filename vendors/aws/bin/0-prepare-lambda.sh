#!/bin/sh

npm install

rm -rd lambda.zip
zip -r lambda.zip object_storage_upload.js hello.js get_resources.js simulate_cpu_load.js node_modules package.json package-lock.json

