const componentRepository = require('../../component.repository');
const Component = require('../../component.type');

describe('Test if the repository works', () => {
  it('adds a component correctly to repository', () => {
    const testObject = { id: 1, value: 'testObject1' };
    componentRepository.save('1', testObject);
    const component = componentRepository.get('1');
    expect(component).toBe(testObject);
  });

  it('verifies that the repository is a singleton', () => {
    const componentRepository2 = require('../../component.repository');
    const testObject = { id: 2, value: 'testObject2' };
    componentRepository2.save('2', testObject);
    const component = componentRepository.get('2');
    expect(component).toBe(testObject);
  });

  it('gets all elements from the repository', () => {
    const components = componentRepository.getAll();
    expect(components).toBeInstanceOf(Array);
    expect(components.length).toBe(2);
  });

  it('checks if repository already has an key', () => {
    expect(componentRepository.has('1')).toBeTruthy();
    expect(componentRepository.has('2')).toBeTruthy();
    expect(componentRepository.has('3')).not.toBeTruthy();
  });

  it('checks if component is saved if not existing', () => {
    const myComponent = componentRepository.saveIfNotExisting('myComponent');
    expect(myComponent).not.toBeNull();
    expect(myComponent).toBeInstanceOf(Component);
    expect(myComponent.getName()).toBe('myComponent');
  });

  it('checks if component is not saved if existing', () => {
    const countBefore = componentRepository.getAll().length;
    const myComponent = componentRepository.saveIfNotExisting('myComponent');
    expect(myComponent).not.toBeNull();
    expect(myComponent).toBeInstanceOf(Component);
    expect(myComponent.getName()).toBe('myComponent');
    const countAfter = componentRepository.getAll().length;
    expect(countAfter).toBe(countBefore);
  });
});
