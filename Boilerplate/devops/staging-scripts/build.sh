#Below script is used to build and upload the image to ECR
#run `nvm use 14.18.1` before building

cd /home/ec2-user/code/sdq-core-frontend-service
echo "#######################################   Building React Project   #######################################"
rm -rf build
npm install
npm run build
echo "#######################################   Building Docker Image    #######################################"
docker build --no-cache  -t sdq-ga-core-ui .
docker_login=`aws ecr get-login --no-include-email --region us-east-1`
$docker_login
echo "#######################################   Uploading image to ECR   #######################################"
docker tag sdq-ga-core-ui 987134842112.dkr.ecr.us-east-1.amazonaws.com/sdq-ga-core-ui:latest
docker push 987134842112.dkr.ecr.us-east-1.amazonaws.com/sdq-ga-core-ui:latest
echo "#######################################   Image uploaded to ECR   #######################################"
