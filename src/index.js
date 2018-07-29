import ShapeBlend from './blend';

class SVGShapeBlend {
  constructor() {
    const blendDefs = document.querySelectorAll('blend');

    if (!blendDefs) {
      throw new Error('Could not find "blend" elements!');
    }

    blendDefs.forEach(definition => (new ShapeBlend({ definition })));
  }
}

export default SVGShapeBlend;
