[![Jedi Unix Master Logo](http://geekmonster.com/img/JediUnixMaster.png)](http://jediunixmaster.com/)

## Base Project for React Redux Web Apps.
This project is loosely based off of the popular MEANjs stack with a similiar directory layout to
separate the frontend React app from the backend Nodejs API. Since Angular has it's own way of
module inclusion, for the react frontend I use webpack. This means the setup is somewhat more complicated
for development.

It currently has Database connectivity and Authentication for users. I develop on a macbook laptop,
so the following instructions are for setting up this project on a mac. I used Homebrew to install
MySQL and after that was done I used the following commands:

```
mysql -uroot

CREATE USER 'jedi'@'localhost' identified by 'maytheforcebewithyou';

GRANT ALL PRIVILEGES ON *.* to 'jedi'@'localhost';

FLUSH PRIVILEGES;

CREATE DATABASE jedi_gulp_base_development;

exit
```


To get the webpack hot server working I also used Homebrew to install nginx.

```
brew update
brew install nginx
ln -sfv /usr/local/opt/mysql/*.plist ~/Library/LaunchAgents
launchctl load ~/Library/LaunchAgents/homebrew.mxcl.mysql.plist
```
My url names for redirection in the server.js were long and nginx complained with an error:
`
nginx: [emerg] could not build the server_names_hash, you should increase server_names_hash_bucket_size: 64
`
so in the /usr/local/etc/nginx/nginx.conf file after the 'http {' line add this line:

`
server_names_hash_bucket_size 128;
`

Although the error said 64, my urls were still to long so I had to use 128. Also while your editing
nginx.conf, add this line at the end before the last '}'

`

The final thing that needs to be taking care of is the hosts file in the root etc directory. You will need
admin privileges to edit that file by enterring the password for the machine:

`
sudo vi /etc/host
`

and add this line at the end:

`
127.0.0.1       personal.hot.jedi_gulp_base.jediunixmaster.com
`

Now all you should need to do is have nginx reload it's config scripts:

`
sudo nginx -s reload
`

And make sure all the npm packages are installed:

`
npm install
`

Now to start the app:

`
npm run start-dev
`


Open a browser and:

`
localhost:8400
`



Hopefully this helps somebody.

Steve

