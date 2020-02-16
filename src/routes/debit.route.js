const express = require("express");
const httpStatusCode = require("http-status-codes");

const debitSchema = require("../models/debit.model");
const {
    getByDate
} = require("../middleware/parseMethod.middleware");

const router = express.Router();

router.post("/api/send/debit", (req, res) => {
    if (!req.body)
        return res.status(httpStatusCode.BAD_REQUEST).json({
            status: httpStatusCode.getStatusText(httpStatusCode.BAD_REQUEST)
        });
    let model = new debitSchema(req.body);
    model
        .save()
        .then(doc => {
            if (!doc || doc.length === 0)
                return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
                    status: httpStatusCode.getStatusText(
                        httpStatusCode.INTERNAL_SERVER_ERROR
                    )
                });
            res.status(httpStatusCode.CREATED).json({
                status: "created",
                doc
            });
        })
        .catch(err => {
            res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
                status: httpStatusCode.getStatusText(
                    httpStatusCode.INTERNAL_SERVER_ERROR
                ),
                error: err
            });
        });
});

router.get("/api/get/debit/all", (req, res) => {
    debitSchema
        .find()
        .then(doc => {
            res.status(httpStatusCode.OK).json({
                result: doc
            });
        })
        .catch(err => {
            res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
                error: err
            });
        });
});

router.get("/api/get/debit/:date", (req, res) => {

    if (!req.params)
        return res.status(httpStatusCode.BAD_REQUEST).json({
            err: httpStatusCode.getStatusText(httpStatusCode.BAD_REQUEST),
        });
    debitSchema
        .find()
        .then(docs => {
            res.status(httpStatusCode.OK).json({
                result: getByDate(docs, req.params.date)
            });
        })
        .catch(err => {
            res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
                error: err.stack
            });
        });
});

module.exports = router;