import { useEffect, useRef } from "react";

export default function HexBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let mouse = { x: -1000, y: -1000 };
    let copyrightThresholdY = Infinity;

    const hexSize = 40;
    const hexWidth = Math.sqrt(3) * hexSize;
    const hexHeight = 2 * hexSize;

    function resize() {
      dpr = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;

      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      canvas!.style.width = `${width}px`;
      canvas!.style.height = `${height}px`;

      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      const lineEl = document.getElementById("copyright-line");
      if (lineEl) {
        copyrightThresholdY =
          lineEl.getBoundingClientRect().top + window.scrollY;
      }
    }

    function drawHex(
      x: number,
      y: number,
      size: number,
      alpha: number,
      isGlowing: boolean
    ) {
      ctx!.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i + Math.PI / 6;
        const px = x + size * Math.cos(angle);
        const py = y + size * Math.sin(angle);
        if (i === 0) ctx!.moveTo(px, py);
        else ctx!.lineTo(px, py);
      }
      ctx!.closePath();

      if (isGlowing) {
        ctx!.strokeStyle = `rgba(26, 28, 30, ${alpha * 0.25})`;
        ctx!.lineWidth = 1.1;
        ctx!.shadowBlur = 4;
        ctx!.shadowColor = "rgba(0,0,0,0.05)";
      } else {
        ctx!.strokeStyle = "rgba(26, 28, 30, 0.14)";
        ctx!.lineWidth = 1;
        ctx!.shadowBlur = 0;
      }
      ctx!.stroke();
    }

    function loop() {
      ctx!.clearRect(0, 0, width, height);
      const scrollY = window.scrollY;

      for (let y = 0; y < height + hexHeight + scrollY; y += hexHeight * 0.75) {
        if (y > copyrightThresholdY) continue;

        const offset =
          (Math.floor(y / (hexHeight * 0.75)) % 2) * (hexWidth / 2);

        for (let x = -hexWidth; x < width + hexWidth; x += hexWidth) {
          const cx = x + offset;
          const cy = y - scrollY;

          const dx = cx - mouse.x;
          const dy = cy - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          const influence =
            mouse.y > copyrightThresholdY - scrollY
              ? 0
              : Math.max(0, 1 - dist / 200);

          drawHex(cx, cy, hexSize, 0.4 + influence * 1.5, influence > 0.2);
        }
      }

      requestAnimationFrame(loop);
    }

    window.addEventListener("resize", resize);
    window.addEventListener("scroll", resize);
    window.addEventListener("mousemove", (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });

    resize();
    loop();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", resize);
    };
  }, []);

  return (
    <div className="hex-container">
      <canvas ref={canvasRef} />
    </div>
  );
}