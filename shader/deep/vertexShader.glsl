// Vertex
varying vec2 vUv;

uniform float uTime;

void main() {
  vUv = uv;
  vec4 modelPosition =modelMatrix * vec4(position, 1.0);
  gl_Position = projectionMatrix * viewMatrix  * modelPosition;
}