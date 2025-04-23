"use client"

import { useEffect, useRef } from "react"

interface ChartDataset {
  label?: string
  data: number[]
  backgroundColor?: string | string[]
  borderColor?: string
  borderWidth?: number
}

interface AdminChartProps {
  type: "bar" | "line" | "pie" | "doughnut"
  labels: string[]
  datasets: ChartDataset[]
  height?: number
}

export default function AdminChart({ type, labels, datasets, height = 300 }: AdminChartProps) {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstanceRef = useRef<any>(null)

  useEffect(() => {
    if (!chartRef.current) return

    // This is a placeholder for Chart.js implementation
    // In a real app, you would use Chart.js to render the chart
    const ctx = chartRef.current.getContext("2d")
    if (!ctx) return

    // Clear previous chart
    ctx.clearRect(0, 0, chartRef.current.width, chartRef.current.height)

    // Draw placeholder chart based on type
    if (type === "bar" || type === "line") {
      drawAxisChart(ctx, labels, datasets, chartRef.current.width, chartRef.current.height)
    } else if (type === "pie" || type === "doughnut") {
      drawPieChart(ctx, labels, datasets, chartRef.current.width, chartRef.current.height)
    }

    return () => {
      if (chartInstanceRef.current) {
        // Clean up chart instance if needed
      }
    }
  }, [type, labels, datasets])

  // Placeholder function to draw axis charts (bar, line)
  const drawAxisChart = (
    ctx: CanvasRenderingContext2D,
    labels: string[],
    datasets: ChartDataset[],
    width: number,
    height: number,
  ) => {
    const dataset = datasets[0]
    const barWidth = width / (labels.length * 2)
    const maxValue = Math.max(...dataset.data)
    const scaleFactor = (height - 60) / maxValue

    // Draw axes
    ctx.beginPath()
    ctx.moveTo(40, 20)
    ctx.lineTo(40, height - 40)
    ctx.lineTo(width - 20, height - 40)
    ctx.strokeStyle = "#ddd"
    ctx.stroke()

    // Draw bars or lines
    dataset.data.forEach((value, index) => {
      const x = 40 + (index + 0.5) * ((width - 60) / labels.length)
      const barHeight = value * scaleFactor
      const y = height - 40 - barHeight

      ctx.fillStyle = (dataset.backgroundColor as string) || "#4f46e5"

      if (type === "bar") {
        ctx.fillRect(x - barWidth / 2, y, barWidth, barHeight)
      } else if (type === "line") {
        if (index === 0) {
          ctx.beginPath()
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      }
    })

    if (type === "line") {
      ctx.strokeStyle = (dataset.borderColor as string) || "#4f46e5"
      ctx.stroke()
    }

    // Draw labels
    ctx.fillStyle = "#888"
    ctx.font = "10px sans-serif"
    ctx.textAlign = "center"
    labels.forEach((label, index) => {
      const x = 40 + (index + 0.5) * ((width - 60) / labels.length)
      ctx.fillText(label, x, height - 20)
    })
  }

  // Placeholder function to draw pie/doughnut charts
  const drawPieChart = (
    ctx: CanvasRenderingContext2D,
    labels: string[],
    datasets: ChartDataset[],
    width: number,
    height: number,
  ) => {
    const dataset = datasets[0]
    const centerX = width / 2
    const centerY = height / 2
    const radius = Math.min(centerX, centerY) - 40
    const innerRadius = type === "doughnut" ? radius * 0.6 : 0

    const total = dataset.data.reduce((sum, value) => sum + value, 0)
    let startAngle = 0

    // Draw slices
    dataset.data.forEach((value, index) => {
      const sliceAngle = (2 * Math.PI * value) / total

      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.arc(centerX, centerY, radius, startAngle, startAngle + sliceAngle)
      ctx.closePath()

      const backgroundColor = Array.isArray(dataset.backgroundColor)
        ? dataset.backgroundColor[index]
        : dataset.backgroundColor || "#4f46e5"

      ctx.fillStyle = backgroundColor
      ctx.fill()

      if (type === "doughnut" && innerRadius > 0) {
        ctx.beginPath()
        ctx.moveTo(
          centerX + innerRadius * Math.cos(startAngle + sliceAngle / 2),
          centerY + innerRadius * Math.sin(startAngle + sliceAngle / 2),
        )
        ctx.arc(centerX, centerY, innerRadius, startAngle, startAngle + sliceAngle, false)
        ctx.closePath()
        ctx.fillStyle = "#fff"
        ctx.fill()
      }

      startAngle += sliceAngle
    })

    // Draw center hole for doughnut
    if (type === "doughnut") {
      ctx.beginPath()
      ctx.arc(centerX, centerY, innerRadius, 0, 2 * Math.PI)
      ctx.fillStyle = "#fff"
      ctx.fill()
    }
  }

  return (
    <div style={{ height: `${height}px`, width: "100%", position: "relative" }}>
      <canvas ref={chartRef} width="800" height={height} style={{ width: "100%", height: "100%" }} />
    </div>
  )
}
