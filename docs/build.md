## build & deploy
1. npm run build:ssr
2. Move the dist over to your server
3. install PM2
    npm install pm2 -g
On your server, use PM2 to run the server bundled app
pm2 start dist/server.js
If you're using Nginx, or other web servers, make sure to redirect requests to the port that the app started with PM2 is listening on.


 - Congratulations! Your certificate and chain have been saved at:
   /etc/letsencrypt/live/dashboard.gpshandle.com/fullchain.pem
   Your key file has been saved at:
   /etc/letsencrypt/live/dashboard.gpshandle.com/privkey.pem
   Your cert will expire on 2019-12-04. To obtain a new or tweaked
   version of this certificate in the future, simply run certbot
   again. To non-interactively renew *all* of your certificates, run
   "certbot renew"
