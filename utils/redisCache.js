var redis = require('redis');
const Redis_Port = process.env.PORT || 6379;
const setUser = redis.createClient(Redis_Port);

exports.redisSave = (id ,userDetails) => {
    try{
        // let details = {
        //     name: userDetails.name,
        //     mobile: userDetails.mobile
        // }
        // console.log(userDetails,"===> redis details",id)
        setUser.setex(id, 3600, userDetails.name )
    }catch(err){
        console.error(err)
    }
}