# Recipe Master Server
## Prerequisites
- Docker ([Installation guide](https://docs.docker.com/get-started/))

### Create Temporary Database
```sh
npm run temp-database-up
```
### Run Existing Migration Scripts
```
npm run temp-database-migrate
```
### Seed Database
```
npm run temp-database-seed
```
### Drop Temporary Database
```
npm run temp-database-down
```