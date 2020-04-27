#!/usr/bin/env node
'use strict';

const GeneratorService = require('./generator.service');
const generatorService = new GeneratorService();
const program = require('commander');

program
  .arguments('<i>')
  .option(
    '-t, --template <template>',
    'The template file to use. If not specified the a shipped default template is used.',
    'templates/puml.template'
  )
  .option(
    '-o, --output <output>',
    'The output path to be used. If not specified it will default to output.puml in your current directory.',
    'output.puml'
  )
  .action(function(i) {
    console.log(
      'Generate "%s" from "%s" with template "%s"',
      program.output,
      i,
      program.template
    );
    generatorService.generate(i, program.output, program.template);
  })
  .parse(process.argv);
