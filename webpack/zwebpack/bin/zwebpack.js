#! /usr/bin/env node
const path = require('path');
const Compiler = require('../lib/Compiler.js');
console.log(123, process.cwd());
console.log(222, path.resolve('webpack.config.js'));
const config = require(path.resolve('webpack.config.js'));
const compiler = new Compiler(config)
compiler.hooks.entryOption.call();
compiler.run();