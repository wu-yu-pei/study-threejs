// 指定flot精度
precision lowp float;

// Vertex
varying vec2 vUv;

//
uniform vec3 u_color;
uniform vec2 u_mouse;
uniform vec2 u_resolve;
uniform float u_time;
void main() {
  // .grba .rgba 这个是用来交换通道的位置

  // 根据鼠标移动改变位置
  // vec2 v = u_mouse / u_resolve;
  // vec3 color = vec3(v.x, 0.0, v.y);

  // 根据时间改变效果
  // vec3 color = vec3((sin(u_time) + 1.0)/2.0, 0.0, (cos(u_time) + 1.0)/2.0);

  // 根据顶点位置改变效果
  vec3 color = mix(vec3(1.0,0.0,0.0), vec3(0.0,0.0,1.0), vUv.y);
  gl_FragColor = vec4(color, 1.0);
}