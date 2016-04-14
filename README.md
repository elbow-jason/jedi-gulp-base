[![Jedi Unix Master Logo](http://geekmonster.com/img/JediUnixMaster.png)](http://jediunixmaster.com/)

## Base Project for React Redux Web Apps.
This project is loosely based off of the popular MEANjs stack with a similiar directory layout to
separate the frontend React app from the backend Nodejs API. Angular has it's own way of
module inclusion, and for my jedi-webpack-base I used webpack to try it out. I actually like gulp better
and with some help from Jason Goldberger, a friend of mine, we created this base app to help new programmers
to get started. The setup for this app is a little less complicated in that it does not require nginx.

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

