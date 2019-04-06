var resolvers = { 
    hello: () => "Hello world!",
    usuario: () => {
       return {
           id:"12",
           name:"alan",
           lastname:"hola"
          }
        }
};


module.exports=resolvers