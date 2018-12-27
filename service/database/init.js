const mongoose = require('mongoose')
const db = 'mongodb://localhost:27017/smile-db'
const glob = require('glob')
const {resolve} = require('path')
mongoose.Promise = global.Promise;

exports.initSchemas = ()=>{
    glob.sync(resolve(__dirname,'./schema','**/*.js')).forEach(require)
}

exports.connect = ()=>{
    // 链接数据库
    mongoose.set('useCreateIndex', true)
    // 链接数据库
    mongoose.connect(db, {
        useNewUrlParser: true
    })
    let maxConnectTimes = 0;
    return new Promise((resolve,reject)=>{

        
        // 增加数据库监听事件
        mongoose.connection.on('disconnected', ()=>{
            console.log('--------------数据库断开')
            if (maxConnectTimes<=3){
                maxConnectTimes++;
                mongoose.connect(db)
            }else{
                reject()
                throw new Error('数据库出现问题，程序无法搞定，请人工处理.......')
            }
        })
        
        mongoose.connection.on('error', () => {
            console.log('--------------数据库出错')
            if (maxConnectTimes <= 3) {
                maxConnectTimes++;
                mongoose.connect(db)
            } else {
                reject()
                throw new Error('数据库出现问题，程序无法搞定，请人工处理.......')
            }
        })
        
        // 数据库链接开始时
        mongoose.connection.once('open',()=>{
            console.log('MongoDB connected successfully')

            resolve()
        })
    })
}