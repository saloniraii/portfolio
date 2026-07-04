/* ============================================
   SHARED COMPONENTS JS — Saloni Rai Portfolio
   Reusable scripts across all pages
   ============================================ */

// ===== Custom Cursor =====
function initCursor() {
  const cursorDot = document.getElementById('cursorDot');
  const cursorHalo = document.getElementById('cursorHalo');

  if (!cursorDot || !cursorHalo) return;

  const dotPos = { x: 0, y: 0 };
  const haloPos = { x: 0, y: 0 };
  const target = { x: 0, y: 0 };

  function lerp(start, end, factor) {
    return start + (end - start) * factor;
  }

  document.addEventListener('mousemove', (e) => {
    target.x = e.clientX;
    target.y = e.clientY;
  });

  function animate() {
    dotPos.x = lerp(dotPos.x, target.x, 0.15);
    dotPos.y = lerp(dotPos.y, target.y, 0.15);
    cursorDot.style.transform = `translate3d(${dotPos.x}px, ${dotPos.y}px, 0)`;

    haloPos.x = lerp(haloPos.x, target.x, 0.07);
    haloPos.y = lerp(haloPos.y, target.y, 0.07);
    cursorHalo.style.transform = `translate3d(${haloPos.x}px, ${haloPos.y}px, 0)`;

    requestAnimationFrame(animate);
  }

  animate();
}


// ===== Grid Background with Barrel Distortion Curve =====
function initGrid() {
  const canvas = document.getElementById('gridCanvas');
  if (!canvas) return;

  function drawGrid() {
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;

    const w = window.innerWidth;
    // Full page height — grid covers everything including scrollable area
    const h = Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
      window.innerHeight
    );

    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, w, h);

    // Tighter grid — ~24 columns for smaller squares
    const cols = 24;
    const spacing = w / cols;

    const gridColor = 'rgba(0, 0, 0, 0.08)';
    ctx.strokeStyle = gridColor;
    ctx.lineWidth = 0.5;

    // Curve starts in the last 20% of the page and keeps going
    const bendY = h * 0.80;
    const curveZone = h - bendY;

    function getCurvedPoint(flatX, flatY) {
      if (flatY <= bendY) {
        return [flatX, flatY];
      }

      // How far into the curve zone (0 at bend, keeps growing past 1)
      const t = (flatY - bendY) / curveZone;
      // Smooth cubic ease-in — gentle start, never flattens back
      const eased = t * t;

      // Y just keeps going linearly — no compression/clamping
      // The horizontal lines stay evenly spaced but the verticals bow
      const curvedY = flatY;

      // Horizontal bow — barrel distortion that keeps increasing
      const centerX = w / 2;
      const offsetX = flatX - centerX;
      const normalizedX = offsetX / (w / 2);
      const bowStrength = eased * 1.2;
      const bow = 1 + bowStrength * normalizedX * normalizedX;
      const curvedX = centerX + offsetX * bow;

      return [curvedX, curvedY];
    }

    const extraCols = 4;

    // Draw vertical lines
    for (let i = -extraCols; i <= cols + extraCols; i++) {
      const x = i * spacing;
      ctx.beginPath();
      for (let y = 0; y <= h + spacing * 6; y += 2) {
        const [cx, cy] = getCurvedPoint(x, y);
        if (y === 0) ctx.moveTo(cx, cy);
        else ctx.lineTo(cx, cy);
      }
      ctx.stroke();
    }

    // Draw horizontal lines
    const totalRows = Math.ceil((h + spacing * 6) / spacing);
    for (let j = 0; j <= totalRows; j++) {
      const y = j * spacing;
      ctx.beginPath();
      for (let x = -spacing * extraCols; x <= w + spacing * extraCols; x += 2) {
        const [cx, cy] = getCurvedPoint(x, y);
        if (x === -spacing * extraCols) ctx.moveTo(cx, cy);
        else ctx.lineTo(cx, cy);
      }
      ctx.stroke();
    }
  }

  // Draw after layout is complete
  window.addEventListener('load', drawGrid);
  window.addEventListener('resize', drawGrid);
  // Also run now in case load already fired
  if (document.readyState === 'complete') {
    drawGrid();
  } else {
    document.addEventListener('DOMContentLoaded', () => setTimeout(drawGrid, 50));
  }
}


// ===== Tooltip (programmatic) =====
// Usage: createTooltip(element, 'text', { position: 'bottom' })
function createTooltip(element, text, options = {}) {
  const { position = 'top', accent = false } = options;

  const wrapper = document.createElement('span');
  wrapper.className = 'tooltip-wrap';

  const tip = document.createElement('span');
  tip.className = 'tooltip' + (position === 'bottom' ? ' tooltip-bottom' : '') + (accent ? ' tooltip-accent' : '');
  tip.textContent = text;

  // Wrap the element
  element.parentNode.insertBefore(wrapper, element);
  wrapper.appendChild(element);
  wrapper.appendChild(tip);

  return wrapper;
}


// ===== Initialize All Components =====
function initComponents() {
  initCursor();
  initGrid();
}

// Auto-init when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initComponents);
} else {
  initComponents();
}
