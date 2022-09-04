// 指定flot精度
precision lowp float;

// Vertex
varying vec2 vUv;

void main() {
  gl_FragColor = vec4(vUv, 0.0, 1.0);
}