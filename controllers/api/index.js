const router = require('express').Router();
const userRoutes = require('./userRoutes');
const animalRoutes = require('./animalRoutes');
const categoryRoutes = require('./categoryRoutes');

router.use('/users', userRoutes);
router.use('/animals', animalRoutes);
router.use('/categories', categoryRoutes);

module.exports = router;
