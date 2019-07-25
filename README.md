# Node.JS Sample HTTP programs

--------------------------------------------------------------------------------
Sample programs.

echoserver.js : Echo received HTTP information as is.

webserver.js : sample basic HTTP webserver that using Express.

docroot : sample static website with Ajax sample.

httpcli.js : command line HTTP client.

cli.js : basic command line interactive program.

clifull.js : command line interactive program.

--------------------------------------------------------------------------------

## Create an Heroku App that runs a Node webserver and uses PHP programs.

+ Create the Heroku app with the require buildpacks.
+ Have the main one that is to run the webserver, the last buildpack. In my case, Node.
````
heroku apps:create tighttp
heroku buildpacks:add --index 1 heroku/php
heroku buildpacks:add --index 2 heroku/nodejs
heroku buildpacks
````

For deployment to Heroku, the GitHub repository requires the following configuration files in the top directory.
+ [composer.json](composer.json) : to have Heroku install the PHP buildpack during deployment.
+ [Procfile](Procfile) : to tell the Heroku deployment process to run the Node program webserver command: node webserver.js.
+ [app.json](app.json) : describe the application.
+ [package.json](package.json) : package information.
````
$ cat composer.json
{}

$ cat Procfile
web: node webserver.js

$ cat app.json
{
    "name": "Sample Node Web Server Application",
    "description": "This application is a sample application.",
    "repository": "https://github.com/tigerfarm/tighttp",
    "logo": "http://tigerfarmpress.com/images/topImgLeft.jpg",
    "keywords": ["node", "express", "heroku"]
}

$ cat package.json
{
  "name": "nodewebserver",
...
}
````

+ Deploy the repository to Heroku.
````
git push heroku master
````
+ Test. My Node program (webserver.js) is running and PHP is available.
The application confirms this.

+ Optionally, log into the Heroku app and list the buildpacks.
````
$ heroku run /bin/bash
Running /bin/bash on : tighttp... up, run.3791 (Free)
$ ls -l .heroku/
total 12
drwx------  2 u48201 dyno 4096 Apr 30 20:45 heroku-nodejs-plugin
drwx------  6 u48201 dyno 4096 Jul 25 23:23 node
drwx------ 14 u48201 dyno 4096 Jul 25 23:23 php
$ exit
````

+ If changes are made, do the following to update the repository and deploy to Heroku.
````
git add .
git commit -am "updates"
git push -u origin master
git push heroku master
````
--------------------------------------------------------------------------------

Cheers...
