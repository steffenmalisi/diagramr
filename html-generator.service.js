const fs = require('fs');

/**
 * Generator which produces a HTML file.
 */
class HtmlGeneratorService {
  /**
   * Creates a HTML file from an input JSON object.
   * @param {Array} components
   * @param {String} outputPath
   * @param {String} templatePath
   */
  async generate(components, outputPath, templatePath) {
    let fileContent = await fs.promises.readFile(templatePath, {
      encoding: 'utf8'
    });
    const visJsData = this.getVisJsData(components);
    fileContent = fileContent.replace('${data}', JSON.stringify(visJsData));
    fs.promises.writeFile(outputPath, fileContent);
  }

  /**
   * Returns vis.js data consisting of nodes and edges which can be used as input to vis.Network.
   * @param {Array} components the components
   * @return {object} an object containing nodes and edges
   */
  getVisJsData(components) {
    let allInterfaces = [];
    const nodes = [];
    let edges = [];
    components.forEach(c => {
      nodes.push(this.getVisJsComponentNode(c));
      const interfaces = c.getInterfaces();
      if (interfaces.length > 0) {
        allInterfaces = allInterfaces.concat(c.getInterfaces());
      }
    });
    allInterfaces.forEach(i => {
      nodes.push(this.getVisJsInterfaceNode(i));
      edges.push(this.getVisJsProviderEdge(i));
      edges = edges.concat(this.getVisJsConsumerEdges(i));
    });
    return { nodes: nodes, edges: edges };
  }

  /**
   * @param {object} component the component
   * @return {object} the vis.js node
   */
  getVisJsComponentNode(component) {
    const node = {};
    node.id = component.getId();
    node.label = component.getName();
    node.group = component.getId();
    node.shape = 'box';
    return node;
  }

  /**
   * @param {object} intrface the interface
   * @return {object} the vis.js node
   */
  getVisJsInterfaceNode(intrface) {
    const node = {};
    node.id = intrface.getId();
    node.label = intrface.getName();
    node.group = intrface.getProducer().getId();
    node.shape = 'dot';
    return node;
  }

  /**
   * @param {object} intrface the interface
   * @return {object} the vis.js edge
   * { from: 0, to: 1},
   */
  getVisJsProviderEdge(intrface) {
    const edge = {};
    edge.from = intrface.getProducer().getId();
    edge.to = intrface.getId();
    return edge;
  }

  /**
   * @param {object} intrface the interface
   * @return {object} the vis.js edge
   */
  getVisJsConsumerEdges(intrface) {
    const edges = [];
    intrface.getConsumers().forEach(c => {
      edges.push({
        from: c.getId(),
        to: intrface.getId(),
        dashes: true,
        arrows: { to: { enabled: true } }
      });
    });
    return edges;
  }
}

module.exports = HtmlGeneratorService;
