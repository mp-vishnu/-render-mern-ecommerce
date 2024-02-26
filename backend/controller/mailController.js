const sendEmail = require("../utils/sendEmail");
exports.sendMail = async (req, res) => {

    const user= {
      email:req.body.email,
      name:req.body.userName,
      phone:req.body.phone
    }
    try {
      await sendEmail({
        //email: user.email,
        email:"athulraj@weamse.in",
        subject: 'Confirmation mail',
        message:`Name : ${user.name} \nEmail : ${user.email} \nPhone : ${user.phone}`,
      });
      res.status(200).json({
        success: true,
        message: `Email sent to ${user.email} successfully`,
      });
    } catch (error) {
     console.log(error);
    }}