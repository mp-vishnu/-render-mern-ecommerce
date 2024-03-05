const invoiceTemplate = (order) => {
    return `<!DOCTYPE html>
    <html>
    <head>
        <title>Order Details</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 0;
            }
            .container {
                max-width: 600px;
                margin: auto;
                padding: 20px;
                border: 1px solid #ccc;
            }
            h1 {
                text-align: center;
                margin-bottom: 20px;
            }
            .details {
                margin-bottom: 20px;
            }
            .details p {
                margin: 0;
                padding: 5px 0;
            }
            .details span {
                font-weight: bold;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>Order Details</h1>
            <div class="details">
                <p><span>Name:</span> ${order.name}</p>
                <p><span>Email:</span> ${order.email}</p>
            </div>
        </div>
    </body>
    </html>`;
  };
   module.exports = { invoiceTemplate };
 