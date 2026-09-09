import { useCallback, useEffect, useRef, useState } from 'react'
import { Perceptron, generateExample, trueLineY, type TrainingExample } from './perceptron'
import { useLanguage } from '../../i18n/LanguageContext'
import { useTheme } from '../../theme/ThemeContext'

const CANVAS_SIZE = 420
const TEST_POINTS = 150

const MIN_LEARNING_RATE = 0.01
const MAX_LEARNING_RATE = 1
const MIN_BATCH_SIZE = 1
const MAX_BATCH_SIZE = 200

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value))
}

// Sliders are already constrained by min/max/step in the DOM, but the value still
// arrives as a string from the change event, so it's parsed and re-validated here
// rather than trusted, in case the DOM is ever tampered with (devtools, extensions).
function parseClamped(rawValue: string, min: number, max: number, fallback: number): number {
  const parsed = Number(rawValue)
  if (!Number.isFinite(parsed)) return fallback
  return clamp(parsed, min, max)
}

function toCanvasX(x: number): number {
  return ((x + 1) / 2) * CANVAS_SIZE
}
function toCanvasY(y: number): number {
  return CANVAS_SIZE - ((y + 1) / 2) * CANVAS_SIZE
}

export default function PerceptronDemo() {
  // useLanguage() comes from a plain .jsx module without static types; the
  // union of the en/de dictionaries doesn't narrow cleanly through TS's JS
  // type acquisition, so the translation object is treated as `any` here.
  const { t } = useLanguage() as { t: any }
  const { theme } = useTheme()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const perceptronRef = useRef<Perceptron>(new Perceptron(3, 0.1))
  const pointsRef = useRef<TrainingExample[]>(
    Array.from({ length: TEST_POINTS }, () => generateExample())
  )

  const [learningRate, setLearningRate] = useState(0.1)
  const [batchSize, setBatchSize] = useState(10)
  const [epoch, setEpoch] = useState(0)
  const [accuracy, setAccuracy] = useState<number | null>(null)
  const [isAnimating, setIsAnimating] = useState(false)

  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const rootStyle = getComputedStyle(document.documentElement)
    const mutedColor = rootStyle.getPropertyValue('--text-muted').trim() || '#9ca3af'
    const learnedLineColor = rootStyle.getPropertyValue('--text').trim() || '#111827'

    ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE)

    for (const { inputs, target } of pointsRef.current) {
      const [x, y] = inputs
      ctx.beginPath()
      ctx.arc(toCanvasX(x), toCanvasY(y), 4, 0, Math.PI * 2)
      ctx.fillStyle = target === 1 ? '#3b82f6' : '#ef4444'
      ctx.fill()
    }

    ctx.strokeStyle = mutedColor
    ctx.setLineDash([6, 4])
    ctx.beginPath()
    ctx.moveTo(toCanvasX(-1), toCanvasY(trueLineY(-1)))
    ctx.lineTo(toCanvasX(1), toCanvasY(trueLineY(1)))
    ctx.stroke()
    ctx.setLineDash([])

    const [w0, w1, w2] = perceptronRef.current.weights
    if (Math.abs(w1) > 1e-6) {
      const learnedY = (x: number) => -(w0 * x + w2) / w1
      ctx.strokeStyle = learnedLineColor
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.moveTo(toCanvasX(-1), toCanvasY(learnedY(-1)))
      ctx.lineTo(toCanvasX(1), toCanvasY(learnedY(1)))
      ctx.stroke()
      ctx.lineWidth = 1
    }
  }, [])

  useEffect(() => {
    draw()
  }, [draw, theme])

  const trainBatch = useCallback(
    (count: number) => {
      const perceptron = perceptronRef.current
      perceptron.learningRate = learningRate
      for (let i = 0; i < count; i++) {
        const { inputs, target } = generateExample()
        perceptron.train(inputs, target)
      }
      setEpoch((e) => e + count)
      setAccuracy(perceptron.accuracy(100))
      draw()
    },
    [learningRate, draw]
  )

  const reset = useCallback(() => {
    perceptronRef.current = new Perceptron(3, learningRate)
    pointsRef.current = Array.from({ length: TEST_POINTS }, () => generateExample())
    setEpoch(0)
    setAccuracy(null)
    setIsAnimating(false)
    draw()
  }, [learningRate, draw])

  const newTestPoints = useCallback(() => {
    pointsRef.current = Array.from({ length: TEST_POINTS }, () => generateExample())
    draw()
  }, [draw])

  useEffect(() => {
    if (!isAnimating) return
    const id = setInterval(() => trainBatch(1), 40)
    return () => clearInterval(id)
  }, [isAnimating, trainBatch])

  return (
    <div className="perceptron-demo">
      <canvas
        ref={canvasRef}
        width={CANVAS_SIZE}
        height={CANVAS_SIZE}
        className="perceptron-canvas"
        role="img"
        aria-label={t.perceptron.canvasLabel}
      />

      <div className="perceptron-controls">
        <button type="button" className="btn btn-secondary" onClick={() => trainBatch(batchSize)} disabled={isAnimating}>
          {t.perceptron.train(batchSize)}
        </button>
        <button type="button" className="btn btn-secondary" onClick={() => setIsAnimating((a) => !a)}>
          {isAnimating ? t.perceptron.animateStop : t.perceptron.animateStart}
        </button>
        <button type="button" className="btn btn-secondary" onClick={newTestPoints} disabled={isAnimating}>
          {t.perceptron.newPoints}
        </button>
        <button type="button" className="btn btn-secondary" onClick={reset}>
          {t.perceptron.reset}
        </button>
      </div>

      <div className="perceptron-sliders">
        <label className="perceptron-slider">
          {t.perceptron.learningRate}: {learningRate.toFixed(2)}
          <input
            type="range"
            min={MIN_LEARNING_RATE}
            max={MAX_LEARNING_RATE}
            step={0.01}
            value={learningRate}
            onChange={(e) =>
              setLearningRate(parseClamped(e.target.value, MIN_LEARNING_RATE, MAX_LEARNING_RATE, learningRate))
            }
          />
        </label>
        <label className="perceptron-slider">
          {t.perceptron.batchSize}: {batchSize}
          <input
            type="range"
            min={MIN_BATCH_SIZE}
            max={MAX_BATCH_SIZE}
            step={1}
            value={batchSize}
            onChange={(e) =>
              setBatchSize(Math.round(parseClamped(e.target.value, MIN_BATCH_SIZE, MAX_BATCH_SIZE, batchSize)))
            }
          />
        </label>
      </div>

      <p className="perceptron-status">
        {t.perceptron.trainedOn(epoch)}
        {accuracy !== null && t.perceptron.accuracy(Math.round(accuracy * 100))}
      </p>
      <p className="perceptron-caption">{t.perceptron.caption}</p>
    </div>
  )
}
