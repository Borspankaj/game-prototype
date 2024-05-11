const host=window.location.hostname
const wshost='ws://'+host+':3001'
const httphost='http://'+host+':3000'
export {wshost,httphost};