/**
 * Created by jamie on 10/01/15.
 */
define(function () {
    return {

        /*

         {
             "Response": {
                 "status": "ERROR",
                 "sessionToken": "1138:5b6204804d634c89b9918c4726b13456-1-eb92581343cd4d89b79c38203e764259",
                 "body": {
                     "Error": {
                         "code": "NOT_LOGGED_IN",
                         "text": "Internal error occurred..."
                 },
                 "StackTrace": {
                    "cdata": "-"
                 }
             }
         }

         {
            "Error": {
                "value": "User is not logged in : 1138:533b506f735d431aa9cf67c18e681752-1-8b4318ed173e4be1a938bf909118f861",
                "code": "NOT_LOGGED_IN"
            }
         }

         */

        /**
         * @param str
         * @param val
         * @returns {boolean}
         */
        isNotLoggedIn: function(resp){
            if (_.has(resp, 'Response')) {
                var response = resp.Response;
                if (_.has(response.status, 'Error')) {
                    var error = response.body.Error;
                    return error.code == 'NOT_LOGGED_IN';
                }
            }
            if (_.has(resp, 'Error')) {
                var error = resp.Error;
                return error.code == 'NOT_LOGGED_IN';
            }
            return false;
        },


        /**
         * @param resp
         * @returns {*}
         */
        hasError: function(resp) {
            if (_.has(resp, 'Response')) {
                var response = resp.Response;
                return response.status == 'ERROR';
            }

            return _.has(resp, 'Error');
        }
    };
});
