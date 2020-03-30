### Scene Togther
Created March 2020
React learning project

![alt text](screenshots/scene-together2020.png "Screenshot of 'Scene Together' app on desktop")


### To run locally (for development)
1. Git clone this repo 
2. In the project root, create a new file named ```.env.local ```
3. Add this line: 

```REACT_APP_API_KEY_TMDB="abcdefg"```

 where abcdefg is your TMDB API key (Get an account and API key [here](https://developers.themoviedb.org/3/getting-started/introduction).)

4. In Terminal, navigate to project directory and enter: ```npm install```
5. In terminal: ```npm start```

### Deploying
To update the deployed version, make sure Heroku CLI is installed and the Heroku repo is set up as a remote.

heroku buildpacks:set mars/create-react-app should already be set up

All that's left to do is:
``` git push heroku master```

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
