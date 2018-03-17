# ATT U-verse Automated Router Rebooter

This script allows you to schedule a reboot of your AT&T U-verse router (Tested on 5268AC). Unfortunately the 5268AC router has a bug which causes network latency over time (more so when using Gigabit Fiber).   

# Intallation

- Clone repo to your server
- Schedule "node reboot.js" via crontab, PM2 etc.

# Configuration

Inside reboot.js edit the following two values.

var routerAccessCode = "";  
var routerIP = "192.168.1.254";  
