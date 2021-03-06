### [SVG Shape Blend](https://www.npmjs.com/package/svg-shape-blend)

Declarative library supporting Adobe Illustrator like blending functionality between primitive circle and rect shapes

# Install
```bash
npm i svg-shape-blend
```

# Import 
```javascript
// ES6 usage, import default export
import BlendSVG from 'svg-shape-blend';

// Call somewhere in your code
BlendSVG();
```

```javascript
// ES5 -> Check src/example/index.html
```

# Declare

```html
<svg width="500" height="500">
  <defs>
    <blend from="#c1" to="#c2" steps="20"/>
    <blend from="#c2" to="#c3" steps="30"/>
    <blend from="#c3" to="#c4" steps="40"/>
    <blend from="#c4" to="#c5" steps="30"/>
  </defs>
  <circle id="c1" r="10" cx="20" cy="20" fill="#ffd700"></circle>
  <circle id="c2" r="20" cx="40" cy="100" fill="#7fffd4"></circle>
  <circle id="c3" r="50" cx="200" cy="80" fill="#6495ed"></circle>
  <circle id="c4" r="15" cx="120" cy="180" fill="#ed143d"></circle>
  <circle id="c5" r="30" cx="240" cy="250" fill="#ffd700"></circle>
</svg>
```

![Circle example](/src/examples/test1.png)


```html
<svg width="500" height="500">
  <defs>
    <blend from="#r1" to="#r2" steps="40"/>
    <blend from="#r2" to="#r3" steps="80"/>
    <blend from="#r3" to="#r4" steps="80"/>
    <blend from="#r4" to="#r5" steps="60"/>
  </defs>
  <rect id="r1" width="10" height="10" x="20" y="20" fill="#ffd700"></rect>
  <rect id="r2" width="20" height="20" x="40" y="100" fill="#7fffd4"></rect>
  <rect id="r3" width="80" height="80" x="200" y="40" fill="#6495ed"></rect>
  <rect id="r4" width="30" height="30" x="120" y="180" fill="#ed143d"></rect>
  <rect id="r5" width="60" height="60" x="200" y="240" fill="#ffd700"></rect>
</svg>
```

![Rect example](/src/examples/test2.png)


```html
<svg width="500" height="500">
  <defs>
    <blend from="#c6" to="#c7" steps="10"/>
    <blend from="#c7" to="#c8" steps="10"/>
  </defs>
  <circle id="c6" r="10" cx="20" cy="20" stroke="#7fffd4" stroke-width="3" fill="#ffffff"></circle>
  <circle id="c7" r="50" cx="140" cy="100" stroke="#ed143d" stroke-width="5" fill="#ffffff"></circle>
  <circle id="c8" r="30" cx="80" cy="250" stroke="#ffd700" stroke-width="2" fill="#ffffff"></circle>
</svg>
```

![Circle example 2](/src/examples/test3.png)

Currently only primitive rect and circle types are supported
