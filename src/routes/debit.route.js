const express = require('express');
const debitSchema = require('../models/debit.model');
const httpStatusCode = require('http-status-codes');

const router = express.Router();

router.post('/api/send/debit', (req, res) => {
    if (!req.body) return res.status(httpStatusCode.BAD_REQUEST).json({
        'status': httpStatusCode.getStatusText(httpStatusCode.BAD_REQUEST)
    });
    let model = new debitSchema(req.body);
    model.save()
        .then(doc => {
            if (!doc || doc.length === 0) return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
                'status': httpStatusCode.getStatusText(httpStatusCode.INTERNAL_SERVER_ERROR)
            });
            res.status(httpStatusCode.CREATED).json({
                'status': 'created',
                doc
            })
        })
        .catch(err => {
            res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
                'status': httpStatusCode.getStatusText(httpStatusCode.INTERNAL_SERVER_ERROR),
                'error': err
            })
        })
});

module.exports = router;