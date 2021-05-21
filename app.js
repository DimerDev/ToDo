const http = require('http');
const path = require('path');
const fs = require('fs');



http.createServer((req, res) => {
   fs.readFile(path.join(__dirname, '/public/index.html'), (err, content) => {
      if (err) throw err;

      let contentType = 'text/html';
      if (path.extname(req.url) == '.css') contentType = 'text/css';
      else if (path.extname(req.url) == '.js') contentType = 'text/javascript';
      res.writeHeader(200, {
         'Content-type': contentType
      });
      res.end(content);
   });
}).listen(8181);