var redis = require('redis');
const Redis_Port = process.env.PORT || 6379;
const setUser = redis.createClient(Redis_Port);

exports.redisSave = (id, userDetails, res) => {
    console.log("====>", userDetails)
    try {
        setUser.HMSET(id, [
            "name", userDetails.name,
            "username", userDetails.username,
            "mobile", userDetails.mobile,
            "address", userDetails.address
        ], function (err, resp) {
            if (err) {
                return console.log(err)
            }
            console.log("===>", resp)
            
        })
    } catch (err) {
        console.error(err)
    }
}