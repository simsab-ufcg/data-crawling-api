# SIMSAB - Data Crawling Api

Crawls [INSA Transfer Server](https://transferserver.insa.gov.br/) listing its directories and files. This API was made with the purpose of making easier the process of getting files for the Promethee to run on them.

# How to run

    npm install
    npm run dev

## Routes
| Route | Description | Request method |
|--|--|--|
|`/api/`|Application 'home' route  | GET |
|`/api/dataset` | List datasets route directory | GET |
|`/api/dataset` | List datasets specified by the 'path' field (inside the body request) | POST |