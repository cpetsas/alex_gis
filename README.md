# Article management system

## System dependencies - This project assumes you are using Linux

- docker
- docker-compose
- npm

(using sudo is optional, you can install the dependencies on your specific user)
```sh
    sudo apt install npm
```
```sh
    sudo apt install docker-compose 
```
```sh
    sudo apt install docker
```

## Project dependencies

### Frontend
Navigate in the frontend/article_admin directory and install dependencies with npm (There is a bug with react within docker-compose where npm installing in the image itself and then running "npm start" throws "react-scripts not found". Therefore we will install the dependencies outside the image and then copy them in it during the build process):
```sh
    npm install
```

## Running the system

In the root of the repository run:
```sh
    sudo docker-compose build
```
When the images are finished building run:
```sh
    sudo docker-compose up -d
```
When the command is finished you can navigate to http://localhost:3000/ on your browser.
By default I am creating 2 users one admin and one not. The credentials for the admin user are:
Username: admin
Password: admin_pass
The credentials for the non admin user are:
Username: regular_user
Password: regular_pass

Regular users have access to GET requests but not to anything else. Therefore they can see the data but they cannot delete, create or alter. 

## Project disclaimers
- This system was developed with the purpose of being a demo.
- This is a synchronous API. I am not a fan of python web APIs because, in py opinion, there are better options out there. For production I would prefer to build an async api with express/nextjs.
- This system was not meant to be production ready. Steps to make it production ready:
    - Introduce web server, eg NGINX.
    - Make it scalable (maybe introduce Kubernete and KEDA if needed)
    - Encrypt user credentials. Currently im saving passwords and tokens as strings which is a very bad idea in a production environment.
    - Add env variables in a cloud environment and fetch them from there (eg Azure vault).
    - Mount DB on a volume. Right now the DB data is not persistent.
- I focused on the functionality side of the frontent, not the design or interface. I made sure it is functional and easy to use but I did not put effort into making it pleasantly presentable.
