module.exports=({})=>{
    const today=new Date()
    return`
    <!doctype html>
       <html>
       <head>
         <style>
           body {
             font-family: Arial, sans-serif;
             margin: 0;
             padding: 0;
           }
           h1 {
             color: #333;
             text-align: center;
           }
           table {
             width: 100%;
             border-collapse: collapse;
             margin-bottom: 20px;
           }
           th, td {
             border: 1px solid #ddd;
             padding: 8px;
             text-align: left;
           }
           th {
             background-color: #f2f2f2;
           }
           img {
             max-width: 100px;
             height: auto;
           }
         </style>
       </head>
       <body>
         <h1>Invoice</h1>
         <p>Order ID: ${lastOrder._id}</p>
         <table>
           <thead>
             <tr>
               <th>Name</th>
               <th>Quantity</th>
               <th>Total Amount</th>
               <th>Thumbnail</th>
             </tr>
           </thead>
           <tbody>
             ${items.map(item => `
               <tr>
                 <td>${item.name}</td>
                 <td>${item.quantity}</td>
                 <td>${item.totalAmount}</td>
                 <td><img src="${item.image}" alt="${item.name}"></td>
               </tr>
             `).join('')}
           </tbody>
         </table>
         <p>Thank you for shopping with us!</p>
       </body>
       </html>
     `
}