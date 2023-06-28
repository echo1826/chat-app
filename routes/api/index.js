const router = require('express').Router();

const messageRoutes = require('./messageRoutes');
const userRoutes = require('./userRoutes');

router.use('/user', userRoutes);
router.use('/message', messageRoutes);

module.exports = router;