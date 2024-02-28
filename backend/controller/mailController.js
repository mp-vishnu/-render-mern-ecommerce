const sendEmail = require("../utils/mailConfig");
const { User } = require("../model/User");
const crypto = require("crypto");
const { sanitizeUser } = require("../middleware/auth");
const SECRET_KEY = "SECRET_KEY";
const jwt = require("jsonwebtoken");
exports.sendMail = async (req, res) => {
  const email  = req.body;
  console.log("email in mailcontroller before sending mail ",email.data.email);
  try {
      // Find user by email
      const user = await User.findOne({ email:email.data.email });
      console.log("user",user);
      // If user not found, send response
      if (!user) {
          return res.status(404).json({
              success: false,
              message: 'User not found',
          });
      }
      const token = jwt.sign(sanitizeUser(user), SECRET_KEY,{expiresIn:"1d"});
      const resetPasswordUrl = `http://localhost:3000/reset-password/${user.id}/${token}`;  


      const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;

      // Send email
      await sendEmail({
          email: user.email,
          subject: 'Reset Password',
          message
      });
      console.log(`Email sent to ${user.email} successfully`);
      // Send success response
      res.status(200).json({
          success: true,
          message: `Email sent to ${user.email} successfully`,
      });
  } catch (error) {
      console.log(error);
      res.status(500).json({
          success: false,
          message: 'Failed to send email',
      });
  }
};

exports.resetPassword = async (req, res) => {
  const { id, token } = req.params;
  const { newPassword } = req.body;
 console.log("id token password ",id,token,newPassword)

 try {
  // Verify token
  jwt.verify(token, SECRET_KEY, async (err, decoded) => {
    if (err) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    // Check if decoded ID matches the ID in params
    if (decoded.id !== id) {
      return res.status(400).json({ message: 'Invalid token' });
    }

    // Find user by ID
    const user = await User.findById(id);
    console.log("user before change",user);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Hash the new password
    //const salt = crypto.randomBytes(16);
    console.log("user.salt!!!!",user,user.salt);
    const salt=user.salt;
    crypto.pbkdf2(
      newPassword,
      salt,
      310000,
      32,
      'sha256',
      async (err, hashedPassword) => {
        if (err) {
          return res.status(500).json({ message: 'Internal Server Error' });
        }
        // Save new password and salt
        user.password = hashedPassword;
        user.salt = salt;
        await user.save();
        res.status(200).json({ message: 'Password reset successfully' });
      }
    );
  });
} catch (error) {
  console.log(error);
  res.status(500).json({ message: 'Internal Server Error' });
}

};
