function watchScssTemplates() {
    var fs = require('fs');
    const templateFileAddr = 'src/assets/styles/templates.scss',
        templateFolderAddr = 'src/assets/styles/template-styles';
    let templatesString = '';
    fs.readdir(templateFolderAddr, (err, el) => {
        templatesString = el;
        // console.log(templatesString);
        templatesString = templatesString.map(el => {
            el = el.replace(/\.scss/g, '');
            return `@import './template-styles/${el}';`;
        });
        templatesString = templatesString.join(',').replace(/,/g, '');
        writeFile(templatesString, templateFileAddr);
    });

    function writeFile(string, file) {
        fs.writeFile(file, string, null, () => {
            // console.log('файлы перезаписаны');
        });
    }
};


module.exports = watchScssTemplates;