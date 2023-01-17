FUNCTION_NAME=$1
ENVIRONMENT=$2
REGION=us-west-1


function fail() {
    echo $2
    exit $1
}

alias awslocal="aws --endpoint-url=http://localhost:4566"

awslocal lambda get-function --function-name ${FUNCTION_NAME} --region ${REGION} > /dev/null 
[ $? != 0 ] || awslocal lambda delete-function --function-name ${FUNCTION_NAME} --region ${REGION}

awslocal lambda create-function \
    --region ${REGION} \
    --function-name ${FUNCTION_NAME} \
    --runtime nodejs12.x \
    --handler ${FUNCTION_NAME}.handler \
    --memory-size 128 \
    --zip-file fileb://lambda.zip \
    --role arn:aws:iam::123456:role/irrelevant \
    > /dev/null

[ $? == 0 ] || fail 1 "Failed: AWS / lambda / create-function"

awslocal lambda get-function-url-config --function-name ${FUNCTION_NAME} --region ${REGION} > /dev/null 
[ $? != 0 ] || awslocal lambda delete-function-url-config --function-name ${FUNCTION_NAME} --region ${REGION}

function_url=$(
    awslocal lambda create-function-url-config \
        --region ${REGION} \
        --function-name ${FUNCTION_NAME} \
        --auth-type NONE 
)

echo "Function url: $function_url"

[ $? == 0 ] || fail 2 "Failed: AWS / lambda / create-function-url-config"

