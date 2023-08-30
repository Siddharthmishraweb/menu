const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
   name: String,
   image: String,
   category: String,
   label: String,
   price: Number,
   description: String,
});

const MenuItem = mongoose.model('MenuItem', menuItemSchema);

module.exports = MenuItem;
