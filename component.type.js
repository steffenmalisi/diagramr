'use strict';

const uuid = require('uuid');
const Interface = require('./interface.type');

/**
 * This class represents a component.
 */
class Component {
  /**
   * @param {String} name the name of the component.
   */
  constructor(name) {
    this.id = uuid.v4();
    this.name = name;
    this.interfaces = new Map();
  }
  /**
   * @return {String} the id of the component.
   */
  getId() {
    return this.id;
  }

  /**
   * @return {String} the name of the component.
   */
  getName() {
    return this.name;
  }

  /**
   * @return {String} the alias of the component.
   */
  getAlias() {
    return this.id.replace(/-/g, '');
  }

  /**
   * Add an interface to the component.
   * @param {String} name the name
   * @return {String} the interface name of the added or already existing interface
   */
  addInterface(name) {
    if (!this.hasInterface(name)) {
      this.interfaces.set(name, new Interface(name, this));
    }
    return this.interfaces.get(name);
  }

  /**
   * Check if an interface with the given name is already defined for that component
   * @param {String} name the name
   * @return {boolean} a boolean if the interface is already defined
   */
  hasInterface(name) {
    return this.interfaces.has(name);
  }

  /**
   * @param {String} name the name
   * @return {object} the interface by its name.
   */
  getInterface(name) {
    return this.interfaces.get(name);
  }

  /**
   * @return {Array} all interfaces for this component as an array.
   */
  getInterfaces() {
    const interfaces = [];
    this.interfaces.forEach(v => {
      interfaces.push(v);
    });
    return interfaces;
  }

  /**
   * Creates an interface for a component from the given name,
   * if it does not exist. If it exists, it returns the existing component.
   * @param {String} name the name of the interface
   * @return {Interface} an Interface
   */
  addOrGetInterface(name) {
    if (this.hasInterface(name)) {
      return this.getInterface(name);
    } else {
      return this.addInterface(name);
    }
  }
}

module.exports = Component;
