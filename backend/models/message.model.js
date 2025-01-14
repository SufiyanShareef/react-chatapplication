import mongoose from "mongoose";
import { encryptMessage,decryptMessage } from "../middleware/encryption.js";

const messageSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    message: {
      type: String,
      required: true,
    }
    //Createdat, updatedat
  },
  { timestamps: true });

const Message = mongoose.model("Message", messageSchema);
export default Message;
// // Middleware for encrypting the message before saving
// messageSchema.pre("save", function (next) {
//   if (!this.isModified("message")) return next();
//   this.message = encryptMessage(this.message);
//   next();
// });

// // Add decrypt method
// messageSchema.methods.decryptMessage = function () {
//   return decryptMessage(this.message);
// };




//starter code
// import mongoose from "mongoose";

// const messageSchema = new mongoose.Schema({
//     senderId:{
//         type:mongoose.Schema.Types.ObjectId,
//         ref:"User",
//         required:true,
//     },
//     receiverId:{
//         type:mongoose.Schema.Types.ObjectId,
//         ref:"User",
//         require: true,
//     },
//     message:{
//         type: String,
//         required:true,
//     }
//     //Createdat, updatedat
// },{timestamps: true});

// const Message = mongoose.model("Message", messageSchema);
// export default Message;
