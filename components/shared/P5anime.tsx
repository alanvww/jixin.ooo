import Script from 'next/script'

export default function P5anime() {
  return (
    <>
      <canvas id="hydra-canvas" className={`fixed min-h-full min-w-full`} />
      <Script src="https://openprocessing.org/openprocessing_sketch.js"></Script>
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/p5.js"></Script>
      <Script src="public/favicon/sketch.js" id="sketch"></Script>
    </>
  )
}
