import React, { useEffect, useRef } from 'react'
import p5Types from 'p5'

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

const AnimeBackground: React.FC = () => {
  const sketchRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const p5 = require('p5')
      let circles: Circle[] = []
      const mouseRadius = 50
      const dodgeCooldown = 60 // 60 frames, or about 1 second at 60 fps
      const friction = 0.99
      const dodgeAcceleration = 2.0

      new p5((p: p5Types) => {
        const Circle = (x: number, y: number, speed: number): Circle => {
          const circle: Circle = {
            position: p.createVector(x, y),
            velocity: p5.Vector.random2D().mult(speed),
            lastDodgeFrame: -dodgeCooldown,
            colorFill: Math.round(Math.random()) ? 190 : 130,

            update: function () {
              this.velocity.mult(friction)
              this.position.add(this.velocity)
              this.position.x = (this.position.x + p.width) % p.width
              this.position.y = (this.position.y + p.height) % p.height
            },

            draw: function () {
              p.fill(this.colorFill)
              p.noStroke()
              p.ellipse(this.position.x, this.position.y, 3)
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

        p.setup = () => {
          p.createCanvas(p.windowWidth, p.windowHeight)
          const numberOfCircles = p.windowWidth <= 768 ? 3333 : 8888
          for (let i = 0; i < numberOfCircles; i++) {
            circles.push(
              Circle(p.random(p.width), p.random(p.height), p.random(1, 3))
            )
          }
        }

        p.draw = () => {
          p.background(255)
          for (let circle of circles) {
            circle.update()
            circle.draw()
            circle.dodgeMouse(p.mouseX, p.mouseY, mouseRadius, dodgeCooldown)
          }
          drawMouseCircle(p, p.mouseX, p.mouseY, mouseRadius)
        }

        const drawMouseCircle = (
          p: p5Types,
          x: number,
          y: number,
          radius: number
        ) => {
          p.fill(0, 0, 0, 0)
          p.noStroke()
          p.ellipse(x, y, radius * 2)
        }

        p.windowResized = () => {
          p.width = p.windowWidth
          p.height = p.windowHeight
          p.resizeCanvas(p.width, p.height)
          circles = [] // Reset the circles array
          const numberOfCircles = p.windowWidth <= 768 ? 3333 : 8888
          console.log(numberOfCircles)
          for (let i = 0; i < numberOfCircles; i++) {
            circles.push(
              Circle(p.random(p.width), p.random(p.height), p.random(1, 3))
            )
          }
        }
      }, sketchRef.current!)
    }
  }, [])

  return <div ref={sketchRef} className="sticky" />
}

export default AnimeBackground
