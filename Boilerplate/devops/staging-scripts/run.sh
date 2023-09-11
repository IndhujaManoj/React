echo "#######################################   Stopping Existing Container   #######################################"
docker stop sdq-ga-core-ui
docker rm sdq-ga-core-ui
echo "#######################################   Pulling image and starting   #######################################"
docker pull 987134842112.dkr.ecr.us-east-1.amazonaws.com/sdq-ga-core-ui:latest
docker run --name sdq-ga-core-ui -d -it -p 8082:8082 987134842112.dkr.ecr.us-east-1.amazonaws.com/sdq-ga-core-ui:latest
echo "#######################################   Container Started Successfully   #######################################"