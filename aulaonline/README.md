docker build -f ./src/01-scalability/01/Dockerfile -t scalability/node-web-app .
docker run -p 3001:3000 -d scalability/node-web-app
docker run -p 3002:3000 -d scalability/node-web-app
docker run -p 3003:3000 -d scalability/node-web-app

docker build -f ./src/01-scalability/01/nginx/Dockerfile -t scalability/nginx-load-balance .
docker run -p 3000:80 -d scalability/nginx-load-balance

docker container ls
docker container logs abcde

curl http://localhost:3000/
curl http://localhost:3001/
curl http://localhost:3002/
curl http://localhost:3003/

docker container start abcde
docker container stop abcde
docker container rm -f abcde


