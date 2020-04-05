#!/usr/bin/env node
'use strict';

const PumlService = require('./puml.service');
const pumlService = new PumlService();
const program = require('commander');

program
  .arguments('<csv>')
  .option(
    '-t, --template <template>',
    'The template file to use. If not specified the a shipped default template is used.'
  )
  .option(
    '-o, --output <output>',
    'The output path to be used. If not specified it will default to output.puml in your current directory.'
  )
  .action(function(csv) {
    const template = getTemplatePathOrDefault(program.template);
    const output = getOutputPathOrDefault(program.output);
    pumlService.createPumlFromCsv(csv, template, output);
  })
  .parse(process.argv);

/**
 * Checks if the given path is valid. If true it returns this path.
 * If not, it returns the default.
 * @param {String} templatePath
 * @return {String} valid template path
 */
function getTemplatePathOrDefault(templatePath) {
  return getOrDefault(templatePath, 'puml.template');
}

/**
 * Checks if the given path is valid. If true it returns this path.
 * If not, it returns the default.
 * @param {String} outputPath
 * @return {String} valid output path
 */
function getOutputPathOrDefault(outputPath) {
  return getOrDefault(outputPath, 'output.puml');
}

/**
 * Checks if the given path is valid. If true it returns this path.
 * If not, it returns the default.
 * @param {String} path
 * @param {String} defaultPath
 * @return {String} valid output path
 */
function getOrDefault(path, defaultPath) {
  if (path == null) {
    // TODO check path
    return defaultPath;
  } else {
    return path;
  }
}
