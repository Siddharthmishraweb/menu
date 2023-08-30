import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button } from 'react-bootstrap';
import CategoryRow from './CategoryRow'; 
const App = () => {
  const [data, setData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [categorizedData, setCategorizedData] = useState([]);
  const [changedItems, setChangedItems] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('/api/menu');
      setData(response.data);
      setOriginalData(response.data);

      const categories = [...new Set(response.data.map((item) => item.category))];
      const categorized = categories.map((category) => {
        return {
          category,
          items: response.data.filter((item) => item.category === category),
        };
      });
      setCategorizedData(categorized);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handlePriceChange = (id, newPrice) => {
    const updatedData = data.map((item) => {
      if (item._id === id) {
        return { ...item, price: (newPrice) };
      }
      return item;
    });
    console.log('Updated data: ', updatedData)
  
    setData(updatedData);
    updateCategorizedData(updatedData);

    const originalItem1 = originalData.find((item) => item._id === id);
    console.log("Original item:", originalItem1);
    console.log("Parsed newPrice:", parseFloat(newPrice));

    const updatedCategories = categorizedData.map((categoryData) => {
      return {
        category: categoryData.category,
        items: updatedData.filter((item) => item.category === categoryData.category),
      };
    });
    setCategorizedData(updatedCategories);
  
    const originalItem = originalData.find((item) => item._id === id);
    if (originalItem && originalItem.price !== parseFloat(newPrice)) {
      setChangedItems((prevItems) => {
        if (!prevItems.some((item) => item._id === id)) {
          console.log("prevItems&&&&&&&&&",[...prevItems, { id, newPrice: parseFloat(newPrice) }])
          return [...prevItems, { id, newPrice: parseFloat(newPrice) }];
        }
        return prevItems.map((item) =>
          item._id === id ? { id, newPrice: parseFloat(newPrice) } : item
        );
      });
    } else {
      setChangedItems((prevItems) =>
        prevItems.filter((item) => item._id !== id)
      );
    }
  };

  const updateCategorizedData = (updatedData) => {
    const updatedCategories = [...new Set(updatedData.map((item) => item.category))];
    const categorized = updatedCategories.map((category) => {
      return {
        category,
        items: updatedData.filter((item) => item.category === category),
      };
    });
    setCategorizedData(categorized);
  };
  
  const handleReset = () => {
    setData(originalData);
    setChangedItems([]);
  };
  
  const handleSave = async () => {
    try {
      const itemsToSave = changedItems.map((item) => {
        const originalItem = originalData.find((dataItem) => dataItem._id === item.id);
        return {
          id: item.id,
          newPrice: item.newPrice,
          originalPrice: originalItem.price,
        };
      });
      if (itemsToSave.length > 0) {
        await axios.put('/api/menu/update-multiple-prices', { changedItems: itemsToSave });
        fetchData();
        setChangedItems([]);
      } else {
        console.log('No changes to save.');
      }
    } catch (error) {
      console.error('Error saving changes:', error);
    }
  };
  
  const handleSortByPrice = () => {
    console.log("Sorting...");
    const sortedCategorizedData = categorizedData.map((categoryData) => {
      const sortedItems = [...categoryData.items];
      sortedItems.sort((a, b) => a.price - b.price);
      return {
        category: categoryData.category,
        items: sortedItems,
      };
    });
    setCategorizedData(sortedCategorizedData);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '20px' }}>
        <Button
          onClick={handleSave}
          style={{
            width:'30%',
            backgroundColor: '#333',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Save
        </Button>
        <Button
          onClick={handleReset}
          style={{
            width:'30%',
            backgroundColor: '#777',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Reset
        </Button>
        <Button
          onClick={handleSortByPrice}
          style={{
            width:'30%',
            backgroundColor: '#555',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Sort by Price
        </Button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {
          categorizedData.map((categoryData) => (
            <CategoryRow
              key={categoryData.category}
              category={categoryData.category}
              items={categoryData.items}
              handlePriceChange={handlePriceChange}
            />
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default App;