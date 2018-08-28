# SIMSAB - Data Crawling Api

Crawls [INSA Transfer Server](https://transferserver.insa.gov.br/) listing its directories and files. This API was made with the purpose of making easier the process of getting files for the Promethee to run on them.

# How to run

    npm install
    npm run dev

## Routes
| Route | Description | Request method |
|--|--|--|
|`/api/`|Application 'home' route  | GET |
|`/api/dataset` | Without parameter will list all datasets, if add 'dataset' parameter will list all files inside of the specified dataset. | GET |

## Change HTML or FTP Crawler

Set FTP_FLAG and fill FTP parameters in env file, by default API will use HTML crawler.