# ATT U-verse Automated Router Rebooter

This script allows you to schedule a reboot of your AT&T U-verse router (Tested on 5268AC). Unfortunately the 5268AC router has a bug which causes network latency over time (more so when using Gigabit Fiber).  It does a broadband reboot (which is supposedly sufficient according to original author of this repo). 

# Installation

- Clone repo to your server
- Schedule "node reboot.js" via crontab, PM2 etc.

npm install  
node reboot.js  "<router access code>"

# Configuration

Inside reboot.js you may need to edit this value:

var routerIP = "192.168.1.254";  
