'use strict';

const PumlService = require('./puml.service');
const pumlService = new PumlService();

const csvPath = 'input.csv';
const templatePath = 'puml.template';
const outputPath = 'output.puml';

pumlService.createPumlFromCsv(csvPath, templatePath, outputPath);
