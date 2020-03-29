'use strict';

const uuid = require('uuid');
const Interface = require('./puml-interface');

/**
 * Constructor for a Component.
 * @param {*} name
 */
function Component(name) {
  this.name = name;
  this.alias = uuid.v4().replace(/-/g, '');
  this.interfaces = new Map();
}

Component.prototype.getName = function() {
  return this.name;
};

Component.prototype.getAlias = function() {
  return this.alias;
};

Component.prototype.addInterface = function(name) {
  if (!this.hasInterface(name)) {
    this.interfaces.set(name, new Interface(name, this));
  }
  return this.interfaces.get(name);
};

Component.prototype.hasInterface = function(name) {
  return this.interfaces.has(name);
};

Component.prototype.getInterface = function(name) {
  return this.interfaces.get(name);
};

Component.prototype.getInterfaces = function() {
  const interfaces = [];
  this.interfaces.forEach(v => {
    interfaces.push(v);
  });
  return interfaces;
};

/**
 * Creates an interface for a component from the given name,
 * if it does not exist. If it exists, it returns the existing component.
 * @param {String} name the name of the interface
 * @return {Interface} an Interface
 */
Component.prototype.addOrGetInterface = function(name) {
  if (this.hasInterface(name)) {
    return this.getInterface(name);
  } else {
    return this.addInterface(name);
  }
};

Component.prototype.getPumlElement = function() {
  return `component [${this.name}] as ${this.alias} \n`;
};

module.exports = Component;
