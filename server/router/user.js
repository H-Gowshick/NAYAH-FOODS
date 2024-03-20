const express = require("express");
const router = express.Router();
const user = require("../model/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
// const authenticate = require("../authenticator");
dotenv = require("dotenv");
dotenv.config();

const keysecret = process.env.SECRET_KEY;

router.post("/signUp", async (req, res) => {
  const { userData } = req.body;
  // console.log(userData.email);

  const Email = userData.email;
  const Password = await bcrypt.hash(userData.password, 12);
  // console.log(Password)

  try {
    const preuser = await user.findOne({ email: Email, isVerified: true });
    // console.log(preuser);

    if (preuser) {
      return res
        .status(422)
        .json({ status: 422, message: "This mail-Id is already exist" });
    } else {
      const usercheck = await user.findOne({ email: Email });
      // console.log(usercheck);

      let storeData;
      if (usercheck) {
        storeData = await user.findOneAndUpdate(
          { email: Email },
          { password: Password }
        );
        console.log("Data updated");
      } else {
        const finalUser = new user({
          email: Email,
          password: Password,
        });
        console.log(finalUser);
        storeData = await finalUser.save();
      }
      // console.log(storeData)
      // Create a JWT token with user's email as payload
      const token = jwt.sign({ Email }, keysecret, { expiresIn: "1h" });
      // console.log(token,storeData);

      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        service: "gmail",
        secure: true,
        auth: {
          user: "tnxtindia22@gmail.com",
          pass: "ydrdenxjugfacfqg",
        },
      });

      const link = `http://localhost:${process.env.PORT}/api/verify/${token}`;
      // Compose the email
      // console.log(link);

      const mailOptions = {
        from: "tnxtindia22@gmail.com",
        to: Email,
        subject: "Email Verification",
        html: `<body style="font-family: Georgia, 'Times New Roman', Times, serif;" >
            <div style="background-color: rgb(232, 236, 240);"> 
                <center style="margin-top: 10%; padding-bottom: 5%;">
        
                    <div style="background-color: #C10A49; padding: 1%;margin-bottom: 15%;"> 
                        
                    </div>
                    <div style="margin: 10%; background-color: rgb(252, 254, 255); padding-top: 8%; padding-bottom:8%;">
                        <h3>Hi! ${Email}</h3><br>
                        <h5>Please,Verify Your E-mail Address By Clicking the below button</h5><br>
                        <a href ='${link}'><button style = "background-color: darkgreen;color: blanchedalmond; border:none ; border-radius: 10px; padding: 5px 20px; ">Verify</button></a>   
                        <p><b>Note:</b> For kind information Your Data will be Succure! </P>   
                    </div>                   
                </center>
            </div>            
        </body> `,
      };

      const mailStatus = await transporter.sendMail(mailOptions);
      // console.log(mailStatus);

      if (mailStatus && storeData) {
        // console.log(storeData);
        console.log("Mail send successfully!");
        return res
          .status(201)
          .json({ status: 201, message: "Mail send successfully!" });
      } else {
        // console.log(storeData);
        return res
          .status(203)
          .json({ status: 203, message: "Give valid mail-Id" });
      }
    }
  } catch (error) {
    console.log("catch block error", error);
    return res.status(424).json({ status: 424 });
  }
});

// router.post("/signUp", async (req, res) => {

//     const { userData } = req.body;
//     // console.log(userData.email);

//     const Email = userData.email;
//     const Password = await bcrypt.hash(userData.password, 12);
//     // console.log(Password)

//     try {
//         const preuser = await user.findOne({ email: Email, isVerified: true });
//         // console.log(preuser);

//         if (preuser) {
//             return res.status(422).json({ status: 422, message: "This mail-Id is already exist" })
//         } else {
//             const usercheck = await user.findOne({ email: Email });
//             // console.log(usercheck);

//             let storeData
//             if (usercheck) {
//                 storeData = await user.findOneAndUpdate({ email: Email }, { password: Password });
//                 console.log("Data updated");
//             }
//             else {
//                 const finalUser = new user({
//                     email: Email, password: Password,
//                 });
//                 console.log(finalUser)
//                 storeData = await finalUser.save();
//             }
//             console.log(storeData)
//             // Create a JWT token with user's email as payload
//             const token = jwt.sign({ Email }, keysecret, { expiresIn: '1h' });
//             console.log(token, storeData);

//             const transporter = nodemailer.createTransport({
//                 host: 'smtp.gmail.com',
//                 service: "gmail",
//                 secure: true,
//                 auth: {
//                     // user: "gnanaprahaasamsr@gmail.com",
//                     // pass: "tpaqilnmzvqyxsqu",
//                     user: "tnxtindia22@gmail.com",
//                     pass: "ydrdenxjugfacfqg",
//                 },
//             });

//             const link = `http://localhost:${process.env.PORT}/api/verify/${token}`;
//             console.log(link);

//             const mailOptions = {
//                 from: "tnxtindia22@gmail.com",
//                 to: Email,
//                 subject: 'Email Verification',
//                 html: `<body style="font-family: Georgia, 'Times New Roman', Times, serif;" >
//             <div style="background-color: rgb(232, 236, 240);">
//                 <center style="margin-top: 10%; padding-bottom: 5%;">

//                     <div style="background-color: #C10A49; padding: 1%;margin-bottom: 15%;">

//                     </div>
//                     <div style="margin: 10%; background-color: rgb(252, 254, 255); padding-top: 8%; padding-bottom:8%;">
//                         <h3>Hi! ${Email}</h3><br>
//                         <h5>Please,Verify Your E-mail Address By Clicking the below button</h5><br>
//                         <a href ='${link}'><button style = "background-color: darkgreen;color: blanchedalmond; border:none ; border-radius: 10px; padding: 5px 20px; ">Verify</button></a>
//                         <p><b>Note:</b> For kind information Your Data will be Succure! </P>
//                     </div>
//                 </center>
//             </div>
//         </body> `,
//             };

//             const mailStatus = await transporter.sendMail(mailOptions);
//             console.log(mailStatus );

//             if (mailStatus && storeData) {
//                 // console.log(storeData);
//                 console.log("Mail send successfully!");
//                 return res.status(201).json({ status: 201, message: "Mail send successfully!" })
//             }
//             else {
//                 // console.log(storeData);
//                 return res.status(203).json({ status: 203, message: "Give valid mail-Id" })
//             }

//         }

//     } catch (error) {
//         return res.status(424).json({ status: 424 });
//         console.log("catch block error", error);
//     }

// });

router.get("/verify/:token", async (req, res) => {
  const { token } = req.params;
  try {
    // Verify the JWT token
    const decoded = jwt.verify(token, keysecret);
    if (decoded) {
      // Update the user's email status as verified in MongoDB
      const email = decoded.Email;
      // console.log(email);
      const verifiedStatus = await user.findOneAndUpdate(
        { email },
        { isVerified: true }
      );

      if (verifiedStatus) {
        res.redirect(`http://localhost:3000`);
        console.log("Mail verfied succesfully"); // Redirect to a success page on the frontend
      } else {
        console.log("Mail Not verfied!");
      }
    }
  } catch (error) {
    console.error("Error verifying email:", error);
  }
});

router.post("/signIn", async (req, res) => {
  const { userData } = req.body;
  // console.log(userData.email);

  const Email = userData.email;
  const Password = userData.password;
  // console.log(Email,Password);

  try {
    const userValid = await user.findOne({ email: Email, isVerified: true });

    if (userValid) {
      // console.log(userValid.password);
      const isMatch = await bcrypt.compare(Password, userValid.password);
      // console.log(isMatch);
      if (!isMatch) {
        res
          .status(401)
          .json({ status: 401, message: "Invalid Email-Id or Password" });
      } else {
        const token = await userValid.generateAuthtoken();
        // console.log(token);
        // cookiegenerate
        res.cookie("usertoken", token, {
          secure: true,
        });
        const Data = userValid.email;
        const Id = userValid._id;
        res
          .status(201)
          .json({ status: 201, data: Data, userId: Id, Token: token });
      }
    } else {
      res.status(406).json({ status: 406, message: " Email-Id not exists!" });
    }
  } catch (error) {
    res.status(500).json(error);
    console.log("catch block");
  }
});

// user valid
router.get("/validuser", async (req, res) => {
  try {
    const token = req.headers.authorization;
    const verifytoken = jwt.verify(token, keysecret);
    // console.log(verifytoken);
    const rootUser = await user.findOne({ _id: verifytoken._id });
    if (rootUser) {
      return res.status(201).json({ status: 201, data: rootUser });
    } else {
      return res
        .status(401)
        .json({ status: 401, message: "Unauthorized no token provide" });
    }
    // const ValidUserOne = await user.findOne({_id:req.userId});
  } catch (error) {
    res.status(500).json({ status: 500, error });
  }
});

// // user logout

router.get("/logout", async (req, res) => {
  try {
    const token = req.headers.authorization;
    // console.log(token);

    const verifytoken = jwt.verify(token, keysecret);
    // console.log(verifytoken);
    const rootUser = await user.findOne({ _id: verifytoken._id });
    if (rootUser) {
      const rootUserStatus = rootUser.tokens.filter((currentElement) => {
        return currentElement.token === token;
      });
      // console.log(rootUserStatus);
      if (rootUserStatus) {
        res.clearCookie("usertoken", { path: "/" });
      }
      res.status(201).json({ status: 201, message: "User available" });
    } else {
      res.status(401).json({ status: 401, message: "User not exist" });
    }
  } catch (error) {
    res.status(500).json({ status: 500, error });
  }
});

module.exports = router;

// // 2 way connection
// // 12345 ---> e#@$hagsjd
// // e#@$hagsjd -->  12345

// // hashing compare
// // 1 way connection
// // 1234 ->> e#@$hagsjd
// // 1234->> (e#@$hagsjd,e#@$hagsjd)=> true
