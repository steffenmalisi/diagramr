'use strict';

const uuid = require('uuid');

/**
 * An interface representation.
 */
class Interface {
  /**
   * Constructor for an Interface.
   * @param {*} name
   * @param {*} producer
   */
  constructor(name, producer) {
    this.id = uuid.v4();
    this.name = name;
    this.producer = producer;
    this.consumers = new Set();
  }
  /**
   * @return {String} the id of the interface.
   */
  getId() {
    return this.id;
  }

  /**
   * @return {String} the name of the interface.
   */
  getName() {
    return this.name;
  }

  /**
   * @return {String} an alias for this interface.
   */
  getAlias() {
    return this.id.replace(/-/g, '');
  }

  /**
   * @return {object} the producer of this interface.
   */
  getProducer() {
    return this.producer;
  }

  /**
   * @return {Set} all consumers for this interface as an set.
   */
  getConsumers() {
    return this.consumers;
  }

  /**
   * Adds an consumer to this interface.
   * @param {object} component the consumer component of this interface.
   */
  addConsumer(component) {
    if (!this.consumers.has(component)) {
      this.consumers.add(component);
    }
  }
}

module.exports = Interface;
