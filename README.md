#How to run the project with DOCKER

1. In a root directory run a command - docker-compose up --build
2. Open port localhost:4200
3. Stopping a project run a command - docker-compose down


#STEPS TO RUN PROJECT WITHOUT DOCKER

#CHANGE IN ./client/proxy.conf.json - THE TARGET TO BE "http://localhost:3000"

# How to run the client part
1. In client directory run a command - npm install
2. In the same directory, starting a client part with command - npm start
3. port - localhost:4200

# How to run the api part
1. In api directory run a command - npm install
2. In the same directory, starting a api part with command - npm start
3. port - localhost:3000 (proxy)


# FUNCTIONALITIES
1. Login and registration of users
2. Saving user credentials in database (mongodb) - www.mlab.com
3. Showing of all pinned vmware repositories 
4. Filtering by "name" of pinned repos and paginate them (pinned repos and details/commits pages);
5. Detailed page with recent commits and repo info
6. Responsive design



