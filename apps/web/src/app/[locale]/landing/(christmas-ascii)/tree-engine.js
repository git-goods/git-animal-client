/*
 * QR Tree engine
 * ----------------------------------------------------------------------------
 * 1. qrEncode(text)  - QR encoder (byte mode, ECC level M, versions 2-20).
 *                      Verified module-for-module against the Python `qrcode` library.
 * 2. points(text, key) - builds the 3D point cloud for a tree. Needles only grow
 *                      above the QR's DARK modules, so looking straight down the
 *                      tree reads as the code.
 * 3. draw(ctx, W, H, text, key, opts) - renders one frame as ASCII glyphs with a
 *                      z-buffer, plus star, baubles, snow, glow and the QR assembly.
 *
 * opts: { cam 0..1 (0 = straight down / QR, 1 = side view / tree),
 *         grow 0..1, drop 0..1 (QR assembly progress), treeMix, time (s),
 *         dpr, fs (glyph px), fill, fall (snow), baubles, bloom }
 *
 * Exported as createTreeEngine().
 */
/* eslint-disable */
// 원본: xmasqr.vercel.app (catherinee.md), 사용 허락 받음
export function createTreeEngine() {
  function qrEncode(text, forceMask) {
    var bytes = [];
    var u = unescape(encodeURIComponent(text));
    for (var i = 0; i < u.length; i++) bytes.push(u.charCodeAt(i) & 255);
    var ECC = [0, 10, 16, 26, 18, 24, 16, 18, 22, 22, 26, 30, 22, 22, 24, 24, 28, 28, 26, 26, 26];
    var BLK = [0, 1, 1, 1, 2, 2, 4, 4, 4, 5, 5, 5, 8, 9, 9, 10, 10, 11, 13, 14, 16];
    function rawMods(v) { var r = (16 * v + 128) * v + 64; if (v >= 2) { var na = Math.floor(v / 7) + 2; r -= (25 * na - 10) * na - 55; if (v >= 7) r -= 36; } return r; }
    function dataCw(v) { return Math.floor(rawMods(v) / 8) - ECC[v] * BLK[v]; }
    var ver = 0;
    for (var v = 2; v <= 20; v++) { var cc = v < 10 ? 8 : 16; if (4 + cc + bytes.length * 8 <= dataCw(v) * 8) { ver = v; break; } }
    if (!ver) { ver = 20; bytes = bytes.slice(0, 800); }
    var bits = [];
    function put(val, n) { for (var j = n - 1; j >= 0; j--) bits.push((val >>> j) & 1); }
    put(4, 4); put(bytes.length, ver < 10 ? 8 : 16);
    bytes.forEach(function (b) { put(b, 8); });
    var cap = dataCw(ver) * 8;
    put(0, Math.min(4, cap - bits.length));
    put(0, (8 - bits.length % 8) % 8);
    for (var pad = 0xEC; bits.length < cap; pad ^= 0xEC ^ 0x11) put(pad, 8);
    var data = [];
    for (var k = 0; k < bits.length; k += 8) { var by = 0; for (var q = 0; q < 8; q++) by = (by << 1) | bits[k + q]; data.push(by); }
    function mul(x, y) { var z = 0; for (var t = 7; t >= 0; t--) { z = (z << 1) ^ ((z >>> 7) * 0x11D); z ^= ((y >>> t) & 1) * x; } return z & 255; }
    function divisor(deg) { var r = []; for (var t = 0; t < deg - 1; t++) r.push(0); r.push(1); var root = 1; for (var a = 0; a < deg; a++) { for (var b = 0; b < r.length; b++) { r[b] = mul(r[b], root); if (b + 1 < r.length) r[b] ^= r[b + 1]; } root = mul(root, 2); } return r; }
    function rem(dat, dv) { var r = dv.map(function () { return 0; }); dat.forEach(function (b) { var f = b ^ r.shift(); r.push(0); dv.forEach(function (c, idx) { r[idx] ^= mul(c, f); }); }); return r; }
    var nb = BLK[ver], ec = ECC[ver], raw = Math.floor(rawMods(ver) / 8);
    var nShort = nb - raw % nb, shortLen = Math.floor(raw / nb), dv = divisor(ec), blocks = [];
    for (var bi = 0, p = 0; bi < nb; bi++) {
      var dat = data.slice(p, p + shortLen - ec + (bi < nShort ? 0 : 1)); p += dat.length;
      var e = rem(dat, dv); if (bi < nShort) dat.push(0); blocks.push(dat.concat(e));
    }
    var all = [];
    for (var ii = 0; ii < blocks[0].length; ii++) blocks.forEach(function (bl, j) { if (ii !== shortLen - ec || j >= nShort) all.push(bl[ii]); });
    var N = ver * 4 + 17, M = [], F = [];
    for (var y = 0; y < N; y++) { M.push(new Array(N).fill(0)); F.push(new Array(N).fill(0)); }
    function fn(x, y, d) { M[y][x] = d ? 1 : 0; F[y][x] = 1; }
    for (var t6 = 0; t6 < N; t6++) { fn(6, t6, t6 % 2 === 0); fn(t6, 6, t6 % 2 === 0); }
    function finder(cx, cy) { for (var dy = -4; dy <= 4; dy++) for (var dx = -4; dx <= 4; dx++) { var d = Math.max(Math.abs(dx), Math.abs(dy)), xx = cx + dx, yy = cy + dy; if (xx >= 0 && xx < N && yy >= 0 && yy < N) fn(xx, yy, d !== 2 && d !== 4); } }
    finder(3, 3); finder(N - 4, 3); finder(3, N - 4);
    var na = Math.floor(ver / 7) + 2, step = Math.ceil((ver * 4 + 4) / (na * 2 - 2)) * 2, pos = [6];
    for (var ps = N - 7; pos.length < na; ps -= step) pos.splice(1, 0, ps);
    for (var ai = 0; ai < na; ai++) for (var aj = 0; aj < na; aj++) {
      if ((ai === 0 && aj === 0) || (ai === 0 && aj === na - 1) || (ai === na - 1 && aj === 0)) continue;
      for (var ady = -2; ady <= 2; ady++) for (var adx = -2; adx <= 2; adx++) fn(pos[ai] + adx, pos[aj] + ady, Math.max(Math.abs(adx), Math.abs(ady)) !== 1);
    }
    function format(mask) {
      var d = (0 << 3) | mask, r = d; for (var t = 0; t < 10; t++) r = (r << 1) ^ ((r >>> 9) * 0x537);
      var b = ((d << 10) | r) ^ 0x5412, g = function (i) { return (b >>> i) & 1; };
      for (var i = 0; i <= 5; i++) fn(8, i, g(i));
      fn(8, 7, g(6)); fn(8, 8, g(7)); fn(7, 8, g(8));
      for (var i2 = 9; i2 < 15; i2++) fn(14 - i2, 8, g(i2));
      for (var i3 = 0; i3 < 8; i3++) fn(N - 1 - i3, 8, g(i3));
      for (var i4 = 8; i4 < 15; i4++) fn(8, N - 15 + i4, g(i4));
      fn(8, N - 8, 1);
    }
    format(0);
    if (ver >= 7) {
      var r7 = ver; for (var t7 = 0; t7 < 12; t7++) r7 = (r7 << 1) ^ ((r7 >>> 11) * 0x1F25);
      var vb = (ver << 12) | r7;
      for (var i7 = 0; i7 < 18; i7++) { var bit = (vb >>> i7) & 1, a = N - 11 + i7 % 3, b7 = Math.floor(i7 / 3); fn(a, b7, bit); fn(b7, a, bit); }
    }
    var bi2 = 0;
    for (var right = N - 1; right >= 1; right -= 2) {
      if (right === 6) right = 5;
      for (var vert = 0; vert < N; vert++) for (var jj = 0; jj < 2; jj++) {
        var x = right - jj, up = ((right + 1) & 2) === 0, yy2 = up ? N - 1 - vert : vert;
        if (!F[yy2][x] && bi2 < all.length * 8) { M[yy2][x] = (all[bi2 >>> 3] >>> (7 - (bi2 & 7))) & 1; bi2++; }
      }
    }
    function maskFn(m, x, y) {
      switch (m) {
        case 0: return (x + y) % 2 === 0; case 1: return y % 2 === 0; case 2: return x % 3 === 0; case 3: return (x + y) % 3 === 0;
        case 4: return (Math.floor(x / 3) + Math.floor(y / 2)) % 2 === 0; case 5: return x * y % 2 + x * y % 3 === 0;
        case 6: return (x * y % 2 + x * y % 3) % 2 === 0; default: return ((x + y) % 2 + x * y % 3) % 2 === 0;
      }
    }
    function applyMask(m) { for (var y = 0; y < N; y++) for (var x = 0; x < N; x++) if (!F[y][x] && maskFn(m, x, y)) M[y][x] ^= 1; }
    function penalty() {
      var s = 0, dark = 0;
      for (var y = 0; y < N; y++) for (var dir = 0; dir < 2; dir++) {
        var run = 0, prev = -1;
        for (var x = 0; x < N; x++) { var c = dir ? M[x][y] : M[y][x]; if (c === prev) { run++; if (run === 5) s += 3; else if (run > 5) s++; } else { run = 1; prev = c; } }
      }
      for (var y2 = 0; y2 < N - 1; y2++) for (var x2 = 0; x2 < N - 1; x2++) { var c2 = M[y2][x2]; if (c2 === M[y2][x2 + 1] && c2 === M[y2 + 1][x2] && c2 === M[y2 + 1][x2 + 1]) s += 3; }
      var pat = [1, 0, 1, 1, 1, 0, 1];
      for (var y3 = 0; y3 < N; y3++) for (var x3 = 0; x3 + 7 <= N; x3++) {
        var h = true, vv = true;
        for (var k3 = 0; k3 < 7; k3++) { if (M[y3][x3 + k3] !== pat[k3]) h = false; if (M[x3 + k3][y3] !== pat[k3]) vv = false; }
        if (h) s += 40; if (vv) s += 40;
      }
      for (var y4 = 0; y4 < N; y4++) for (var x4 = 0; x4 < N; x4++) dark += M[y4][x4];
      s += Math.floor(Math.abs(dark * 20 - N * N * 10) / (N * N)) * 10;
      return s;
    }
    var best = forceMask === undefined ? -1 : forceMask, bestS = 1e9;
    if (best < 0) for (var m = 0; m < 8; m++) { applyMask(m); format(m); var sc = penalty(); if (sc < bestS) { bestS = sc; best = m; } applyMask(m); }
    applyMask(best); format(best);
    return { N: N, ver: ver, M: M };
  }

  function hash(x, y, s) {
    var h = (Math.imul(x | 0, 374761393) + Math.imul(y | 0, 668265263) + Math.imul((s | 0) + 1, 1442695041)) | 0;
    h = Math.imul(h ^ (h >>> 13), 1274126177); h ^= h >>> 16;
    return (h >>> 0) / 4294967296;
  }
  function rng(seed) { var a = seed >>> 0; return function () { a = (a + 0x6D2B79F5) | 0; var t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
  function clamp(v) { return v < 0 ? 0 : v > 1 ? 1 : v; }
  function ease(t) { return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }
  function rgb(hex) { var n = parseInt(hex.slice(1), 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255]; }
  function lerpc(a, b, t) { return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t]; }
  function css(c, k) { return 'rgb(' + Math.round(Math.min(255, c[0] * k)) + ',' + Math.round(Math.min(255, c[1] * k)) + ',' + Math.round(Math.min(255, c[2] * k)) + ')'; }
  var V = {
    plain: { finder: '#5A66D9', short: 'QR', name: 'QR only', leaf: ['#E6E6EA', '#E6E6EA', '#E6E6EA'], orn: [], ornRate: 0, lights: [], lightRate: 0, star: '#FFFFFF', trunk: '#E6E6EA', bloom: 0.25 },
    snow: { baubles: ['#9FD0FF', '#EEF3FA', '#5E8FD8', '#C9D6EE'], finder: '#4F8FE0', short: 'Snowy', hi: '#DDEBFF', name: 'Snow-covered pine', blurb: 'Dark pine under thick snow, icy baubles and cool white lights.', leaf: ['#0F3626', '#1A5038', '#2A6E50'],
      snowC: '#FFFFFF', caps: 0.95, capBand: 0.5, orn: ['#9FD0FF', '#EEF3FA'], ornRate: 0.05, lights: ['#FFFFFF', '#DDEBFF'], lightRate: 0.08, star: '#E6F0FF', starHi: '#FFFFFF', trunk: '#5A4A40', cap: '#C9D6EE', flakes: 240, bloom: 0.7 },
    lace: { baubles: ['#E0302C', '#E8B44A', '#3FA7E0', '#D0D6E2'], finder: '#C8302F', short: 'Lace', name: 'Green, white lacing', blurb: 'Deep green tiers with a white lace edge on each bough.', leaf: ['#1C7A3E', '#2FA04E', '#5CC468'],
      laceC: '#FFFFFF', laceBand: 0.66, orn: ['#FF4A3D', '#F2C14E', '#3FA7E0', '#C46BE0'], ornRate: 0.07, lights: ['#FFF3B0'], lightRate: 0.05, star: '#F6C945', trunk: '#8B5A3A', bloom: 0.55 },
    blue: { baubles: ['#4D7CFF', '#FF5C93', '#C9D2F0', '#E8C77A'], finder: '#3D6BFF', short: 'Midnight', hi: '#D2DCFF', name: 'Midnight blue', blurb: 'Deep blue tree, lavender frost, blue and pink fairy lights.', leaf: ['#1F3566', '#3456A0', '#5A80D0'],
      snowC: '#B9BCEA', caps: 0.45, garland: '#F2C14E', orn: ['#4D7CFF', '#FF5C93', '#8FB3FF'], ornRate: 0.08, lights: ['#5C8BFF', '#FF5C93', '#9FC0FF'], lightRate: 0.18, star: '#F59E2B', trunk: '#4A4F6A', bloom: 0.9 },
    classic: { finder: '#C8302F', short: 'Classic', name: 'Classic green & red', blurb: 'Green tiers, red baubles, a gold garland and a gold star.', leaf: ['#1F6A3E', '#2F9150', '#5DBE62'],
      garland: '#E8B44A', orn: ['#E03A36', '#FF5A4A', '#D42A2A'], ornRate: 0.1, baubles: ['#E0302C', '#E8B44A', '#D0D6E2', '#E0302C', '#3A7BE0'], lights: ['#FFD36B'], lightRate: 0.04, star: '#F7C23E', trunk: '#9A5A34', bloom: 0.9, hearts: true },
    mono: { baubles: ['#FFFFFF', '#FFFFFF', '#F0F0F0'], finder: '#FFFFFF', short: 'Mono', hi: '#FFFFFF', name: 'Black & white', blurb: 'White glyphs on black. Nothing else.', leaf: ['#E4E4E4', '#F2F2F2', '#FFFFFF'],
      garland: '#FFFFFF', orn: ['#FFFFFF'], ornRate: 0.06, lights: ['#FFFFFF'], lightRate: 0.04, star: '#FFFFFF', trunk: '#FFFFFF', bloom: 0.3, starHi: '#FFFFFF', cap: '#BDBDBD' },
    glitch: { baubles: ['#FF2E9A', '#FFD21A', '#19E3FF', '#2BFF88'], finder: '#E0207F', short: 'Glitch', hi: '#D6F6FF', name: 'Glitch', blurb: 'Electric blues, neon baubles and chunky block glyphs.', leaf: ['#1546E8', '#19A8FF', '#7FD8FF'],
      orn: ['#FF2E9A', '#FFD21A', '#2BFF88', '#19E3FF'], ornRate: 0.22, lights: ['#FF2E9A'], lightRate: 0.05, star: '#FFE36B', trunk: '#5A3AC0', bloom: 0.7, glitch: true },
    dots: { baubles: ['#FF2340', '#D8102C', '#FF4A5E'], finder: '#E8203C', short: 'Silver', hi: '#FFFFFF', name: 'Dot-matrix silver', blurb: 'Silver LED dots and a few wine-red baubles.', leaf: ['#8A8A92', '#C4C4CC', '#FFFFFF'],
      orn: ['#FF2340', '#D8102C'], ornRate: 0.09, lights: ['#FFFFFF', '#FF6A7A'], lightRate: 0.08, star: '#FFFFFF', trunk: '#8A8A90', bloom: 1, dot: true },
    neon: { baubles: ['#FF4D4D', '#FFD23F', '#3FA7FF', '#FF7AE0', '#FF9A3C'], finder: '#2D7FF0', short: 'Neon', name: 'Neon terminal', blurb: 'Bright green glyphs packed with rainbow lights.', leaf: ['#1FA34A', '#36C45A', '#7CE07A'],
      garland: '#FFD23F', orn: ['#FF4D4D', '#FFD23F', '#3FA7FF', '#FF7AE0', '#FF9A3C'], ornRate: 0.15, lights: ['#FFFFFF', '#FFD23F'], lightRate: 0.07, star: '#FFB23C', trunk: '#E23B3B', bloom: 1, hearts: true }
  };
  // newer variations (third row of the picker)
  var EXTRA = {
    fairy: { baubles: ['#D8A84E', '#F4ECD8', '#B07A3A', '#FFE7A8'], finder: '#D8A84E', short: 'Fairy', hi: '#C9CFBE', name: 'Fairy-lit flocked', blurb: 'Dark spruce with frosted tips, a warm gold fairy-light garland and champagne baubles.', leaf: ['#141A15', '#26302A', '#5E6A5C'],
      snowC: '#AEB5A4', caps: 0.18, garland: '#FFD27A', orn: ['#FFD27A'], ornRate: 0.04, lights: ['#FFD98A', '#FFC25A'], lightRate: 0.16, star: '#FFE3A0', starHi: '#FFF6DC', trunk: '#3A2E24', cap: '#B08A4A', bauN: 60, bauGap: 1.0, bloom: 1 },
    ribbon: { baubles: ['#FFFFFF', '#A0104E', '#FFE3A0', '#7A0A3C'], finder: '#E8407A', short: 'Pink', hi: '#FFC2D8', name: 'Pink ribbon', blurb: 'Pink tree with a hot-pink ribbon and pink and pearl baubles. Turn baubles off for the pure ASCII glow.', leaf: ['#C2386A', '#E85F94', '#FF9CC0'],
      garland: '#FF4F8E', laceC: '#FFFFFF', orn: ['#FFFFFF'], ornRate: 0.03, lights: ['#FFF1CC'], lightRate: 0.1, star: '#FFFFFF', starHi: '#FFFFFF', trunk: '#9A5A6E', cap: '#E8C9D2', bauN: 120, bauGap: 1.4, bauEven: true, bloom: 0.8 },
    blush: { baubles: ['#FF5C9A', '#FFFFFF', '#E8407A', '#FF9EC2'], finder: '#E86A96', short: 'Blush', hi: '#E8F2DA', name: 'Green with pink ribbon', blurb: 'Green tree wound with pink and white ribbon, pink and pearl baubles and warm lights.', leaf: ['#1E5A34', '#2F7A46', '#5FA86A'],
      garland: '#FF8DB4', laceC: '#FFFFFF', orn: ['#F4A6C0', '#FFFFFF'], ornRate: 0.08, lights: ['#FFF1CC', '#FFE6A8'], lightRate: 0.18, star: '#FFFFFF', starHi: '#FFFFFF', trunk: '#7A5A44', cap: '#E8DCC8', bauN: 78, bauGap: 0.7, bloom: 1 },
  };
  for (var ek in EXTRA) V[ek] = EXTRA[ek];
  var KEYS = ['snow', 'lace', 'blue', 'classic', 'mono', 'glitch', 'dots', 'neon'];
  var qrCache = {};
  function getQR(text) { if (!qrCache[text]) qrCache[text] = qrEncode(text || ' '); return qrCache[text]; }
  function geom(qr) {
    var N = qr.N, Q = 4, S = N + 2 * Q, C = S / 2, R0 = N * 0.5, H = Math.round(N * 1.08), T = 5;
    return { N: N, Q: Q, S: S, C: C, R0: R0, H: H, T: T,
      dark: function (x, z) { var mx = x - Q, mz = z - Q; return mx >= 0 && mz >= 0 && mx < N && mz < N && qr.M[mz][mx] === 1; },
      prof: function (y) { var u = y / H, tp = ((1 - u) * T) % 1; if (u <= 0) tp = 0.999; var env = R0 * (1 - u) + 1.4; return { R: env * (0.7 + 0.3 * tp), tp: tp }; } };
  }
  var ptsCache = {};
  function points(text, key) {
    var ck = key + '\u0000' + text;
    if (ptsCache[ck]) return ptsCache[ck];
    var qr = getQR(text), g = geom(qr), v = V[key] || V.plain, tree = key !== 'plain' && !!V[key];
    var R = rng(12345 + text.length * 7 + key.length * 131), K = tree ? 62000 : 0;
    var cols = [], cIdx = {};
    function P(hex) { if (cIdx[hex] === undefined) { cIdx[hex] = cols.length; cols.push(rgb(hex)); } return cIdx[hex]; }
    v.leaf.forEach(P);
    var dl = [];
    for (var mz = 0; mz < g.N; mz++) for (var mx = 0; mx < g.N; mx++) if (qr.M[mz][mx] && Math.hypot(mx + g.Q + 0.5 - g.C, mz + g.Q + 0.5 - g.C) < g.R0 + 0.8) dl.push([mx + g.Q, mz + g.Q]);
    var X = [], Y = [], Z = [], TY = [], CI = [], NX = [], NZ = [], OUT = [], GR = [], HH = [], NYb = [];
    var tries = 0;
    while (X.length < K && tries < K * 40 && dl.length) {
      tries++;
      var m = dl[Math.floor(R() * dl.length)], x = m[0] + 0.06 + R() * 0.88, z = m[1] + 0.06 + R() * 0.88, y = R() * g.H;
      var dx = x - g.C, dz = z - g.C, r = Math.hypot(dx, dz) || 0.001, pr = g.prof(y);
      if (r > pr.R || r < pr.R - 5.5) continue;
      var outer = r > pr.R - 1.4, ty = 0, ci = 1, h = R();
      if (v.laceC && outer && pr.tp > (v.laceBand || 0.84)) { ty = 6; ci = P(v.laceC); }
      else if (v.snowC && outer && pr.tp < (v.capBand || 0.32) && h < v.caps) { ty = 4; ci = P(v.snowC); }
      else if (v.garland && outer && ((Math.atan2(dz, dx) / 6.2832 + y / g.H * 3.5) % 1 + 1) % 1 < 0.045) { ty = 3; ci = P(v.garland); }
      else if (outer && v.hearts && h < v.ornRate * 0.025) { ty = 10; ci = P('#FF7AB8'); }
      else if (outer && h > 0.8) { ty = 11; ci = P(v.hi || '#EEFBEA'); }
      else if (outer && h < v.ornRate * 0.35) { ty = 1; ci = P(v.orn[Math.floor(R() * v.orn.length)]); }
      else if (outer && h < v.ornRate) { ty = 14; ci = P(v.orn[Math.floor(R() * v.orn.length)]); }
      else if (outer && h < v.ornRate + v.lightRate) { ty = 2; ci = P(v.lights[Math.floor(R() * v.lights.length)]); }
      X.push(x); Y.push(y); Z.push(z); TY.push(ty); CI.push(ci); NX.push(dx / r); NZ.push(dz / r); OUT.push(outer ? 1 : 0.7);
      GR.push((y / g.H) * 0.82 + R() * 0.14); HH.push(R());
    }
    var nLeaf = X.length;
    for (var fillI = 0; fillI < nLeaf; fillI++) NYb.push(0.5);
    if (tree) {
      var bpal = v.baubles || v.orn, baubles = [], want = v.bauN === undefined ? 44 : v.bauN, cap = P(v.cap || '#D9B45A'), att = 0;
      var minGap = v.bauGap === undefined ? 2.0 : v.bauGap;
      if (v.bauEven) {
        // even scatter ("best candidate"): each new bauble takes the spot, out of 40 area-weighted tries,
        // that is furthest from every bauble already placed; stop once no spot keeps the minimum gap
        while (baubles.length < want) {
          var best = null, bestGap = -1e9;
          for (var cand = 0; cand < 40; cand++) {
            var cy = g.H * (0.06 + 0.8 * (1 - Math.sqrt(R()))), cp0 = g.prof(cy);
            var cr = (1.0 + R() * 0.25) * (1 - cy / g.H * 0.35), ca0 = R() * Math.PI * 2, cR = cp0.R - cr * 0.2;
            var cx = g.C + Math.cos(ca0) * cR, cz = g.C + Math.sin(ca0) * cR, gap = 1e9;
            for (var bj = 0; bj < baubles.length; bj++) { var q2 = baubles[bj]; gap = Math.min(gap, Math.hypot(q2[0] - cx, q2[1] - cy, q2[2] - cz) - q2[3] - cr); }
            if (gap > bestGap) { bestGap = gap; best = [cx, cy, cz, cr]; }
          }
          if (bestGap < minGap) break;
          best.push(P(bpal[baubles.length % bpal.length])); baubles.push(best);
        }
      } else while (baubles.length < want && att < 8000) {
        att++;
        var by = g.H * (0.06 + R() * 0.8), bp = g.prof(by);
        if (bp.tp < (v.bauTp === undefined ? 0.45 : v.bauTp)) continue;
        var br = (1.0 + R() * 0.25) * (1 - by / g.H * 0.35), ba = R() * Math.PI * 2, bR = bp.R - br * 0.2;
        var bx = g.C + Math.cos(ba) * bR, bz = g.C + Math.sin(ba) * bR, ok = true;
        for (var bi = 0; bi < baubles.length; bi++) { var q = baubles[bi]; if (Math.hypot(q[0] - bx, q[1] - by, q[2] - bz) < q[3] + br + minGap) { ok = false; break; } }
        if (!ok) continue;
        baubles.push([bx, by, bz, br, P(bpal[baubles.length % bpal.length])]);
      }
      baubles.forEach(function (bb) {
        var cnt = Math.round(330 * bb[3] * bb[3]);
        for (var k = 0; k < cnt; k++) {
          var u2 = R() * 2 - 1, th = R() * 6.2832, sq = Math.sqrt(1 - u2 * u2), nx = sq * Math.cos(th), nz = sq * Math.sin(th), ny = u2;
          X.push(bb[0] + nx * bb[3]); Y.push(bb[1] + ny * bb[3] * 0.95); Z.push(bb[2] + nz * bb[3]);
          var isCap = ny > 0.9;
          TY.push(isCap ? 13 : 12); CI.push(isCap ? cap : bb[4]); NX.push(nx); NZ.push(nz); NYb.push(ny); OUT.push(1);
          GR.push((bb[1] / g.H) * 0.82); HH.push(R());
        }
      });
      var ti = P(v.trunk);
      for (var t = 0; t < 1600; t++) {
        var m2 = dl[Math.floor(R() * dl.length)], x2 = m2[0] + R(), z2 = m2[1] + R(), r2 = Math.hypot(x2 - g.C, z2 - g.C);
        if (r2 > 1.7) continue;
        NYb.push(0); X.push(x2); Y.push(R() * g.H * 0.16); Z.push(z2); TY.push(5); CI.push(ti); NX.push((x2 - g.C) / (r2 || 1)); NZ.push((z2 - g.C) / (r2 || 1)); OUT.push(0.8); GR.push(R() * 0.1); HH.push(R());
      }
    }
    var nTree = X.length;
    for (var gz = 0; gz < g.S; gz++) for (var gx = 0; gx < g.S; gx++) {
      var d = g.dark(gx, gz) ? 1 : 0;
      for (var sz = 0; sz < 3; sz++) for (var sx = 0; sx < 3; sx++) {
        NYb.push(1); X.push(gx + (sx + 0.5) / 3); Y.push(0); Z.push(gz + (sz + 0.5) / 3); TY.push(d ? 8 : 7); CI.push(0); NX.push(0); NZ.push(0); OUT.push(1);
        GR.push(hash(gx, gz, 1) * 0.5 + (gz / g.S) * 0.4); HH.push(hash(gx * 3 + sx, gz * 3 + sz, 2));
      }
    }
    for (var f = 0; f < 3200; f++) {
      var a = R() * 6.2832, rr = g.S * (0.74 + R() * 0.7), fx = g.C + Math.cos(a) * rr, fz = g.C + Math.sin(a) * rr;
      if (fx > -0.5 && fx < g.S + 0.5 && fz > -0.5 && fz < g.S + 0.5) continue;
      NYb.push(1); X.push(fx); Y.push(0); Z.push(fz); TY.push(9); CI.push(0); NX.push(0); NZ.push(0); OUT.push(1); GR.push(0); HH.push(R());
    }
    var o = { v: v, g: g, qr: qr, tree: tree, cols: cols, n: X.length, nTree: nTree, bl: tree ? baubles : [],
      X: new Float32Array(X), Y: new Float32Array(Y), Z: new Float32Array(Z), TY: new Uint8Array(TY), CI: new Uint8Array(CI),
      NX: new Float32Array(NX), NZ: new Float32Array(NZ), NY: new Float32Array(NYb), OUT: new Float32Array(OUT), GR: new Float32Array(GR), HH: new Float32Array(HH) };
    ptsCache[ck] = o;
    return o;
  }
  var MONO = '"Geist Mono", ui-monospace, Menlo, monospace';
  var RAMP = '@@@%%##**+=-';
  var DOTR = '\u25CF\u25CF\u2022\u2022\u2022\u2219\u00B7\u00B7.';
  var GLR = '\u2588\u2593\u2592\u2591#%@*+=-:.';
  var POOL = '!<>/\\[]{}=+*^?#%@&';
  var buf = { n: 0 };
  var flakes = [];
  for (var fl0 = 0; fl0 < 240; fl0++) flakes.push({ x: hash(fl0, 1, 41), y: hash(fl0, 2, 41), sp: 0.025 + 0.05 * hash(fl0, 3, 41), ph: hash(fl0, 4, 41) * 6.28 });
  function draw(ctx, W, H, text, key, o) {
    var pc = points(text, key), v = pc.v, g = pc.g, time = o.time || 0, cam = o.cam, grow = o.grow, drop = o.drop === undefined ? 1 : o.drop, dpr = o.dpr || 1;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over'; ctx.filter = 'none';
    var fs = o.fs || 8, cw = fs * 0.6, ch = Math.round(fs * 1.1);
    var cols = Math.floor(W / cw), rows = Math.floor(H / ch), nc = cols * rows;
    if (buf.n < nc) { buf.z = new Float32Array(nc); buf.p = new Int32Array(nc); buf.f = new Float32Array(nc); buf.n = nc; }
    var zb = buf.z, pb = buf.p, fb = buf.f;
    for (var i = 0; i < nc; i++) { zb[i] = -1e9; pb[i] = -1; }
    // camera: tilt from straight down to almost side-on, slow continuous spin
    var turn = 0.62 + (10 * Math.PI / 180) * (0.5 - 0.5 * Math.cos(time * 2.0));
    var al = (90 - 80 * cam) * Math.PI / 180, ps = cam * turn;
    var cp = Math.cos(ps), sp = Math.sin(ps), sa = Math.sin(al), ca = Math.cos(al);
    var S = g.S, rad = S * 0.72, bw = 2 * rad, hTop = 1 + (g.H + 4) * clamp(o.treeMix === undefined ? grow : o.treeMix);
    // frame the two end states (tree side-on, QR top-down) and blend between them, so the move never zooms out mid-way
    function frameAt(c) {
      var a2 = (90 - 80 * c) * Math.PI / 180, s2 = Math.sin(a2), c2 = Math.cos(a2), ht = 1 + (g.H + 4) * c;
      var bh2 = Math.max(S * s2 + ht * c2, 1), w2 = c > 0.5 ? S * 1.05 : S;
      var z = Math.min(W * (o.fill || 0.86) * (0.8 + 0.2 * c) / Math.max(w2, S * 0.9), H * (o.fill || 0.86) * (0.8 + 0.2 * c) / bh2);
      return [z, (ht * c2 - S * s2 * 0.5) * z / 2 + S * s2 * z * 0.25];
    }
    var fT = frameAt(1), fQ = frameAt(0), mixF = cam;
    var zoom = fQ[0] + (fT[0] - fQ[0]) * mixF;
    var ox = o.centerX != null ? o.centerX : W / 2, oy = H / 2 + fQ[1] + (fT[1] - fQ[1]) * mixF + (o.treeDrop || 0) * H * mixF;   // treeDrop: nudge the tree view down (used on phones)
    var persp = 0.018 * cam;
    var sway = cam * clamp(grow), sw1 = Math.sin(time * 1.05), sw2 = Math.cos(time * 0.77), sw3 = time * 2.0;
    var bOn = o.baubles !== false;
    var limit = o.maxPts ? Math.min(pc.nTree, o.maxPts) : pc.nTree;
    // collapse: as the camera drops, the tree scatters outward and falls onto its own QR squares (reverse = it rises back out)
    var sink = o.sink ? clamp(o.sink) : 0;   // optional collapse effect (off by default)
    for (var k = 0; k < pc.n; k++) {
      if (k >= limit && k < pc.nTree) continue;
      var ty = pc.TY[k];
      if (ty === 9 && cam < 0.25) continue;
      if (!bOn && (ty === 12 || ty === 13)) continue;
      var Y = pc.Y[k], X = pc.X[k] - g.C, Z = pc.Z[k] - g.C;
      if (k < pc.nTree) {
        if (grow < pc.GR[k]) continue;
        if (sink > 0) {
          var st = 0.3 * (1 - Y / g.H) + 0.7 * pc.HH[k];          // top and random points go first
          var lc = clamp((sink - st * 0.45) / 0.55), le = lc * lc * (3 - 2 * lc);
          var burst = Math.sin(Math.PI * le) * (2.5 + 5 * hash(k, 3, 61)) * (0.5 + 0.8 * Y / g.H);
          var land = (pc.X[k] - Math.floor(pc.X[k]) - 0.5) * le, landZ = (pc.Z[k] - Math.floor(pc.Z[k]) - 0.5) * le;
          X += pc.NX[k] * burst - land * 0.6; Z += pc.NZ[k] * burst - landZ * 0.6;   // swing out, then settle to the module centre
          Y = Y * (1 - le) + Math.sin(Math.PI * Math.min(1, le * 1.4)) * (1.5 + 3 * hash(k, 4, 61));
        }
      }
      var xp = X * cp - Z * sp, zp = X * sp + Z * cp;
      var pf = 1 / (1 - zp * persp);
      var sx = ox + xp * zoom * pf, sy = oy + (zp * sa - Y * ca) * zoom * pf, dep = zp * ca + Y * sa;
      var cx = Math.floor(sx / cw), cy = Math.floor(sy / ch);
      if (cx < 0 || cy < 0 || cx >= cols || cy >= rows) continue;
      var ci = cy * cols + cx;
      if (dep > zb[ci]) { zb[ci] = dep; pb[ci] = k; fb[ci] = zp; }
    }
    var topdown = clamp(1 - cam / 0.35);
    ctx.fillStyle = '#0D0D0F'; ctx.fillRect(0, 0, W, H);
    ctx.font = fs + 'px ' + MONO; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = '#FFFFFF';
    for (var by = 0; by < rows; by++) for (var bx = 0; bx < cols; bx++) {
      var bn = hash(bx, by, 97); if (bn > 0.07) continue;
      var cl = 0.5 + 0.5 * Math.sin(bx * 0.09 + by * 0.21) * Math.cos(by * 0.13 - bx * 0.04);
      ctx.globalAlpha = (0.05 + 0.1 * cl) * (o.plate === 'light' ? 1 - topdown * 0.7 : 1 - topdown); ctx.fillText(bn < 0.02 ? ':' : '.', bx * cw + cw / 2, by * ch + ch / 2);
    }
    ctx.globalAlpha = 1;
    ctx.font = fs + 'px ' + MONO; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    var groups = {}, gkeys = [];
    function emit(col, chr, x, y) { var gk = groups[col]; if (!gk) { gk = groups[col] = []; gkeys.push(col); } gk.push(chr, x, y); }
    var Lx = -0.62, Ly = 0.5, Lz = 0.6, fr = Math.floor(time * 10), plain = !pc.tree, white = [255, 255, 255];
    var ramp = v.dot ? DOTR : v.glitch ? GLR : RAMP, rl = ramp.length;
    // background star field
    ctx.fillStyle = '#FFFFFF';
    for (var si = 0; si < 140; si++) {
      var tw0 = 0.5 + 0.5 * Math.sin(time * (0.8 + hash(si, 3, 91)) + si);
      ctx.globalAlpha = (0.08 + 0.32 * tw0) * (1 - topdown * 0.8);
      ctx.fillText(hash(si, 4, 91) < 0.15 ? '+' : hash(si, 4, 91) < 0.3 ? '*' : '.', hash(si, 1, 91) * W, hash(si, 2, 91) * H * 0.8);
    }
    ctx.globalAlpha = 1;
    var starA = pc.tree ? clamp((cam - 0.35) / 0.3) * clamp(grow) * (1 - clamp(sink / 0.35)) : 0, starCells = null;
    if (starA > 0.02) {
      var SY = g.H + 1.0, szp = 0, pfs = 1;
      var scx = ox, scy = oy + (-SY * ca) * zoom;
      var Ro = 4.1 * zoom, Ri = Ro * 0.48, sc0 = rgb(v.starHi || '#FFF4C2'), sc1 = rgb(v.star), pulse = 0.88 + 0.12 * Math.sin(time * 2.2);
      var c0 = Math.floor((scx - Ro * 1.4) / cw), c1 = Math.ceil((scx + Ro * 1.4) / cw), r0 = Math.floor((scy - Ro * 1.4) / ch), r1 = Math.ceil((scy + Ro * 1.4) / ch);
      starCells = [];
      var SR = '@@@@%%%##*';
      for (var sr = r0; sr <= r1; sr++) for (var scc = c0; scc <= c1; scc++) {
        if (scc < 0 || sr < 0 || scc >= cols || sr >= rows) continue;
        var dx = scc * cw + cw / 2 - scx, dy = sr * ch + ch / 2 - scy, rr = Math.hypot(dx, dy);
        var th2 = Math.atan2(dx, -dy), kk = ((th2 / (6.2832 / 5)) % 1 + 1) % 1, tip = 1 - Math.min(kk, 1 - kk) * 2;
        var edge = Ri + (Ro - Ri) * Math.pow(tip, 1.8);
        if (rr > edge) continue;
        var d = rr / Ro, inside = true;
        var chS = inside ? SR.charAt(Math.min(SR.length - 1, Math.floor(d * SR.length))) : (rr < edge + cw * 0.3 ? ':' : '.');
        var colS = css(lerpc(sc0, sc1, clamp(d * 1.3)), pulse * (1.1 - d * 0.2));
        starCells.push(sr * cols + scc, chS, colS, scc * cw + cw / 2, sr * ch + ch / 2);
        if (inside && starA > 0.5) pb[sr * cols + scc] = -1;
      }
    }
    for (var cy2 = 0; cy2 < rows; cy2++) for (var cx2 = 0; cx2 < cols; cx2++) {
      var cell = cy2 * cols + cx2, p = pb[cell]; if (p < 0) continue;
      var t2 = pc.TY[p], hh = pc.HH[p], chr, col, X0 = cx2 * cw + cw / 2, Y0 = cy2 * ch + ch / 2;
      if (t2 === 14) t2 = bOn ? 0 : 1;
      if (t2 >= 7 && t2 <= 9) {
        if (o.ground === false) continue;
        // ground ASCII: with no light plate it fades out first (opening third of the build), never brightening on the way
        var gA = o.plate === 'light' ? 1 : o.reveal !== undefined ? 1 - clamp(o.reveal / 0.35) : clamp((cam - 0.45) / 0.4);
        if (gA < 0.03) continue;
        if (t2 === 9) { if (hh > 0.6) continue; chr = hh < 0.3 ? ':' : '.'; col = css(white, (0.26 + 0.16 * hh) * gA); }
        else if (t2 === 7) {
          var b = (o.plate === 'light' ? 0.34 + 0.5 * topdown : 0.34) * drop * gA;
          chr = o.plate === 'light' && topdown > 0.5 ? (hh < 0.5 ? '#' : '%') : (hh < 0.35 ? ':' : '.');
          col = css(white, b * (0.8 + 0.2 * hh));
        } else {
          if (plain) continue;
          chr = ':'; col = css(white, 0.48 * drop * gA);
        }
        emit(col, chr, X0, Y0); continue;
      }
      var base = pc.cols[pc.CI[p]];
      var nx = pc.NX[p] * 0.85, nz = pc.NZ[p] * 0.85, ny = 0.5;
      var vx = nx * cp - nz * sp, vz = nx * sp + nz * cp;
      if (t2 === 12 || t2 === 13) {
        var bnx = pc.NX[p], bnz = pc.NZ[p], bny = pc.NY[p];
        var bvx = bnx * cp - bnz * sp, bvz = bnx * sp + bnz * cp;
        var bd = Math.max(0, bvx * -0.42 + bny * 0.5 + bvz * 0.76), spec = Math.pow(Math.max(0, bvx * -0.3 + bny * 0.45 + bvz * 0.84), 34);
        var rim = Math.pow(1 - Math.max(0, bvz), 2.2), env = 0.5 + 0.5 * Math.sin(bny * 3.4 - bvx * 2.2 + 0.7);
        var m = (0.15 + 0.85 * bd) * (0.3 + 0.7 * env);
        if (t2 === 13) { chr = '='; col = css(lerpc(base, white, 0.2), 0.9 + 0.4 * bd); }
        else if (spec > 0.4) { chr = '@'; col = '#FFFFFF'; }
        else if (spec > 0.08) { chr = '*'; col = css(lerpc(base, white, 0.65), 1.1); }
        else if (rim > 0.62 && bvx < 0.1) { chr = '+'; col = css(lerpc(base, white, 0.5), 1.15); }
        else { chr = m > 0.62 ? '@' : m > 0.44 ? '%' : m > 0.28 ? 'O' : m > 0.16 ? 'o' : '.'; col = css(lerpc(base, white, rim * 0.18), 0.28 + 1.2 * m); }
        emit(col, chr, X0, Y0); continue;
      }
      var front = Math.max(0, vz) * 0.3 + 0.12 * Math.max(0, ny);
      var fog = 0.72 + 0.28 * clamp((fb[cell] / (g.R0 + 1)) * 0.5 + 0.5);
      var band = pc.Y[p] / g.H * g.T % 1 > 0.9 ? 0.82 : 1;
      var lum = clamp((0.5 + front + (hh - 0.5) * 0.55) * (pc.OUT[p] < 1 ? 0.85 : 1) * fog * band);
      var shimmer = 0;
      if (t2 === 0) {
        var sh = lum < 0.34 ? 0 : lum < 0.62 ? 1 : 2;
        base = pc.cols[sh];
        chr = ramp.charAt(Math.max(0, Math.min(rl - 1, Math.floor((1 - lum) * rl * 0.7 + (hh * hh) * 5))));
        col = css(base, 0.78 + 0.5 * lum);
      } else if (t2 === 1) { chr = v.dot ? '\u25CF' : 'oO@0'.charAt(Math.floor(hh * 4)); col = css(base, 0.75 + 0.45 * lum); }
      else if (t2 === 2) { var tw = Math.sin(time * 1.6 + hh * 40); chr = tw > 0.3 ? '*' : tw > -0.3 ? '+' : '\u00B7'; col = css(lerpc(base, white, tw > 0.3 ? 0.35 : 0), 0.6 + 0.5 * (tw * 0.5 + 0.5)); }
      else if (t2 === 3) { chr = hh < 0.5 ? '~' : '='; col = css(base, 0.6 + 0.6 * lum); }
      else if (t2 === 4) { chr = v.capBand ? (hh < 0.45 ? '@' : hh < 0.8 ? '%' : '*') : (hh < 0.5 ? '*' : '^'); col = css(base, (v.capBand ? 0.8 : 0.55) + 0.45 * lum); }
      else if (t2 === 11) { chr = hh < 0.6 ? '@' : '%'; col = css(base, 0.75 + 0.3 * lum); }
      else if (t2 === 10) { chr = '\u2665'; col = css(base, 1); }
      else if (t2 === 6) { chr = hh < 0.45 ? '%' : hh < 0.8 ? '~' : '*'; col = css(base, 0.8 + 0.4 * lum); }
      else { chr = hh < 0.5 ? '#' : '|'; col = css(base, 0.6 + 0.5 * lum); }
      emit(col, chr, X0, Y0);
    }
    // without the light plate, the tree's glyphs fade away top-down so only the clean code squares remain
    var glyphA = o.plate === 'light' ? 1 : 1 - (o.reveal !== undefined ? clamp((o.reveal - 0.5) / 0.35) : clamp((0.3 - cam) / 0.28)) * clamp(drop);
    ctx.globalAlpha = glyphA;
    for (var gi = 0; gi < gkeys.length && glyphA > 0.01; gi++) {
      var arr = groups[gkeys[gi]]; ctx.fillStyle = gkeys[gi];
      for (var j = 0; j < arr.length; j += 3) ctx.fillText(arr[j], arr[j + 1], arr[j + 2]);
    }
    ctx.globalAlpha = 1;
    if (starCells) {
      ctx.globalAlpha = starA; ctx.font = '600 ' + fs + 'px ' + MONO;
      for (var q2 = 0; q2 < starCells.length; q2 += 5) { ctx.fillStyle = starCells[q2 + 2]; ctx.fillText(starCells[q2 + 1], starCells[q2 + 3], starCells[q2 + 4]); }
      ctx.globalAlpha = 1; ctx.font = fs + 'px ' + MONO;
    }
    // the code assembles on the ground: squares fly in from a scattered field, rippling out from the centre
    var asm = (o.reveal !== undefined ? clamp(o.reveal) : clamp((0.8 - cam) / 0.75)) * clamp(drop), scanBlock = asm, rip = 1 - clamp(drop);
    if (asm > 0.01) {
      var N = g.N, Q = g.Q, hS = S / 2;
      function PJ(X, Z) { var xq = X * cp - Z * sp, zq = X * sp + Z * cp, pq = 1 / (1 - zq * persp); return [ox + xq * zoom * pq, oy + zq * sa * zoom * pq]; }
      function quad(X0, Z0, X1, Z1) { var a1 = PJ(X0, Z0), b1 = PJ(X1, Z0), c1 = PJ(X1, Z1), d1 = PJ(X0, Z1); ctx.beginPath(); ctx.moveTo(a1[0], a1[1]); ctx.lineTo(b1[0], b1[1]); ctx.lineTo(c1[0], c1[1]); ctx.lineTo(d1[0], d1[1]); ctx.closePath(); ctx.fill(); }
      function dk(c) { var L = (c[0] * 0.3 + c[1] * 0.59 + c[2] * 0.11) / 255, k = L > 0.3 ? 0.3 / L : 1; return [c[0] * k, c[1] * k, c[2] * k]; }
      var fin = rgb(v.finder || '#5A66D9');
      var palQ = pc.tree ? [rgb(v.leaf[0]), rgb(v.leaf[0]), rgb(v.leaf[1]), rgb(v.leaf[0])].concat((v.baubles || v.orn).map(rgb)) : [[26, 26, 30]];
      // qrTone: 'dark' (dark modules, needs light plate) | 'bright' (tree colours, lifted) | 'light' (tinted near-white, inverted code)
      var plate = o.plate || 'none', tone = o.qrTone || (plate === 'light' ? 'dark' : 'bright');
      function lift(c) { var L = (c[0] * 0.3 + c[1] * 0.59 + c[2] * 0.11) / 255, k = L < 0.55 ? 0.55 / Math.max(L, 0.05) : 1; return lerpc([c[0] * k, c[1] * k, c[2] * k], white, 0.08); }
      var tf = tone === 'dark' ? dk : tone === 'light' ? function (c) { return lerpc(c, white, 0.78); } : lift;
      var qcol = palQ.map(function (c) { return css(tf(c), 1); }), qhi = palQ.map(function (c) { return css(lerpc(c, white, tone === 'dark' ? 0.25 : 0.6), 1.15); });
      var finC = css(tone === 'light' ? lerpc(fin, white, 0.35) : tf(fin), 1), finHi = css(lerpc(fin, white, 0.3), 1.1);
      var plateA = plate === 'none' ? 0 : clamp((asm - 0.55) / 0.4);
      if (plateA > 0) { ctx.globalAlpha = plateA; ctx.fillStyle = plate === 'dark' ? '#1B1B21' : '#F4F4F6'; quad(-hS - 0.4, -hS - 0.4, hS + 0.4, hS + 0.4); }
      var gfs = Math.max(7, Math.round(zoom * 0.72));
      ctx.font = '600 ' + gfs + 'px ' + MONO;
      if (plateA > 0.3) for (var lz = 0; lz < N; lz++) for (var lx2 = 0; lx2 < N; lx2++) if (!pc.qr.M[lz][lx2] && hash(lx2, lz, 81) < 0.35) {
        var lp = PJ(lx2 + Q + 0.5 - hS, lz + Q + 0.5 - hS); ctx.globalAlpha = plateA * (plate === 'dark' ? 0.2 : 0.35); ctx.fillStyle = plate === 'dark' ? '#6A6A78' : '#C4C4CC'; ctx.fillText(hash(lx2, lz, 82) < 0.5 ? '.' : ':', lp[0], lp[1]);
      }
      for (var qz = 0; qz < N; qz++) for (var qx = 0; qx < N; qx++) {
        if (!pc.qr.M[qz][qx]) continue;
        var dcx = qx + 0.5 - N / 2, dcz = qz + 0.5 - N / 2, dist = Math.hypot(dcx, dcz) / (N * 0.71);
        var isF = (qx < 7 && qz < 7) || (qx >= N - 7 && qz < 7) || (qx < 7 && qz >= N - 7);
        // inside out: a clean ring from the centre; each corner square comes in as one block mid-way; all done by 85%
        var delay = isF ? 0.32 : Math.min(0.55, dist * 0.55 + hash(qx, qz, 87) * 0.02);
        var e = ease(clamp((asm - delay) / 0.3));
        if (e <= 0.01) continue;
        var sc2 = 1, jx = 0, jz = 0;
        var cxw = dcx * sc2 + jx + (Q + N / 2 - hS), czw = dcz * sc2 + jz + (Q + N / 2 - hS), hz = 0.5 * (0.35 + 0.65 * e);
        var pi = isF ? -1 : (hash(qx, qz, 83) < 0.8 ? Math.floor(hash(qx, qz, 84) * Math.min(4, palQ.length)) : Math.floor(hash(qx, qz, 85) * palQ.length));
        ctx.globalAlpha = e; ctx.fillStyle = isF ? finC : qcol[pi];
        quad(cxw - hz - 0.01, czw - hz - 0.01, cxw + hz + 0.01, czw + hz + 0.01);
        if (e > 0.85 && plate === 'light') { var gp = PJ(cxw, czw); ctx.globalAlpha = (e - 0.85) / 0.15 * 0.5; ctx.fillStyle = isF ? finHi : qhi[pi]; ctx.fillText('@%#*+'.charAt(Math.floor(hash(qx, qz, 86) * 5)), gp[0], gp[1]); }
      }
      ctx.globalAlpha = 1; ctx.font = fs + 'px ' + MONO;
    }
    // snow
    if (o.fall !== false && pc.tree) {
      ctx.fillStyle = '#FFFFFF';
      for (var fi = 0, nFl = v.flakes || 90; fi < nFl; fi++) {
        var fl = flakes[fi], fy = (((fl.y + time * fl.sp) % 1.1) - 0.05) * H, fx = fl.x * W + Math.sin(time * 1.3 + fl.ph) * 12;
        ctx.globalAlpha = (1 - topdown) * (0.25 + 0.55 * fl.sp / 0.075);
        ctx.fillText(fi % 4 ? '.' : '*', fx, fy);
      }
      ctx.globalAlpha = 1;
    }
    var cvs = ctx.canvas;
    var bl = (v.bloom || 0) * Math.pow(1 - clamp(scanBlock / 0.6), 2) * (o.bloom === false ? 0 : 1) * (o.bloomScale === undefined ? 1 : o.bloomScale);
    if (bl > 0.005) {
      ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.globalCompositeOperation = 'lighter'; ctx.globalAlpha = Math.min(0.85, bl * 0.7);
      ctx.filter = 'blur(' + Math.max(2, Math.round(fs * 0.9 * dpr)) + 'px)';
      ctx.drawImage(cvs, 0, 0);
      ctx.restore(); ctx.filter = 'none';
    }
  }
  function cycle(t, period) {
    var f = ((t % period) + period) % period / period, cam;
    if (f < 0.16) cam = 0;
    else if (f < 0.34) cam = ease((f - 0.16) / 0.18);
    else if (f < 0.78) cam = 1;
    else if (f < 0.94) cam = 1 - ease((f - 0.78) / 0.16);
    else cam = 0;
    return { cam: cam, grow: 1, moving: false };
  }
  return { points: points, V: V, KEYS: KEYS, EXTRA_KEYS: Object.keys(EXTRA), draw: draw, getQR: getQR, cycle: cycle, ease: ease };
}
