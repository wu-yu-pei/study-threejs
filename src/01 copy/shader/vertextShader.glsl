varying vec3 vColor;
attribute vec3 color;
uniform float vTime;
void main() {
  vColor = color;
  vec3 p = position;
  p.z = sin(vTime) * 0.1 + p.z;
  gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4( p, 1.0 );
}