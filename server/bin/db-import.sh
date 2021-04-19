#!/bin/bash

## run from within this dir OR
## cwd to script directory
## so all paths are relative to that
cd "$(dirname "$0")"

# mongoimport --drop --db lexy --jsonArray --collection Examples ../data/dump/Examples.json
# mongoimport --drop --db lexy  --jsonArray --collection Dict ../data/dump/Dict.json
# mongoimport --drop --db lexy  --jsonArray --collection Grammar ../data/dump/Grammar.json


dbname=gramap
echo "load db: $dbname"

for collection in notes # comments examples grams
  do
    echo "importing $collection"
    # --jsonArray
    mongoimport --drop --db $dbname --collection $collection --type json --file ../../data/gramap.wiki/archive/json/$collection.json --jsonArray
  done

