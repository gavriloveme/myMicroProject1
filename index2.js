const yargs = require('yargs');
const path = require('path');
const fs =require('fs');


const args = yargs
    .usage('Usage: node $0 [options]')
    .help('help')
    .alias('help', 'h')
    .version('0.0.1')
    .alias('version', 'v')
    .example('node $0 index.js --entry ./path/ --dist ./path --delete')
    .options('entry',{
        alias: 'e',
        discribe: "Путь к директории",
        demandOption: true
    })
    .options('dist', {
        alias: 'd',
        describe: "Путь результата сортировки",
        default: './dist'
    })
    .options('delete', {
        alias: 'D',
        discribe: "Удалить данную директорию?",
        boolean: true,
        default: false
    })
    .epilog('My home work namber 2')
    .argv

const config = {
    src: path.normalize(path.join(__dirname, args.entry)),
    dist: path.normalize(path.join(__dirname, args.dist)),
    delete: args.delete
}  


function readdir(src) {
    return new Promise((resolve, reject) => {
        fs.readdir (src, (err, files) => {
            if (err) reject(err)

            resolve(files)
        })
    })
}

function stats(src) {
    return new Promise((resolve, reject) => {
        fs.stat (src, (err, stat) => {
            if (err) reject(err)

            resolve(stat)
        })
    })
}

function mkdir(src) {
    return new Promise((resolve, reject) => {
        fs.createDir(src, (err) => {
            if (err) reject(err)

            resolve()
        })
    })
}

function copyFile(src) {
    return new Promise((resolve, reject) => {
        fs.copyFile (src, (err) => {
            if (err) reject(err)

            resolve()
        })
    })
}


(async function() {
    async function sorter(src) {
        const files = await readdir(src)

        for (const file of files) {
            const currentPath = path.join(src, file)
            const stat = await stats(currentPath)

            if (stat.isDirectory()) {
                await sorter(currentPath)
            } else {
                await createDir(config.dist)
                await mkdir()
                    const directory = config.src
                    const parsePath = path.parse(currentPath) 
                    const dirname = parsePath.name[0].toUpperCase()
                await copyFile()    

                console.log('copy: ${currentPath}')

            }
        }
    }

    try {
        await sorter(config.src)
        console.log('DONNNNNNNNNNE')
    } catch (error) {
        console.log(err)
    }
})()








 