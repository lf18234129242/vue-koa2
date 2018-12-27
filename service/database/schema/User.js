const mongoose = require('mongoose')
const Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId;
const bcrypt = require('bcrypt')
const SALT_WORK_FACTOR = 10;


// 创建  userSchema

const userSchema = new Schema({
    UserId: { type: ObjectId},
    userName: {unique:true,type:String},
    password:String,
    createAt:{type:Date, default:Date.now()},
    lastLontAt:{type:Date, default:Date.now()}
},{
    collection:'user'
})

// 密码加盐加密
userSchema.pre('save', function (next) {
    //let user = this
    bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
        if (err) return next(err)
        bcrypt.hash(this.password, salt, (err, hash) => {
            if (err) return next(err)

            this.password = hash
            next()
        })
    })
})

userSchema.methods={
    comparePassword:(_password,password)=>{
        return new Promise((resolve,reject)=>{
            bcrypt.compare(_password,password,(err,isMatch)=>{
                if(!err) resolve(isMatch)
                else reject(err)
            })
        })
    }
}


// 发布模型
mongoose.model('User',userSchema)