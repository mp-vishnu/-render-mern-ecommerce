const { Order } = require("../model/Order");
const { User } = require('../model/User');
const {Cart}=require("../model/Cart");
const sendEmail = require("../utils/mailConfig");
const pdfService = require('../service/pdf-service'); 
//onst {invoiceTemplate}=require('../utils/invoice');
const {invoiceTemplate}=require('../utils/invoiceTemplate')
exports.fetchOrdersByUser = async (req, res) => {
    const { id } = req.user;
    try {
      const orders = await Order.find({ user: id  });
  
      res.status(200).json(orders);
    } catch (err) {
      res.status(400).json(err);
    }
  };
  
  exports.createOrder = async (req, res) => {
    const order = new Order(req.body);
    const {id}=req.user;
    try {
      //console.log("order---",order);
      const doc = await order.save();
       res.status(201).json(doc);
    } catch (err) {
      res.status(400).json(err);
    }
  };
  
  exports.deleteOrder = async (req, res) => {
      const { id } = req.params;
      try {
      const order = await Order.findByIdAndDelete(id);
      res.status(200).json(order);
    } catch (err) {
      res.status(400).json(err);
    }
  };
  
  exports.updateOrder = async (req, res) => {
    const { id } = req.params;
    try {
      const order = await Order.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.status(200).json(order);
    } catch (err) {
      res.status(400).json(err);
    }
  };

  exports.fetchAllOrders = async (req, res) => {
    // sort = {_sort:"price",_order="desc"}
    // pagination = {_page:1,_limit=10}
    let query = Order.find({deleted:{$ne:true}});
    let totalOrdersQuery = Order.find({deleted:{$ne:true}});
  
    
    if (req.query._sort && req.query._order) {
      query = query.sort({ [req.query._sort]: req.query._order });
    }
  
    const totalDocs = await totalOrdersQuery.count().exec();
    //console.log({ totalDocs });
  
    if (req.query._page && req.query._limit) {
      const pageSize = req.query._limit;
      const page = req.query._page;
      query = query.skip(pageSize * (page - 1)).limit(pageSize);
    }
  
    try {
      const docs = await query.exec();
      res.set('X-Total-Count', totalDocs);
      res.status(200).json(docs);
    } catch (err) {
      res.status(400).json(err);
    }
  };
  


  exports.sendInvoice = async (req, res) => {
   
    try {
      const { id } = req.user;
      const user = await User.findById(id);
      console.log(" sendInvoice user ",user)
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found',
        });
      }
      console.log(" sendInvoice user ",user)
  
       const lastOrder = await Order.findOne().sort({ _id: -1 });    
       //console.log("lastOrder",lastOrder)
      const htmlContent=invoiceTemplate(lastOrder);
     const order={
      email:"abc",
      name:"abc"
     }
    //const htmlContent=invoiceTemplate(order);
      console.log(" sendInvoice htmlContent ",htmlContent)
     
      await sendEmail({
        email: user.email,
        subject: 'Your Invoice',
        message: 'Please find your invoice attached.',
        html:htmlContent // Add the attachment option
      });
      //console.log("inside create order mail send successfully");

  
      //console.log(`Invoice sent to ${user.email} successfully`);
      res.status(200).json({
        success: true,
        message: `Invoice sent to ${user.email} successfully`,
      });
    } catch (error) {
      //console.log(error);
      res.status(500).json({
        success: false,
        message: 'Failed to send invoice email',
      });
    }
  };