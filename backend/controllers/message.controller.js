import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReciverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
    try {
        const { message } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] },
        });

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId],
            });
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message,
        });

        if (newMessage) {
            conversation.messages.push(newMessage._id);
        }
        //    await conversation.save();
        //    await newMessage.save();
        //    faster way to save both documents works in parallel
        //    sockit.io here 
        const receiverSocketId = getReciverSocketId(receiverId);
        if (receiverSocketId) {
            // emit message to receiver (unique reciver)
            io.to(receiverSocketId).emit('newMessage', newMessage);
        }

        await Promise.all([conversation.save(), newMessage.save()]);
        res.status(201).json(newMessage);
    } catch (error) {
        console.error("error in sentMessage controller", error.message);
        res.status(500).json({ error: "internal server error" });
    }
};

export const getMessage = async (req,res)=>{
    try {
        const {id: userToChatId} = req.params;
        const senderId = req.user._id;

        const conversation = await Conversation.findOne({
            participants: {$all : [senderId,userToChatId]},
        }).populate("messages"); // not refrence but actual message

        if (!conversation) return res.status(200).json([]);
        
        const messages = conversation.messages;

        res.status(200).json(messages);

    } catch (error) {
        console.log("error in getMessage controller",error.message);
        res.status(500).json({error:"internal server error" });
    }
}

// import Conversation from "../models/conversation.model.js";
// import Message from "../models/message.model.js";
// import crypto from "crypto";

// // encrypt Message
// function encryptMessage(text) {
// 	const iv = crypto.randomBytes(16); // Generate a random IV
// 	const cipher = crypto.createCipheriv("aes-256-cbc", Buffer.from(process.env.ENCRYPTION_KEY), iv);
// 	let encrypted = cipher.update(text);
// 	encrypted = Buffer.concat([encrypted, cipher.final()]);
// 	return iv.toString("hex") + ":" + encrypted.toString("hex"); // Return iv and encrypted text
// }

// export const sendMessage = async (req,res)=>{
//     try {
//         const {message} = req.body;
//         const {id: receiverId} = req.params;
//         const senderId = req.user._id;

//        let conversation= await Conversation.findOne({
//         participants: {$all : [senderId,receiverId]},
//        })

//        if(!conversation){
//         conversation = await Conversation.create({
//             participants: [senderId,receiverId],
//         });
//        }
//        const encryptedMessage = encryptMessage(message);
//        const newMessage = new Message({
//         senderId,
//         receiverId,
//         message: encryptedMessage,
//        })
//        if(newMessage){
//         conversation.messages.push(newMessage._id);
//        }
//     //    sockit.io here 
//     //    await conversation.save();
//     //    await newMessage.save();
//     //    faster way to save both documents works in parallel
//     await Promise.all([conversation.save(),newMessage.save()]);
//        res.status(201).json(newMessage);
//     } catch (error) {
//         console.error("error in sentMessage controller",error.message);
//         res.status(500).json({error:"internal server error" });
//     }
// };

// // Decrypt message
// function decryptMessage(text) {
// 	const textParts = text.split(":");
// 	const iv = Buffer.from(textParts.shift(), "hex");
// 	const encryptedText = Buffer.from(textParts.join(":"), "hex");
// 	const decipher = crypto.createDecipheriv("aes-256-cbc", Buffer.from(process.env.ENCRYPTION_KEY), iv);
// 	let decrypted = decipher.update(encryptedText);
// 	decrypted = Buffer.concat([decrypted, decipher.final()]);
// 	return decrypted.toString();
// } 

// export const getMessage = async (req,res)=>{
//     try {
//         const {id: userToChatId} = req.params;
//         const senderId = req.user._id;

//         const conversation = await Conversation.findOne({
//             participants: {$all : [senderId,userToChatId]},
//         }).populate("messages"); // not refrence but actual message

//         if (!conversation) return res.status(200).json([]);
        
//         // Decrypt all messages before sending them to the client
// 		const messages = conversation.messages.map((message) => ({
// 			...message.toObject(),
// 			message: decryptMessage(message.message),
// 		}));

//         res.status(200).json(messages);

//     } catch (error) {
//         console.log("error in getMessage controller",error.message);
//         res.status(500).json({error:"internal server error" });
//     }
// }