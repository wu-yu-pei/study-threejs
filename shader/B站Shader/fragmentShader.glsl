// 指定flot精度
precision lowp float;

// Vertex
varying vec2 vUv;

//
uniform vec3 u_color;
uniform vec2 u_mouse;
uniform vec2 u_resolve;

void main() {
  // .grba .rgba 这个是用来交换通道的位置
  gl_FragColor = vec4(u_mouse.x / u_resolve.x, 0.0, u_mouse.y / u_resolve.y , 1.0);
}