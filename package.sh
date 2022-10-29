#!/bin/zsh
# Package xkcdpw for docker distribution

IMAGE=brown131/mutorere

docker images | grep $IMAGE
if [ $? -ne 0 ]
then docker build . -t $IMAGE
fi

docker save $IMAGE | gzip > ${IMAGE/\//_}.tgz
