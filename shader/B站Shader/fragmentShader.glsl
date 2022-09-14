// 指定flot精度
precision lowp float;

// Vertex
varying vec2 vUv;
varying vec3 vPosition;

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

  // 根据顶点位置改变效果 uv
  // vec3 color = mix(vec3(1.0,0.0,0.0), vec3(0.0,0.0,1.0), vUv.y);

  // 根据位置改变效果
  // vec3 color = vec3(vPosition.x, vPosition.y,0.0);

  // clamp函数
  // vec3 color = vec3(0.0);
  // color.r = clamp(vPosition.x, 0.0, 1.0);
  // color.g = clamp(vPosition.y, 0.0, 1.0);

  // step函数
  // vec3 color = vec3(0.0);
  // color.r = step(-0.5,vPosition.x);
  // color.g = step(0.5,vPosition.y);

  // color.r = step(-1.0,vPosition.x);
  // color.g = step(-1.0,vPosition.y);

  //smoothstep
  vec3 color = vec3(0.0);
  color.r = smoothstep(0.0,0.05,vPosition.x);
  color.g = smoothstep(0.0,0.05,vPosition.y);
  gl_FragColor = vec4(color, 1.0);
}