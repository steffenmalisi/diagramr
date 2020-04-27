'use strict';

const fs = require('fs');

/**
 * PumlService.
 */
class PumlService {
  /**
   * Constructor for PumlService.
   */
  constructor() {}

  /**
   * Creates a Plant UML file from an array of components.
   * @param {Array} components
   * @param {String} outputPath
   * @param {String} templatePath
   */
  async generate(components, outputPath, templatePath) {
    this.savePumlFile(
      this.generatePumlDefinitions(components),
      templatePath,
      outputPath
    );
  }

  /**
   * Saves a plant uml (PUML) file to disk by inserting
   * the PUML definitions into a template.
   * @param {String} pumlDefinitions
   * @param {String} templatePath
   * @param {String} outputPath
   */
  savePumlFile(pumlDefinitions, templatePath, outputPath) {
    fs.readFile(templatePath, 'utf8', function(err, data) {
      if (err) throw err;
      const filecontent = data.replace('${pumlDefinitions}', pumlDefinitions);
      fs.writeFile(outputPath, filecontent, function(err) {
        if (err) throw err;
        console.log('The file was saved!');
      });
    });
  }

  /**
   * Generates the plant uml (PUML) definitions from the component objects.
   * @param {Array} components
   * @return {String} a string representation of the PUML definitions
   */
  generatePumlDefinitions(components) {
    let allInterfaces = [];
    let pumlDefinitions = '';
    components.forEach(v => {
      pumlDefinitions =
        pumlDefinitions + this.getPumlComponentRepresentation(v);
      const interfaces = v.getInterfaces();
      if (interfaces.length > 0) {
        allInterfaces = allInterfaces.concat(v.getInterfaces());
      }
    });
    allInterfaces.forEach(v => {
      pumlDefinitions =
        pumlDefinitions + this.getPumlInterfaceRepresentation(v);
    });
    return pumlDefinitions;
  }

  /**
   * @param {object} component the component
   * @return {String} a PUML string representation of the component.
   */
  getPumlComponentRepresentation(component) {
    return `component [${component.getName()}] as ${component.getAlias()} \n`;
  }

  /**
   * @param {object} intrface the interface
   * @return {String} a PUML string representation of the component.
   */
  getPumlInterfaceRepresentation(intrface) {
    const definition = `() "${intrface.getName()}" as ${intrface.getAlias()} \n`;
    const producerRelation = `${intrface.getAlias()} -- ${intrface
      .getProducer()
      .getAlias()} \n`;
    let consumerRelations = '';
    intrface.getConsumers().forEach(c => {
      consumerRelations =
        consumerRelations + `${c.getAlias()} ..> ${intrface.getAlias()} \n`;
    });
    return definition + producerRelation + consumerRelations;
  }
}

module.exports = PumlService;
