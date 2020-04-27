'use strict';

const PumlService = require('./puml-generator.service');
const HtmlService = require('./html-generator.service');
const csv2json = require('csvtojson');
const componentRepository = require('./component.repository');

/**
 * GeneratorService
 */
class GeneratorService {
  /**
   * initializes the class
   */
  constructor() {}

  /**
   * Generates the output from the inputPath and saves it to the outputPath using the template from the templatePath.
   * @param {String} inputPath the inputPath
   * @param {String} outputPath the outputPath
   * @param {String} templatePath the templatePath
   */
  async generate(inputPath, outputPath, templatePath) {
    try {
      const input = await this.convertInput(inputPath);

      if (input !== undefined && input != null) {
        input.forEach(i => {
          this.registerConnection(i.target, i.endpoint, i.source);
        });

        // TODO get output type based on output file format
        const outputType = 'html';
        let service;
        switch (outputType) {
          case 'html':
            service = new HtmlService();
            break;
          default:
            service = new PumlService();
            break;
        }
        service.generate(
          componentRepository.getAll(),
          outputPath,
          templatePath
        );
      }
    } catch (error) {
      console.log('Error while generating output', error);
    }
  }

  /**
   * Converts the input file into a JSON object representation.
   * @param {String} inputPath the inputPath.
   */
  async convertInput(inputPath) {
    return csv2json().fromFile(inputPath);
  }

  /**
   * Registers a connection between a producer and a consumer using an interface.
   * @param {*} producer
   * @param {*} interfce
   * @param {*} consumer
   */
  registerConnection(producer, interfce, consumer) {
    const producerComponent = componentRepository.saveIfNotExisting(producer);
    const interfaceComponent = producerComponent.addOrGetInterface(interfce);
    const consumerComponent = componentRepository.saveIfNotExisting(consumer);
    interfaceComponent.addConsumer(consumerComponent);
  }
}

module.exports = GeneratorService;
