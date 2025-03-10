// 画五角星的方法
export const drawStar = (
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  radius: number
) => {
  // 初始旋转角度，确保五角星的一个顶点朝上
  const rot = -Math.PI / 2;
  const angle = Math.PI / 5; // 每次旋转的角度步长

  ctx.beginPath();
  for (let i = 0; i < 5; i++) {
    // 循环5次，每次画出一个外角点和一个内角点
    const outerX = cx + Math.cos(rot + angle * 2 * i) * radius;
    const outerY = cy + Math.sin(rot + angle * 2 * i) * radius;
    const innerX = cx + Math.cos(rot + angle * (2 * i + 1)) * (radius * 0.382); // 使用黄金比例计算内角点位置
    const innerY = cy + Math.sin(rot + angle * (2 * i + 1)) * (radius * 0.382);

    if (i === 0) {
      ctx.moveTo(outerX, outerY);
    } else {
      ctx.lineTo(outerX, outerY);
    }
    ctx.lineTo(innerX, innerY);
  }
  ctx.closePath(); // 关闭路径
  ctx.stroke(); // 绘制轮廓
};
