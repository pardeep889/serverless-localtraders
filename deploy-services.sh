#!/bin/bash

SERVICE_PATHS=("user-service" "wallet-service")

for SERVICE_PATH in ${SERVICE_PATHS[@]}; do
    echo "========================> Deploying ${SERVICE_PATH} ..."
    cd $SERVICE_PATH && npm install && serverless deploy && cd -
done