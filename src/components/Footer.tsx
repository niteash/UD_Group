import { useEffect, useRef } from "react";
import Matter from "matter-js";
import { FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";
import { LogoSVG } from "./Logo";

const navLinks = [
  {
    label: "COMPANY",
    href: "#company",
    color: "#1a1a1a",
    textColor: "#B89851",
  },
  {
    label: "BUSINESS",
    href: "#business",
    color: "#1a1a1a",
    textColor: "#B89851",
  },
  {
    label: "STRENGTHS",
    href: "#strengths",
    color: "#1a1a1a",
    textColor: "#B89851",
  },
  {
    label: "RECRUITMENT",
    href: "#recruitment",
    color: "#B89851",
    textColor: "#1a1a1a",
  },
  {
    label: "CONTACT",
    href: "#contact",
    color: "#1a1a1a",
    textColor: "#B89851",
  },
  { label: "NEWS", href: "#news", color: "#1a1a1a", textColor: "#B89851" },
  { label: "UD GROUP", href: "#", color: "#ffffff", textColor: "#1a1a1a" },
];

export function Footer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;

    const {
      Engine,
      Render,
      Runner,
      Bodies,
      Composite,
      Mouse,
      MouseConstraint,
      Events,
    } = Matter;

    const engine = Engine.create();
    engine.gravity.y = 1;
    const world = engine.world;

    let containerBounds = containerRef.current.getBoundingClientRect();
    const PILL_HEIGHT = 56;
    const BALL_OPTIONS = {
      restitution: 0.8,
      friction: 0.001,
      frictionAir: 0.01,
      density: 0.001,
    };

    const render = Render.create({
      element: containerRef.current,
      engine: engine,
      canvas: canvasRef.current,
      options: {
        width: containerBounds.width,
        height: containerBounds.height,
        background: "transparent",
        wireframes: false,
        hasBounds: true,
      },
    });

    const createBoundaries = () => {
      const wallThickness = 100;
      const width = containerBounds.width;
      const height = containerBounds.height;

      const floor = Bodies.rectangle(
        width / 2,
        height + wallThickness / 2,
        width + 200, // Extend a bit
        wallThickness,
        {
          isStatic: true,
          label: "boundary",
          friction: 0.001,
          restitution: 0.7,
        },
      );

      const leftWall = Bodies.rectangle(
        -wallThickness / 2,
        height / 2,
        wallThickness,
        height * 2,
        {
          isStatic: true,
          label: "boundary",
          friction: 0.001,
          restitution: 0.7,
        },
      );

      const rightWall = Bodies.rectangle(
        width + wallThickness / 2,
        height / 2,
        wallThickness,
        height * 2,
        {
          isStatic: true,
          label: "boundary",
          friction: 0.001,
          restitution: 0.7,
        },
      );

      Composite.add(world, [floor, leftWall, rightWall]);
    };

    const balls: Matter.Body[] = [];
    const createBalls = () => {
      const width = containerBounds.width;
      const spacing = width / (navLinks.length + 1);

      navLinks.forEach((tag, index) => {
        const x = spacing * (index + 1);
        const y = -100 - index * 80;

        const pillWidth = Math.max(140, tag.label.length * 14 + 40);

        const ball = Bodies.rectangle(x, y, pillWidth, PILL_HEIGHT, {
          ...BALL_OPTIONS,
          chamfer: { radius: PILL_HEIGHT / 2 },
          label: tag.label,
          render: {
            fillStyle: tag.color,
            strokeStyle: "rgba(255, 255, 255, 0.1)",
            lineWidth: 1,
          },
        });

        // Custom draw happens in AfterRender event
        (ball as any).customData = tag;

        balls.push(ball);
        Composite.add(world, ball);
      });
    };

    createBoundaries();
    createBalls();

    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: false },
      },
    });

    Composite.add(world, mouseConstraint);

    Events.on(mouseConstraint, "mouseup", (event: any) => {
      const mousePosition = event.mouse.position;
      const clickedBodies = Matter.Query.point(balls, mousePosition);
      if (clickedBodies.length > 0) {
        const data = (clickedBodies[0] as any).customData;
        if (data && data.href && data.href !== "#") {
          window.location.hash = data.href;
        }
      }
    });

    Events.on(mouseConstraint, "mousemove", (event: any) => {
      const mousePosition = event.mouse.position;
      const hoveredBodies = Matter.Query.point(balls, mousePosition);
      if (hoveredBodies.length > 0) {
        render.canvas.style.cursor = "pointer";
      } else {
        render.canvas.style.cursor = "default";
      }
    });

    // Ensure mouse handles scroll correctly
    const mouseAny = mouse as any;
    if (mouseAny.mousewheel) {
      mouse.element.removeEventListener("mousewheel", mouseAny.mousewheel);
      mouse.element.removeEventListener("DOMMouseScroll", mouseAny.mousewheel);
      mouse.element.removeEventListener("wheel", mouseAny.mousewheel);
    }

    // Render text on balls
    Events.on(render, "afterRender", () => {
      const context = render.context;
      balls.forEach((ball) => {
        const data = (ball as any).customData;
        if (!data) return;

        context.save();
        context.translate(ball.position.x, ball.position.y);
        context.rotate(ball.angle);

        context.fillStyle = data.textColor;
        context.font = "500 12px Inter, sans-serif";
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.letterSpacing = "1px";
        context.fillText(data.label, 0, 0);

        context.restore();
      });
    });

    Render.run(render);
    const runner = Runner.create();
    Runner.run(runner, engine);

    const handleResize = () => {
      if (!containerRef.current) return;
      containerBounds = containerRef.current.getBoundingClientRect();
      render.canvas.width = containerBounds.width;
      render.canvas.height = containerBounds.height;
      render.options.width = containerBounds.width;
      render.options.height = containerBounds.height;

      const oldBoundaries = Composite.allBodies(world).filter(
        (body) => body.label === "boundary",
      );
      Composite.remove(world, oldBoundaries);
      createBoundaries();

      balls.forEach((ball) => {
        if (ball.position.x < 0 || ball.position.x > containerBounds.width) {
          Matter.Body.setPosition(ball, {
            x: containerBounds.width / 2,
            y: ball.position.y,
          });
        }
      });
    };

    let resizeTimeout: ReturnType<typeof setTimeout>;
    const throttledResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(handleResize, 250);
    };

    window.addEventListener("resize", throttledResize);

    return () => {
      window.removeEventListener("resize", throttledResize);
      Render.stop(render);
      Runner.stop(runner);
      Engine.clear(engine);
      if (render.canvas) {
        render.canvas.remove();
      }
      render.textures = {};
    };
  }, []);

  return (
    <footer
      ref={containerRef}
      className="relative z-10 bg-[#0a0a0a] text-neutral-400 overflow-hidden border-t border-white/5 transition-colors duration-500 min-h-[550px] flex flex-col justify-between"
    >
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full touch-none z-0"
      />

      <div className="absolute top-8 left-1/2 -translate-x-1/2 text-center pointer-events-none z-10 opacity-50 animate-pulse">
        <p className="text-xs font-mono uppercase tracking-[0.2em] text-[#B89851]">
          Interact to Navigate
        </p>
      </div>

      {/* Footer Content overlaid */}
      <div className="relative z-10 max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-24 pt-24 w-full pointer-events-none flex-grow flex flex-col justify-between">
        <div className="flex flex-col md:flex-row justify-between items-start gap-16 md:gap-8">
          {/* Brand */}
          <div className="flex flex-col items-start pointer-events-auto">
            <div className="text-white mb-8">
              <LogoSVG className="w-24 h-auto text-white" />
            </div>
            <p className="text-sm font-mono tracking-widest leading-relaxed text-neutral-400 mb-10 max-w-sm uppercase">
              Elevating standards, crafting the future of modern business and
              lifestyle.
            </p>
            <div className="flex gap-4">
              {[FaInstagram, FaTwitter, FaLinkedin].map((Icon, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="w-10 h-10 rounded-full border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-[#B89851] hover:border-[#B89851] transition-all transform hover:-translate-y-1 duration-300 bg-[#0a0a0a]"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-24 w-full pointer-events-none pb-8 mt-auto">
        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 border-t border-neutral-800/50 pointer-events-auto">
          <p className="font-mono text-[10px] tracking-[0.2em] text-neutral-600 uppercase">
            © {currentYear} UD GROUP. ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-4">
            <a
              href="#"
              className="text-[10px] font-mono tracking-[0.2em] text-neutral-600 hover:text-[#B89851] uppercase transition-colors"
            >
              Privacy
            </a>
            <a
              href="#"
              className="text-[10px] font-mono tracking-[0.2em] text-neutral-600 hover:text-[#B89851] uppercase transition-colors"
            >
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
