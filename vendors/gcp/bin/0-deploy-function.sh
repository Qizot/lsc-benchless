
FUNCTION_NAME=$1

# NOTE: this will require logging to gcp and making sure that the function has access to google storage
gcloud functions \
  deploy $FUNCTION_NAME \
  --runtime nodejs16 \
  --trigger-http \
  --allow-unauthenticated
