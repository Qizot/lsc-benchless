#!/bin/sh

npm install

rm -rd lambda.zip
zip -r lambda.zip object_storage_upload.js hello.js node_modules package.json package-lock.json

