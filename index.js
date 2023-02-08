const yargs = require('yargs');
const path = require('path');
const fs =require('fs');
const { createDiffieHellmanGroup } = require('crypto');
require('dotenv').config()



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
    .epilog('My home work namber one')
    .argv

const config = {
    gg: path.normalize(path.join(__dirname, args.entry)),
    dist: path.normalize(path.join(__dirname, args.dist)),
    delete: args.delete
}  



function createDir(gg, cb) {
    fs.mkdir(gg, function (err) {
      if (err && err.code === 'EEXIST') return cb(null)
      if (err) return cb(err)

      cb(null)
    })
}




function fileSorter(gg) {
    fs.readdir(gg, function(err, files) {
        if (err) throw err;

        files.forEach(function(file) {
            const currentPath = path.join(gg, file)
            
            fs.stat(currentPath, function(err, stats) {
                if (err) throw err;
                
                if (stats.isDirectory()) {
                    fileSorter(currentPath)
                } else {
                    fs.mkdir(gg, function(err) {
                        createDir(config.gg, function (err) {
                            if (err) throw err
                             
                            const directory = config.gg
                            const parsePath = path.parse(currentPath) 
                            const dirname = parsePath.name[0].toUpperCase() 
                            
                            createDir(path.join(directory, dirname), function (err) { 
                                if (err) throw err 
                                
                                const newPath = path.join(directory, dirname, file) 
                                
                                fs.copyFile(currentPath, newPath, function (err) { 
                                    if (err) throw err 
                                    
                                })
                            }) 
                        })
                    })
                }
            })
        })
    })
}

try {
    fileSorter(config.gg)
} catch (error) {
    console.log(error.massage)
}

// process.on('exit', function() {
//     if (config.delete) {
//         fs.rmdirSync(config.gg, {recursive: true})
//     }
// })

console.log(config)  






