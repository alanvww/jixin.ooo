import p5Types from 'p5'
import { useEffect, useRef } from 'react'

interface Circle {
  position: p5Types.Vector
  velocity: p5Types.Vector
  lastDodgeFrame: number
  colorFill: number
  update: () => void
  draw: () => void
  dodgeMouse: (
    mouseX: number,
    mouseY: number,
    mouseRadius: number,
    dodgeCooldown: number
  ) => void
}

export default function AnimeBackground({ theme = 'light' }) {
  const sketchRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const p5 = require('p5')
      let circles: Circle[] = []
      const mouseRadius = 50
      const dodgeCooldown = 60 // 60 frames, or about 1 second at 60 fps
      const friction = 0.995
      const dodgeAcceleration = 2.0

      const sketch = (p: p5Types) => {
        p.disableFriendlyErrors = true

        const Circle = (x: number, y: number, speed: number): Circle => {
          const circle: Circle = {
            position: p.createVector(x, y),
            velocity: p5.Vector.random2D().mult(speed),
            lastDodgeFrame: -dodgeCooldown,
            colorFill:
              Math.random() < 0.5
                ? theme === 'light'
                  ? 130
                  : 180
                : theme === 'light'
                ? 190
                : 200,

            update: function () {
              this.velocity.mult(friction)
              this.position.add(this.velocity)
              this.position.x =
                (this.position.x + p.windowWidth) % p.windowWidth
              this.position.y =
                (this.position.y + p.windowHeight) % p.windowHeight
            },

            draw: function () {
              buffer.stroke(this.colorFill)
              buffer.point(this.position.x, this.position.y)
            },

            dodgeMouse: function (
              mouseX: number,
              mouseY: number,
              mouseRadius: number,
              dodgeCooldown: number
            ) {
              let mousePosition = p.createVector(mouseX, mouseY)
              let diff = p5.Vector.sub(this.position, mousePosition)
              if (diff.mag() < mouseRadius) {
                if (p.frameCount - this.lastDodgeFrame > dodgeCooldown) {
                  diff.setMag(dodgeAcceleration)
                  this.velocity.add(diff)
                  this.lastDodgeFrame = p.frameCount
                }
              }
            },
          }
          return circle
        }
        let buffer: p5Types.Graphics
        p.setup = () => {
          p.pixelDensity(1)
          p.frameRate(60)
          p.createCanvas(p.windowWidth, p.windowHeight)
          buffer = p.createGraphics(p.windowWidth, p.windowHeight)
          buffer.strokeWeight(3)
          const numberOfCircles = p.windowWidth <= 768 ? 2222 : 6666
          for (let i = 0; i < numberOfCircles; i++) {
            circles.push(
              Circle(
                Math.random() * p.windowWidth,
                Math.random() * p.windowHeight,
                p.random(1, 3)
              )
            )
          }
        }

        p.draw = () => {
          buffer.background(theme === 'light' ? 255 : 0)
          for (let circle of circles) {
            circle.update()
            circle.draw()
            circle.dodgeMouse(p.mouseX, p.mouseY, mouseRadius, dodgeCooldown)
          }
          p.image(buffer, 0, 0, p.windowWidth, p.windowHeight)
        }

        p.windowResized = () => {
          circles = [] // Reset the circles array
          p.resizeCanvas(p.windowWidth, p.windowHeight)
          buffer.resizeCanvas(p.windowWidth, p.windowHeight)
          const numberOfCircles = p.windowWidth <= 768 ? 2222 : 6666
          for (let i = 0; i < numberOfCircles; i++) {
            circles.push(
              Circle(
                p.random(p.windowWidth),
                p.random(p.windowHeight),
                p.random(1, 3)
              )
            )
          }
        }
      }
      const p5Instance = new p5(sketch, sketchRef.current!)

      // Cleanup
      return () => {
        p5Instance.remove()
      }
    }
  }, [theme])

  return <div ref={sketchRef} className="fixed" />
}
