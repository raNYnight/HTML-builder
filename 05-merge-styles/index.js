const path = require('path');
const fs = require('fs');
const output = fs.createWriteStream(path.join(__dirname,'project-dist','bundle.css'),'utf-8');

fs.readdir(path.join(__dirname,'styles'), 'utf8', (err, files) => {
    if (err) throw err;
    files.forEach((file)=> {
        const stream = fs.createReadStream(path.join(__dirname,'styles', `${file}`), 'utf-8');
        let data = '';

        fs.stat(path.join(__dirname, 'styles', `${file}`), (err, stats) => {
            const ext = path.extname(file)
            switch (ext == '.css') {
              case true:
                  console.log(`Это стиль`);
                  stream.on('data', chunk => data += chunk);
                  stream.on('end', () => {
                      output.write(data)
                  });
                  break;
              case false:
                console.log(`Это не стиль`);
                  break;
            }
        })
    })
})
