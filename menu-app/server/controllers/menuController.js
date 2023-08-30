const MenuItem = require('../models/MenuItem');

exports.getMenuItems = async (req, res) => {
  try {
    const menuItems = await MenuItem.find();
    res.json(menuItems);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateMenuItemPrice = async (req, res) => {
  try {
   const { id, newPrice } = req.body;
   const menuItem = await MenuItem.findById(id);
    if (!menuItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }
    menuItem.price = newPrice;
    await menuItem.save();
    res.json({ message: 'Price updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};


exports.updateMultiplePrices = async (req, res) => {
   try {
   const { changedItems } = req.body;
   const data = [];
   for (const item of changedItems) {
      const updatedItem = await MenuItem.findOneAndUpdate(
        { _id: item.id },
        { price: item.newPrice },
        { new: true }
      );
      await updatedItem.save();
      data.push(updatedItem)
    }
 
     res.status(200).json(data);
   } catch (error) {
     console.error('Error updating prices:', error);
     res.status(500).json({ error: 'An error occurred while updating prices.' });
   }
 };
 