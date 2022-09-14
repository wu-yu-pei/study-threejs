// 指定flot精度
precision lowp float;

// 与顶点关联的变量
attribute vec3 position;
attribute vec3 normal;
attribute vec2 uv;

// Uniforms 是所有顶点都有相同的值的变量
uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;

// Vertex
varying vec2 vUv;
varying vec3 vPosition;

void main() {
  vUv = uv;
  vPosition = position;
  gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4( position, 1.0 );
}