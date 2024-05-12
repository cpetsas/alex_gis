#!/bin/sh
python manage.py migrate
python scripts/create_mock_users.py
python manage.py runserver 0.0.0.0:8000 