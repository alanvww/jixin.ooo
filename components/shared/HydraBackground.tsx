import Script from 'next/script'
import * as React from 'react'

let width = 1920,
  height = 1080

export function HydraBackground() {
  React.useEffect(() => {
    height = window.innerHeight
    width = window.innerWidth
  }, [])

  return (
    <>
      <canvas
        id="hydra-canvas"
        width={width}
        height={height}
        className={`fixed min-h-full min-w-full`}
      />

      <Script
        src="https://unpkg.com/hydra-synth"
        onReady={() => {
          // create a new hydra-synth instance
          const hydra = new Hydra({
            canvas: document.querySelector('#hydra-canvas'),
            detectAudio: false,
            width: width,
          })
          let s = () =>
            shape(4)
              .scrollX(
                [-0.392, -0.2, 0.3, -0.017, -0.184].smooth(0.1).fast(0.519)
              )
              .scrollY([0.468, -0.2, 0.313, -0.1, 0.2].smooth(0.9).fast(0.15))
          //
          solid()
            .add(
              gradient(3, 0.05).rotate(0.089, -0.2).posterize(2).contrast(0.6),
              [1, 0, 1, 0.114, 0, 0.014].smooth(0.9)
            )
            .add(s())
            .mult(
              s()
                .scale(0.8)
                .scrollX(0.012)
                .scrollY(-0.002)
                .rotate(0.36, 0.06)
                .add(
                  gradient(4.161).contrast(0.6),
                  [1.54, 0, 1.895, 0.35].smooth(0.9),
                  0.5
                )
                .mult(src(o0).scale(0.58), () => a.fft[0] * 9)
            )
            .diff(
              s()
                .modulate(shape(500))
                .scale([1.7, 1.2].smooth(0.044).fast(0.05))
            )
            .add(gradient(2).invert(), () => a.fft[2])
            .mult(gradient(() => a.fft[3] * 8))
            .blend(src(o0, () => a.fft[1] * 37.216))
            .add(
              voronoi(
                () => a.fft[1],
                () => a.fft[3],
                () => a.fft[0]
              )
                .thresh(0.7)
                .posterize(2, 4)
                .luma(1.25)
                .scrollY(0.055, () => a.fft[0] / 30)
                .colorama(3)
                .thresh(() => a.fft[1])
                .scale(() => a.fft[3] * 0.152),
              () => a.fft[0] / 2
            )
            .out()
          //
          speed = 1
        }}
      />
    </>
  )
}
