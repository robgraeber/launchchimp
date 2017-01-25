(function() {
    'use strict';

    var requestLib = require('request-promise');
    var bunyan = require('bunyan');
    var defaults = require('./defaults');
    var request = requestLib.defaults({
        headers: {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2227.1 Safari/537.36'
        },
        followAllRedirects: true,
        jar: true
    });

    var LOGGER     = bunyan.createLogger({name: 'Launchchimp.Launchrock'});
    var AUTH_URL   = 'https://www.launchrock.com/auth/login';
    var CSV_URL = 'https://www.launchrock.com/api/site-manager/sites/[[PROJECT_ID]]/users/export?fullName=&email=&signupDateRange=ALL&signupDateRangeStart=&signupDateRangeEnd=&regionKey=&countryKey=&orderByField=createdAt&orderByDirection=DESC&isSubscribed=true&limit=9999999&offset=0';

    var authenticate = function (email, password, projectId) {
        LOGGER.info('LOGGING IN');

        return request
            .post(AUTH_URL, {
                form: {
                    email: email,
                    password: password
                },
                resolveWithFullResponse: true,
                simple: false
            }).then(function (rsp) {
                var csvUrl = CSV_URL.replace('[[PROJECT_ID]]', projectId)
                LOGGER.info('Getting csv from: ' + csvUrl);

                return request.get(csvUrl);
            });
    };

    module.exports = {
        fetchUsers: function (lrOpts) {
            return authenticate(lrOpts.email, lrOpts.password, lrOpts.project);
        }
    };

})();
