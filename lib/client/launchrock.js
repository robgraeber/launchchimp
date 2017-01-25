(function() {
    'use strict';

    var request = require('request-promise');
    var bunyan = require('bunyan');
    var defaults = require('./defaults');

    var LOGGER     = bunyan.createLogger({name: 'Launchchimp.Launchrock'});
    var AUTH_URL   = 'https://www.launchrock.com/auth/login';
    var CSV_URL = 'https://www.launchrock.com/api/site-manager/sites/[[PROJECT_ID]]/users/export?fullName=&email=&signupDateRange=ALL&signupDateRangeStart=&signupDateRangeEnd=&regionKey=&countryKey=&orderByField=createdAt&orderByDirection=DESC&isSubscribed=&limit=9999999&offset=0';

    var authenticate = function (email, password, projectId) {
        LOGGER.info('LOGGING IN');

        return request
            .post(AUTH_URL, {
                form: {
                    email: email,
                    password: password
                },
                headers: defaults.headers,
                resolveWithFullResponse: true,
                simple: false,
                jar: true
            }).then(function () {
                return request.get(CSV_URL.replace('[[PROJECT_ID]]', projectId))
            });
    };

    module.exports = {
        fetchUsers: function (lrOpts) {
            return authenticate(lrOpts.email, lrOpts.password, lrOpts.project);
        }
    };

})();
