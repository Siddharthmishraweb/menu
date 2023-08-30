const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menuController');

router.get('/', menuController.getMenuItems);

router.put('/update-price', menuController.updateMenuItemPrice);

router.put('/update-multiple-prices', menuController.updateMultiplePrices);


module.exports = router;
