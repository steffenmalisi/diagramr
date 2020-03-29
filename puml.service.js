'use strict';

const csv2json = require('csvtojson');
const fs = require('fs');

const componentRepository = require('./component.repository');

/**
 * Constructor for PumlService.
 */
function PumlService() {}

/**
 * Creates a Plant UML file from a CSV file
 * @param {String} csvPath
 * @param {String} templatePath
 * @param {String} outputPath
 */
PumlService.prototype.createPumlFromCsv = function(
  csvPath,
  templatePath,
  outputPath
) {
  csv2json()
    .fromFile(csvPath)
    .then(result => {
      if (result !== undefined && result != null) {
        result.forEach(i => {
          this.registerConnection(i.target, i.endpoint, i.source);
        });
        this.savePumlFile(
          this.generatePumlDefinitions(componentRepository.getAll()),
          templatePath,
          outputPath
        );
      }
    });
};

/**
 * Saves a plant uml (PUML) file to disk by inserting
 * the PUML definitions into a template.
 * @param {String} pumlDefinitions
 * @param {String} templatePath
 * @param {String} outputPath
 */
PumlService.prototype.savePumlFile = function(
  pumlDefinitions,
  templatePath,
  outputPath
) {
  fs.readFile(templatePath, 'utf8', function(err, data) {
    if (err) throw err;
    const filecontent = data.replace('${pumlDefinitions}', pumlDefinitions);

    fs.writeFile(outputPath, filecontent, function(err) {
      if (err) throw err;
      console.log('The file was saved!');
    });
  });
};

/**
 * Generates the plant uml (PUML) definitions from the component objects.
 * @param {Array} components
 * @return {String} a string representation of the PUML definitions
 */
PumlService.prototype.generatePumlDefinitions = function(components) {
  let allInterfaces = [];
  let pumlDefinitions = '';
  components.forEach(v => {
    pumlDefinitions = pumlDefinitions + v.getPumlElement();
    const interfaces = v.getInterfaces();
    if (interfaces.length > 0) {
      allInterfaces = allInterfaces.concat(v.getInterfaces());
    }
  });
  allInterfaces.forEach(v => {
    pumlDefinitions = pumlDefinitions + v.getPumlElement();
  });
  return pumlDefinitions;
};

/**
 * Registers a connection between a producer and a consumer using an interface.
 * @param {*} producer
 * @param {*} interfce
 * @param {*} consumer
 */
PumlService.prototype.registerConnection = function(
  producer,
  interfce,
  consumer
) {
  const producerComponent = componentRepository.saveIfNotExisting(producer);
  const interfaceComponent = producerComponent.addOrGetInterface(interfce);
  const consumerComponent = componentRepository.saveIfNotExisting(consumer);
  interfaceComponent.addConsumer(consumerComponent);
};

module.exports = PumlService;
