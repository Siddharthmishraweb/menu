const mongoose = require('mongoose');
const MenuItemSchema = new mongoose.Schema({
   name: String,
   image: String,
   category: String,
   label: String,
   price: Number,
   description: String,
 });
 
 const MenuItem = mongoose.model('MenuItem', MenuItemSchema);


const jsonData = require('./data.json')
mongoose.connect('mongodb://localhost:27017/menu', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

(async () => {
  try {
    await MenuItem.deleteMany({});
    await MenuItem.insertMany(jsonData);
    console.log('Data inserted successfully');
  } catch (error) {
    console.error('Error inserting data:', error);
  } finally {
    mongoose.disconnect();
  }
})();
