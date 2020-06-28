const os = require('os')

// 获取命令行变量
const configArgv = JSON.parse(process.env.npm_config_argv)
const original = configArgv.original.slice(1)
const stage = original[1] ? original[1].replace(/-/g, '') : ''
// 本地ip地址
let localUrl
try {
    const network = os.networkInterfaces()
    localUrl = network[Object.keys(network)[0]][1].address
} catch (e) {
    localUrl = 'localhost'
}
localUrl = 'http://' + localUrl + '/'

module.exports = {
    stage, localUrl
}