    var user = encodeURIComponent("admin"),
    password = encodeURIComponent("hgaf.120"),
    authMechanism = "DEFAULT",
    url = `mongodb://${user}:${password}@localhost:27017/?authMechanism=${authMechanism}`
   
    module.exports=url