const server = require('./src/http/serve');

server.listen(3500,()=>{
  console.log('listen on http://localhost:3500');
});