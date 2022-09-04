// Vertex
varying vec2 vUv;

void main() {
  vUv = uv;
  vec4 modelPosition =modelMatrix * vec4(position, 1.0);
  modelPosition.z = sin(modelPosition.x);
  // modelPosition.z = modelPosition.x;

  gl_Position = projectionMatrix * viewMatrix  * modelPosition;
}