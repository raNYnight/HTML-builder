const { stdin, stdout } = process;
const path = require('path');
const fs = require('fs');
const output = fs.createWriteStream(path.join(__dirname,'text.txt'),'utf-8');
stdout.write('Hello, write some text here\n');
stdin.on('data', data => {
       if( data.toString().trim() == 'exit'){
        process.exit()
       }else{
        output.write(data)
       }
});
process.on('exit', () => stdout.write('Goodbye!'));
process.on('SIGINT', () => process.exit())