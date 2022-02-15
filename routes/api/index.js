const router = require('express').Router();
const locationRoutes = require('./locationsRoutes');
const travellersRoutes = require('./travellersRoutes');
const tripsRoutes = require('./tripsRoutes');

router.use('/location', locationRoutes);
router.use('/travellers', travellersRoutes);
router.use('/trips', tripsRoutes);

module.exports = router;
