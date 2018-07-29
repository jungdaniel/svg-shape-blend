const BLENDABLE_TYPES = {
    NUMBER: 'number',
    COLOR: 'color',
}

const SVG_NS = 'http://www.w3.org/2000/svg';

class ShapeBlend {
    constructor(options) {
        this.definition = options.definition;
        this.shapes = [];
        this.blendable = [
            {
                name: 'r',
                type: BLENDABLE_TYPES.NUMBER,
                default: 5,
            },
            {
                name: 'cx',
                type: BLENDABLE_TYPES.NUMBER,
                default: 0,
            },
            {
                name: 'cy',
                type: BLENDABLE_TYPES.NUMBER,
                default: 0,
            },
            {
                name: 'stroke-width',
                type: BLENDABLE_TYPES.NUMBER,
                default: 1,
            },
            {
                name: 'stroke',
                type: BLENDABLE_TYPES.COLOR,
                default: '#000000',
            },
            {
                name: 'fill',
                type: BLENDABLE_TYPES.COLOR,
                default: '#000000',
            }
        ];

        if (this.definition) {
            const stepsAttr = this.definition.getAttribute('steps');
            if (!stepsAttr) {
                throw new Error('Attribute steps is not defined!');
            }

            if (isNaN(parseInt(stepsAttr, 10))) {
                throw new Error('Value of steps attribute is not a number');
            }
            this.steps = parseInt(stepsAttr, 10);

            const fromAttr = this.definition.getAttribute('from');
            if (!fromAttr) {
                throw new Error('Attribute "from" is not defined!');
            }

            this.from = document.querySelector(fromAttr);
            if (!this.from) {
                throw new Error(`Could not find element with id: ${fromAttr}! Please supply in a format of: #yourId`);
            }

            const toAttr = this.definition.getAttribute('to');
            if (!toAttr) {
                throw new Error('Attribute "to" is not defined!');
            }

            this.to = document.querySelector(toAttr);
            if (!this.to) {
                throw new Error(`Could not find element with id: ${toAttr}! Please supply in a format of: #yourId`);
            }

            if (this.to.tagName !== this.from.tagName) {
                throw new Error(`Blending is only supported between elements with the same tagName!`);
            }
                
            this.generate();
            this.render();
        }
    }

    extractAttributes(element) {
        return this.blendable.reduce((attr, v) => {
            if (element.getAttribute(v.name)) {
                if (v.type === BLENDABLE_TYPES.NUMBER) {
                    const attrVal = parseInt(element.getAttribute(v.name), 10);
                    if (isNaN(attrVal)) {
                        throw new Error(`Value of ${v.name} is not a number!`);
                    }
                    attr[v.name] = attrVal;
                } else {
                    attr[v.name] = element.getAttribute(v.name);
                }
            }
            return attr;
        }, {});
    }

    generate() {
        const startAttributes = this.extractAttributes(this.from);
        const endAttributes = this.extractAttributes(this.to); 
        
        Array.from({ length: this.steps }).forEach((v, i) => {
          const element = document.createElementNS(SVG_NS, this.from.tagName);
          
          const currentAttributes = this.blendable.reduce((attr, v) => {
            attr[v] = this.lerp(startAttributes[v], endAttributes[v], (i + 1) / (this.steps + 1))
            return attr;
          }, {});
          
          Object.entries(startAttributes).forEach(([attr, val]) => {
            element.setAttribute(attr, val);
          });

          Object.entries(currentAttributes).forEach(([attr, val]) => {
            element.setAttribute(attr, val);
          });

          this.shapes.push(element);
        });
    }

    render() {
        const parent = this.from.parentElement;
        this.shapes.forEach(shape => parent.appendChild(shape));
    };

    static lerp(start, end, p) {
        if (ShapeBlend.isColor(start) && ShapeBlend.isColor(end)) {
            const startRGB = ShapeBlend.toRGB(start);
            const endRGB = ShapeBlend.toRGB(end);

            const r = ShapeBlend.pad(ShapeBlend.lerp(startRGB.r, endRGB.r, p).toString(16));
            const g = ShapeBlend.pad(ShapeBlend.lerp(startRGB.g, endRGB.g, p).toString(16));
            const b = ShapeBlend.pad(ShapeBlend.lerp(startRGB.b, endRGB.b, p).toString(16));
            
            return `#${r}${g}${b}`;
        }
        return Math.round(start * (1 - p) + end * p);
    }

    static isColor(value) {
        return typeof value === "string" && value.length > 0 && value[0] === '#';
    }

    static toRGB(hex) {
        const r = parseInt(hex.substring(1, 3), 16);
        const g = parseInt(hex.substring(3, 5), 16);
        const b = parseInt(hex.substring(5), 16);
        return { r, g, b };
    }

    static pad(value) {
        if (value.toString().length === 1) {
            return `0${value}`;
        }
        return value.toString();
    }
}

export default ShapeBlend;
