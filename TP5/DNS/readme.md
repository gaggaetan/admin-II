
docker build -t dns . (=> va creer  une image dns à partir du ficheir Dockerfile)

docker compose up (=> va lancer un contenaire à partir du docker-compose.yaml qui lui va chercher l'image dns créer avant,et chercher les parametres à rajouter à cette image (ports,..) dans le docker-compose.yaml,..)