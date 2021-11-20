var redis = require('redis');
const Redis_Port = process.env.PORT || 6379;
const saveUser = redis.createClient(Redis_Port);

exports.redisGetDetails = async (userId, res) => {
    try{
        await saveUser.hgetall(userId, (err, data) => {
            if (err) {
                console.error(err)
            }
            return res.send({status:true, details:data})
        })
    }
    catch(err){
        console.log(err)
    }
    
}