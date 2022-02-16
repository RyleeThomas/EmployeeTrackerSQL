//Central hub to pull them all together
const express = require('express');
const router = express.Router();

router.use(require('./departmentRoutes'));
router.use(require('./positionRoutes'));
router.use(require('./employeeRoutes'));

module.exports = router;