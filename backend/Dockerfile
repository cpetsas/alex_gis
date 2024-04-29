FROM python:3.11.4-slim-buster

WORKDIR /usr/backend/

RUN pip install --upgrade pip
COPY ./requirements.txt .
RUN pip install -r requirements.txt

COPY . .

RUN printenv

WORKDIR /usr/backend/article_api

RUN python3 manage.py migrate