# Shared Components

Reusable building blocks for the portfolio.

## Usage

Add these to any HTML page:

```html
<!-- In <head> -->
<link rel="stylesheet" href="shared/components.css" />

<!-- In <body>, before page content -->
<div class="grid-bg"><canvas id="gridCanvas"></canvas></div>
<div class="custom-cursor" id="cursorDot"><img src="cursor/cursor.svg" alt="" /></div>
<div class="cursor-halo" id="cursorHalo"><div class="cursor-ring"></div></div>

<!-- Before </body> -->
<script src="shared/components.js"></script>
```

## Components

### Buttons
```html
<a href="#" class="btn btn-primary">Primary</a>
<a href="#" class="btn btn-secondary">Secondary</a>
<a href="#" class="btn btn-ghost">Ghost</a>
<a href="#" class="btn btn-primary btn-sm">Small</a>
<a href="#" class="btn btn-primary btn-lg">Large</a>
<button class="btn btn-icon btn-secondary">+</button>
```

### Tooltips (CSS)
```html
<span class="tooltip-wrap">
  <button class="btn btn-secondary">Hover me</button>
  <span class="tooltip">I'm a tooltip!</span>
</span>

<!-- Bottom tooltip -->
<span class="tooltip-wrap">
  <button class="btn btn-primary">Below</button>
  <span class="tooltip tooltip-bottom">Below tooltip</span>
</span>

<!-- Accent tooltip -->
<span class="tooltip-wrap">
  <button class="btn btn-ghost">Accent</button>
  <span class="tooltip tooltip-accent">Red tooltip</span>
</span>
```

### Tooltips (JS)
```js
createTooltip(element, 'Tooltip text', { position: 'bottom', accent: true });
```

### Tags
```html
<span class="tag tag-filled">Filled</span>
<span class="tag tag-outline">Outline</span>
```

### Cards
```html
<div class="card">
  Card content here
</div>
```
