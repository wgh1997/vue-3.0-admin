const urlMap = {
    local: process.env.LOCAL_URL + 'api',
    sit: 'http://127.0.0.1:8002',
    uat: 'http://127.0.0.1:8002',
    prod: 'http://127.0.0.1:8002'
}
//sit,uat,prod
let stage = process.env.STAGE
//development,production
const nodeEnv = process.env.NODE_ENV
//nodeEnv为production并且stage不存在默认为生产环境
if (nodeEnv === 'production' && !stage) {
    stage = 'prod'
} else {
    //stage不存在默认为本地开发环境
    stage = stage || 'local'
}
console.log('ip:' + urlMap[stage])
export default urlMap[stage]