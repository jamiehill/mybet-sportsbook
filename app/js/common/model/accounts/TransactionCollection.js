/**
 * Created by ianrotherham on 17/12/2014.
 */
define([
        'backbone',
        'common/model/accounts/TransactionHistoryModel'
    ],
    function (Backbone, TransactionHistoryModel) {
        var TransactionCollection = Backbone.Collection.extend({
            model: TransactionHistoryModel
        });

        return TransactionCollection;
    });
