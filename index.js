// Server'ı buradan başlatın
const server = require("./api/server");

const port = 9000;

server.listen(port, () => {
  console.log(`This Server is listening on ${port}`);
});
