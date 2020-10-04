/* Fill in the access code and your router IP below */
var routerAccessCode = process.argv[2];
var routerIP = "192.168.1.254";
/****************************************************/

var querystring = require('querystring');
var request = require('request');

function RebootRouter() {

    var form = {
        "ADM_PASSWORD" : routerAccessCode,
        "NEXTPAGE" : 'A_0_0'
    };

    var formData = querystring.stringify(form);
    var contentLength = formData.length;
    var cookieJar = request.jar();
    request({

        headers: {
            'Content-Length': contentLength,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        uri: 'http://' + routerIP + '/xslt?PAGE=login_post',
        jar: cookieJar,
        body: formData,
        method: 'POST'
    }, function (err, res, body) {

        if (body===undefined) {
            console.log(new Date(), 'Did not detect your gateway, please make sure you have specified your router access code + router IP using routerIP on lines 3 & 4 inside reboot.js')
            return;
        }

        var nonce=body.substr(body.indexOf("NONCE")).toLowerCase();
        nonce=nonce.substr(nonce.indexOf("value=")+7);
        nonce=nonce.substr(0,nonce.indexOf("\""));

        doRestart(cookieJar,nonce);

    });
}

function LoginRouter(counter) {

    var form = {
        "ADM_PASSWORD" : routerAccessCode,
        "NEXTPAGE" : 'A_0_0'
    };

    var formData = querystring.stringify(form);
    var contentLength = formData.length;
    var cookieJar = request.jar();
    request({

        headers: {
            'Content-Length': contentLength,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        uri: 'http://' + routerIP + '/xslt?PAGE=login_post',
        jar: cookieJar,
        body: formData,
        method: 'POST'
    }, function (err, res, body) {

        //if (body===undefined) {
            //console.log('Did not detect your gateway, please make sure you have specified your router access code + router IP using routerIP on lines 3 & 4 inside reboot.js')
            //return;
        //}

        if (counter < 30) LoginRouter(counter + 1);

    });
}



function doRestart(cookieJar, nonce){
    //console.log('nonce is:', nonce);

    // RESET_BB = broadband
    // RESET_IP = ip
    // RESTART = system
    var form = {
        "NONCE": nonce,
        "THISPAGE": 'C_5_7',
        "RESTART": 'Reset',
        //"RESET_BB": 'Reset',
        "BB_TYPE": "DHCP",
        "WIFI0_EXIST": "TRUE",
        //"NEXTPAGE" : 'A_0_0_POST',
        //"CMSKICK": ""
    };
    var formData = querystring.stringify(form);
    var contentLength = formData.length;

    request({
        headers: {
            'Content-Length': contentLength,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        uri: 'http://' + routerIP + '/xslt?PAGE=C_5_7_POST&NEXTPAGE=C_5_7_POST',
        jar: cookieJar,
        body: formData,
        method: 'POST'
    }, function (err, res, body) {

        if (err) {
            console.log(new Date(), 'Failed Reboot.');
            return;
        }

        console.log(new Date(), 'Router Rebooting.');

        //LoginRouter(0);

    });

}

RebootRouter();
