// import React, { useState } from 'react';

// // const CategoryRow = ({ category, items, handlePriceChange }) => {
// //   const [expanded, setExpanded] = useState(false);

// //   return (
// //     <>
// //       <tr onClick={() => setExpanded(!expanded)}>
// //         <td colSpan="5">{category}</td>
// //       </tr>
// //       {expanded &&
// //         items.map((item) => (
// //           <tr key={item.id}>
// //             <td>{item.id}</td>
// //             <td>{item.name}</td>
// //             <td>{item.category}</td>
// //             <td>
// //               <input
// //                 type="number"
// //                 value={item.price}
// //                 onChange={(e) => handlePriceChange(item.id, e.target.value)}
// //               />
// //             </td>
// //             <td>{item.description}</td>
// //           </tr>
// //         ))}
// //     </>
// //   );
// // };

// // export default CategoryRow;


// const CategoryRow = ({ category, items, handlePriceChange }) => {
//    const [expanded, setExpanded] = useState(false);
 
//    return (
//      <>
//        <tr onClick={() => setExpanded(!expanded)}>
//          <td colSpan="6">{category}</td>
//        </tr>
//        {expanded &&
//          items.map((item) => (
//            <tr key={item.id}>
//              <td>{item.id}</td>
//              <td>
//                <img src={item.imageUrl} alt={item.name} style={{ maxWidth: '50px' }} />
//              </td>
//              <td>{item.name}</td>
//              <td>{item.category}</td>
//              <td>
//                <input
//                  type="number"
//                  value={item.price}
//                  onChange={(e) => handlePriceChange(item.id, e.target.value)}
//                />
//              </td>
//              <td>{item.description}</td>
//            </tr>
//          ))}
//      </>
//    );
//  };
 
//  export default CategoryRow;

















// import React, { useState } from 'react';

// const CategoryRow = ({ category, items, handlePriceChange }) => {
// //   console.log("category: ", category , "  ,items: ",items , " ,")
//   const [expanded, setExpanded] = useState(false);
//   const categoryItems = items.filter((item) => item.category === category);
// //   console.log("**********************", categoryItems)
// console.log("Received data in CategoryRow:", category, items);

//   return (
//     <>
//       <tr onClick={() => setExpanded(!expanded)}>
//         <td colSpan="6">{category}</td>
//       </tr>
//       {expanded &&
//         categoryItems.map((item) => (
//           <tr key={item.id}>
//             <td>{item.id}</td>
//             <td>
//               <img src={item.image} alt={item.name} style={{ maxWidth: '50px' }} />
//             </td>
//             <td>{item.name}</td>
//             <td>{item.category}</td>
//             <td>
//               <input
//                 type="number"
//                 value={item.price}
//                 onChange={(e) => handlePriceChange(item.id, e.target.value)}
//               />
//             </td>
//             <td>{item.description}</td>
//           </tr>
//         ))}
//     </>
//   );
// };

// export default CategoryRow;


import React, { useState } from 'react';

const CategoryRow = ({ category, items, handlePriceChange }) => {
   const [expanded, setExpanded] = useState(false);
   console.log("Received data in CategoryRow:", category, items);
 
   return (
     <>
       <tr onClick={() => setExpanded(!expanded)}>
         <td colSpan="6">{category}</td>
       </tr>
       {expanded &&
         items.map((item) => {
           if (item.category === category) {
             return (
               <tr key={item._id}>
                 <td>{item._id}</td>
                 <td>
                   <img src={item.image} alt={item.name} style={{ maxWidth: '50px' }} />
                 </td>
                 <td>{item.name}</td>
                 <td>{item.category}</td>
                 <td>
                   <input
                     type="number"
                     defaultValue={item.price}
                     onChange={(e) => handlePriceChange(item._id, e.target.value)}
                   />
                 </td>
                 <td>{item.description}</td>
               </tr>
             );
           } else {
             return null;
           }
         })}
     </>
   );
 };
 export default CategoryRow;