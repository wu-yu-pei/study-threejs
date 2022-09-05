// 精度
precision lowp float;

// Vertex
varying vec2 vUv;

void main() {
  vec2 uv = vUv;
  // 1.0
  // gl_FragColor = vec4(vUv, 1.0, 1.0);

  // 2.0
  // gl_FragColor = vec4(vUv.x, vUv.x, vUv.x, 1.0);

  // 3.0
  // gl_FragColor = vec4(vUv.y, vUv.y, vUv.y, 1.0);

  // 4.0
  // uv.x = 1.0 - uv.x;
  // gl_FragColor = vec4(uv.x, uv.x, uv.x, 1.0);

  // 5.0 step
  // uv.x = step(0.2, uv.x);
  // gl_FragColor = vec4(uv.x, uv.x, uv.x, 1.0);

  // 6.0 mode
  // uv.x = mod(uv.x, 1.0);
  // gl_FragColor = vec4(uv.x, uv.x, 1.0, 1.0);

  // 7.0 step & mode
  // uv.x = step(mod(uv.x, 0.1), 0.05);
  // gl_FragColor = vec4(uv.x, uv.x, uv.x, 1.0);
}