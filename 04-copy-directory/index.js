
const path = require('path');
const fs = require('fs');
const files_main = path.join(__dirname, 'files')
const files_copy = path.join(__dirname, 'files-copy')

fs.mkdir(files_copy, { recursive: true }, (err) => {
    if (err) throw err;
  });

fs.readdir(files_copy, 'utf-8', (err,files)=> {
    if (err) throw err;
    files.forEach((file)=> {
        fs.unlink(path.join(__dirname, 'files-copy',`${file}`), err => {
            if(err) {
                console.log('Папки не сущесвует или она пуста');
            }
         })
    })
})

fs.readdir(files_main, 'utf8', (err, files) => {
    if (err) throw err;
    files.forEach((file)=> {
        fs.copyFile(path.join(__dirname, 'files', `${file}`),
        path.join(__dirname, 'files-copy',`${file}`), err => {
            if(err) throw err; 
         });
    })
})
