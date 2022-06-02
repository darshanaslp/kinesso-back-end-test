const router = require('express').Router();

const controllers = require('../controllers');

//router for payslip
router.post('/payslip', controllers.payslip.handler);

module.exports = router;
