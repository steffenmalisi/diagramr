'use strict';

const components = new Map();
const Component = require('./puml-component');

const ComponentRepository = {
  has: key => components.has(key),
  get: key => components.get(key),
  save: (key, component) => components.set(key, component),
  getAll: () => {
    return Array.from(components.values());
  },
  saveIfNotExisting: c => {
    let component;
    if (ComponentRepository.has(c)) {
      component = ComponentRepository.get(c);
    } else {
      component = new Component(c);
      ComponentRepository.save(c, component);
    }
    return component;
  }
};

Object.freeze(ComponentRepository);

module.exports = ComponentRepository;
