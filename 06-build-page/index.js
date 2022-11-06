const path = require('path');
const fs = require('fs');

//1. Создаёт папку  **project-dist**.
fs.mkdir(path.join(__dirname, 'project-dist'), { recursive: true }, (err) => {
    if (err) throw err;
  });

//2. Заменяет шаблонные теги в файле **template.html** с названиями файлов из папки components (пример:```{{section}}```) на содержимое одноимённых компонентов и  сохраняет результат в **project-dist/index.html**.
let index_html = path.join(__dirname, 'project-dist','index.html')
fs.copyFile(path.join(__dirname, 'template.html'),
            index_html, err => {
            if(err) throw err; 
         });  

async function createHTML () {
  let template = await fs.promises.readFile(path.join(__dirname, 'template.html'), 'utf8');
  const components = await fs.promises.readdir(path.join(__dirname, 'components'), {encoding: 'utf-8', withFileTypes: true });
  
    for (let component of components) {
      let path_template = path.join(__dirname,'components', component.name)
      if(component.isFile() && path.extname(path.join(__dirname, 'components', component.name)) == '.html'){
        let read_file = await fs.promises.readFile(path_template,'utf8');
        let name_temp = path.basename(component.name, '.html')
        template = template.replace(new RegExp(`{{${name_temp}}}`,'g'), read_file);
        
      }
   
    }
    await fs.promises.writeFile(index_html, template);
}
createHTML ()

// 3. Собирает в единый файл стили из папки **styles** и помещает их в файл **project-dist/style.css**.
const output_css = fs.createWriteStream(path.join(__dirname,'project-dist','style.css'),'utf-8');
fs.readdir(path.join(__dirname,'styles'), 'utf8', (err, files) => {
  if (err) throw err;
  files.forEach((file)=> {
      const stream = fs.createReadStream(path.join(__dirname,'styles', `${file}`), 'utf-8');
      let data = '';

      fs.stat(path.join(__dirname, 'styles', `${file}`), (err, stats) => {
          const ext = path.extname(file)
          switch (ext == '.css') {
            case true:
                // console.log(`Это стиль`);
                stream.on('data', chunk => data += chunk);
                stream.on('end', () => {
                    output_css.write(data)
                });
                break;
            case false:
              console.log(`Это не стиль`);
                break;
          }
      })
  })
})

// 4. Копирует папку **assets** в **project-dist/assets**


async function copyAssets(from, destination) {
  const assets = await fs.promises.readdir(from, { withFileTypes: true });
  await fs.promises.mkdir(destination, { recursive: true });
  for (elem of assets) {
      if (elem.isDirectory()) {
          await copyAssets(path.join(from , elem.name), path.join(destination, elem.name));
      } else {
          await fs.promises.copyFile(path.join(from , elem.name), path.join(destination, elem.name));
      }
  }
}
copyAssets(path.join(__dirname, 'assets'), path.join(__dirname, 'project-dist','assets'));
// copy()