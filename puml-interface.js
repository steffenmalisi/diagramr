'use strict';

const uuid = require('uuid');

/**
 * Constructor for an Interface.
 * @param {*} name
 * @param {*} producer
 */
function Interface(name, producer) {
  this.name = name;
  this.producer = producer;
  this.alias = uuid.v4().replace(/-/g, '');
  this.consumers = new Set();
}

Interface.prototype.addConsumer = function(component) {
  if (!this.consumers.has(component)) {
    this.consumers.add(component);
  }
};

Interface.prototype.getPumlElement = function() {
  const definition = `() "${this.name}" as ${this.alias} \n`;
  const producerRelation = `${this.alias} -- ${this.producer.getAlias()} \n`;
  let consumerRelations = '';
  this.consumers.forEach(c => {
    consumerRelations =
      consumerRelations + `${c.getAlias()} ..> ${this.alias} \n`;
  });
  return definition + producerRelation + consumerRelations;
};

module.exports = Interface;
