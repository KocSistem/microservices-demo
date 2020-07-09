#! /bin/sh -e

MONGO_USER_NAME=${MONGO_USER_NAME} #user
MONGO_PASSWD=${MONGO_PASSWD} #mongopass

helm repo add stable https://kubernetes-charts.storage.googleapis.com/ && \
helm repo update && \
helm install mongodb stable/mongodb \
    --set mongodbUsername=${MONGO_USER_NAME},mongodbPassword=${MONGO_PASSWD},mongodbDatabase=weather