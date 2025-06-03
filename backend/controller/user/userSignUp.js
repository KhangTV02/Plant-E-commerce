const userModel = require("../../models/userModel")
const bcrypt = require('bcrypt');


async function userSignUpController(req,res){
    try{
        const { email, password, name} = req.body
        const user = await userModel.findOne({email})

        console.log("req.body",req.body)
       
         if(user){
            throw new Error("Tài khoản đã tồn tại !")
            }
        if(!email){
           throw new Error("Hãy nhập email !")
        }
        if(!password){
            throw new Error("Hãy nhập mật khẩu !")
        }
        if(!name){
            throw new Error("Hãy nhập tên !")
        }

        const salt = bcrypt.genSaltSync(10);
        const hashPassword = await bcrypt.hash(password, salt);

        if(!hashPassword){
            throw new Error("Something is wrong")
        }

        const payload = {
            ...req.body,
            role : "Người dùng",
            password : hashPassword
        }

        const userData = new userModel(payload)
        const saveUser = await userData.save()

        res.status(201).json({
            data : saveUser,
            success : true,
            error : false,
            message : "Đăng ký tài khoản thành công !"
        })


    }catch(err){
        res.json({
            message : err.message || err  ,
            error : true,
            success : false,
        })
    }
}

module.exports = userSignUpController