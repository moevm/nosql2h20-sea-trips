# sea-trips-backend

## Project setup
```
npm install
```

### Run backend server (default mode)
```
npm start
```
If DB doesn't exist (or was deleted), it will be created and filled with mock data.

### Run backend server (no-data mode)
```
npm start -- --no-data-init
```
if DB doesn't exist (or was deleted), it will be created, but won't be filled with mock data.

### Delete DB with trips records
```
npm run deleteDB
```
Unrecommended to use this command while backend server is running.\
