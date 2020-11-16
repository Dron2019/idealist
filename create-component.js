var fs = require('fs');

function getPugTemplate(scriptName) {
    return `extends ../layout/main
block variable
    - var version = "ua";
    - var pageName = "${scriptName}";
block meta
    title= ' '
    meta(name='description', content='')
block scripts
    script(defer src="./assets/scripts/${scriptName}.js")
block head
    link(rel='stylesheet', href="./assets/styles/main.min.css")
block content
    h1 ${scriptName}
block footer
block header`;
}
const argument = process.argv[2];
const templatePath = 'src/pug/layout/template.pug'

const pathes1 = {
    pug: 'src/pug/pages/',
    style: 'src/assets/styles/template-styles/',
    script: 'src/assets/scripts/gulp-modules/',
};
const formats = {
    pug: 'pug',
    style: 'scss',
    script: 'js',
};
let fileEndsForRegExp = '';
if (!!argument === false) {
    console.warn('You didn`t enter component name');
    return;
}
for (const iterator in formats) {
    console.log(iterator);
    fileEndsForRegExp += `${formats[iterator]}|`;
}
fileEndsForRegExp = `(${fileEndsForRegExp})`;
console.log(fileEndsForRegExp);

let formatRegExp = new RegExp(`\.${fileEndsForRegExp}`, 'g');
// console.log(formatRegExp);
for (const iterator in pathes1) {
    fs.readdir(pathes1[iterator], function(err, files) {
        files = files.map(el => el.replace(/\.(scss|pug|js)/, ''));
        let exist = false;
        let path = `${pathes1[iterator]}/${argument}.${formats[iterator]}`;
        let componentPartName = `${argument}.${formats[iterator]}`;
        if (files.includes(argument)) exist = true;
        if (!exist) {
            if (iterator === 'pug') {
                // fs.readFile(templatePath, { encoding: 'utf-8' }, function(err, data) {
                //     console.log(data);
                //     // data = data.replace(/NODE_SCRIPT/, argument);
                //     fs.writeFile(path, data, function(err) {
                //         console.log(`\x1b[32m`, `${argument}.${formats[iterator]} создан`);
                //     });
                // });
                fs.writeFile(path, getPugTemplate(argument), function(err) {
                    console.log(`\x1b[32m`, `${argument}.${formats[iterator]} создан`);
                });
            } else {
                fs.writeFile(path, "", function(err) {
                    console.log(`\x1b[32m`, `${componentPartName} создан`);
                });
            }
        } else {
            console.log(`\x1b[33m%s\x1b[0m`, `${componentPartName} уже есть`);
        }
    })
};
// console.log(argument);


/**
 * changePathesForWP ()
Добавляет в папку “dist” ---> ‘wp-template’, где изменены пути для картинок под WordPress

 */