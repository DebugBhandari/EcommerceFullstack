#!/bin/bash
password=test
db_name=test

docker run -e POSTGRES_PASSWORD="${password}" -e POSTGRES_DB="${db_name}" -dp 5432:5432 postgres