# Recipe Master Server
## Prerequisites
- Docker ([Installation guide](https://docs.docker.com/get-started/))
### Create Temporary Database
```sh
docker-compose up -d
```
### Run Existing Migration Scripts
```sh
npx prisma migrate dev
```