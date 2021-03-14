**Frontend**

1. Go to vercel => New project
2. Import the repository with your Next app (should give the permission)
3. Choose the folder with next app (frontend)
4. Pick framework preset as Next.js => Deploy
5. Add all required (prod) env variables from .env.example in settings on vercel

**Strapi**

1. Go to `https://dashboard.heroku.com/apps` => New => Create new app
2. Choose region and app name
3. Go to Deploy => Deployment method => Github
4. Choose the same repository as for frontend => connect
5. Set 4 Heroku config vars (in settings tab):
6. `DATABASE_URL` = `mysql://USERNAME:PASSWORD@HOST:3306/DATABASE_NAME` + Add amazon IP ( %.amazonaws.com ) to mysql database at provider site to allow connection from heroku servers. (`https://wiki.mydevil.net/MySQL`)
7. `HEROKU_URL` = `https://appname.herokuapp.com/`
8. `NODE_ENV` = `production`
9. `PROJECT_PATH` = `cms` (it is a subfolder name from the repository, where the heroku app is situated)
10. Set a Heroku Buildpack that will deploy the PROJECT_PATH folder :
    inside the Settings tab, you need to add a Buildpack that will tell heroku to look for your folder instead of deploying the repo root. Enter this url to add buildpack
    `https://github.com/javusScriptus/subdir-heroku-buildpack.git` and make sure this is at the top of the buildpack chain (drag the lines on the left to make it above any other buildpacks you have added.
11. If there is not "heroku/nodejs" buildpack, then add "heroku/nodejs" pack and put it at the bottom of buildpacks
12. Enable auto deploy in "Deploy" section

**Possible errors**

1. In develop mode (local) check and change if necessary values from /cms/config/database.js
2. Deploy apps
