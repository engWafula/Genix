import nodemailer from "nodemailer"

export default async function sendMail(email,order,name){
    try {
        const transporter = nodemailer.createTransport({
            pool:true,
            host: 'smtp.gmail.com',
            port: 465, 
            secure: true,
            auth: {
              user: 'ssegawaamuri@gmail.com',
              pass: 'azhx zkjb macb xxmx'
            },
            tls:{
              rejectUnauthorised:false
            },
            ignoreTLS: true
          });
          const app =  "ssegawaamuri@gmail.com"

          const orderItemsHtml = order.cartProducts.map(item => `
          <tr>
            <td>${item.name}</td>
            <td>${item.sizes.length > 0 ? item.sizes[0].name : 'N/A'}</td>
            <td> UGX ${item.basePrice}</td>
          </tr>
        `).join('');

          const mailOptions = {
            from: `${app} Genix Pastry and Restaurant`, 
            to: email,
            subject: "You have made an order to Genix Pastry and Restaurant",
            html: `<html lang="en">

            <head>
              <meta charset="UTF-8">
              <meta http-equiv="X-UA-Compatible" content="IE=edge">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Order Confirmation</title>
              <style>
                body {
                  font-family: 'Arial', sans-serif;
                  margin: 0;
                  padding: 0;
                  background-color: #f4f4f4;
                }
            
                .container {
                  max-width: 600px;
                  margin: 20px auto;
                  padding: 20px;
                  background-color: #fff;
                  border-radius: 8px;
                  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }
            
                h1 {
                  color: #333;
                  text-align: center;
                }
            
                p {
                  color: #555;
                  line-height: 1.6;
                }
            
                table {
                  width: 100%;
                  border-collapse: collapse;
                  margin-top: 20px;
                }
            
                th,
                td {
                  border: 1px solid #ddd;
                  padding: 10px;
                  text-align: left;
                }
            
                th {
                  background-color: #f2f2f2;
                }
              </style>
            </head>
            
            <body>
              <div class="container">
                <h1>Your Order Confirmation</h1>
                <p>Dear ${name},</p>
                <p>Thank you for placing an order with Genix Pastry and Restaurant. Below are the details of your order:</p>
            
                <table>
                  <thead>
                    <tr>
                      <th>Item</th>
                      <th>Quantity</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                  ${orderItemsHtml}
                  </tbody>
                </table>
                <p>Order Id: ${order._id}</p>
                <p>Total Amount: UGX ${calculateTotal(order.cartProducts)}</p>
                <p>Delivery Address: ${order.streetAddress}</p>
                <p>Pay cash on delivery or pay via Airtel money on 0704154578</p>

                <p>Thank you for choosing Genix Pastry and Restaurant. We hope you enjoy your meal!</p>
            
                <p>Best regards,<br>Genix Pastry and Restaurant</p>
              </div>
            </body>
            
            </html>`

          };

          const res = await  transporter.sendMail(mailOptions)
          console.log(res,"amammamama")
    } catch (error) {
        
    }
}


function calculateTotal(cartProducts) {
  return cartProducts.reduce((total, item) => total + item.basePrice, 0);
}