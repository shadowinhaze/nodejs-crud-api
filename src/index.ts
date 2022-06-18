import 'dotenv/config';
import { createServer } from 'http';

const PORT = process.env.PORT || 4000;

const server = createServer((req, res) => {
  // res.writeHead(200, {
  //   'Content-type': 'text/html; charset=utf-8',
  // });
  res.end('server worked');
});

server.listen(PORT, () => console.log(`Server started at PORT: ${PORT}`));
