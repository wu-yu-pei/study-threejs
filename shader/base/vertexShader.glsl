// Vertex
varying vec2 vUv;

uniform float uTime;

void main() {
  vUv = uv;
  vec4 modelPosition =modelMatrix * vec4(position, 1.0);
  modelPosition.z = sin(modelPosition.x * uTime);
  // modelPosition.z += sin(modelPosition.y) * 70.0;
  gl_Position = projectionMatrix * viewMatrix  * modelPosition;
}