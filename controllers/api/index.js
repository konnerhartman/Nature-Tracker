const router = require('express').Router();
const userRoutes = require('./userRoutes');
const projectRoutes = require('./natureRoutes');

router.use('/users', userRoutes);
router.use('/nature', projectRoutes);

module.exports = router;
