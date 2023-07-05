# CMPT372_Project


# Local Development Setup
## Using Dockerized MySQL server
- ### Initial setup steps 
    - **If you do not have 'mysql/mysql-server' container in docker
    
    <br/>
    
    Set up for docker Image for MySQL (*Done once*):
        
        docker pull mysql/mysql-server:latest

    To test for docker database connection success: 
        
        http://127.0.0.1:8080/test
        
<br/>


# Run Local Development
## Commands:
<br/>

Run ["docker-compose.yml"]:
    
    docker-compose up -d

Stop Containers

    docker-compose down 
    
Remove all containers

    docker rm -f $(docker ps -aq)
    
    
<br/>
<br/>

----
----

<br/>
<br/>

# Production Deployment (Backend)
## Deploying backend implementation (with mySQL integration) to Cloud Run steps:


1. Build docker file to google container repository

        gcloud builds submit --tag gcr.io/cmpt372-project-391818/restaurant-planner-app-image

2. To deploy to cloud run:
        
        gcloud deploy --image gcr.io/cmpt372-project-391818/restaurant-planner-app-image
    
- To update docker image in google container repository to cloud run:
    
    1. Build docker file to google container repository (step 1)
    2. Go to cloud run instance 
        - Edit to new uploaded gcr.io/.... image
        - Save
    
    
