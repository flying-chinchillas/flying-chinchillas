#! /bin/bash

cd backend

source ./venv/bin/activate

uvicorn main:app --reload

echo "api server running"

