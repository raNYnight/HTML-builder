
const path = require('path');
const fs = require('fs');
const secret_folder = path.join(__dirname, 'secret-folder');

fs.readdir(secret_folder, 'utf8', (err, files) => {
    if (err) throw err;
    files.forEach(file =>  {
        const name = path.basename(file, `${path.extname(file)}`)
        const ext =path.extname(file)
        fs.stat(path.join(__dirname, 'secret-folder', `${file}`), (err, stats) => {
            let size = (stats.size / 1024).toFixed(2) + ' kb'
            if (err) {
              console.error(err)
              return
            }
            console.log(`${name} - ${ext.slice(1)} - ${size}`)
          })
    })
    
  });
  