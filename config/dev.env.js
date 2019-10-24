'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // BASE_API: '"http://116.62.60.13:8080"'
  // BASE_API: '"http://172.16.26.125:9090"'
})
