'use client'

import { useEffect, useRef } from 'react'
import * as d3 from 'd3'

interface ChartProps {
  data: { sentiment: string; text: string }[]
}

export default function SentimentChart({ data }: ChartProps) {
  const chartRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!chartRef.current || !data || data.length === 0) return

    const svg = d3.select(chartRef.current)
    svg.selectAll('*').remove()

    const width = 400
    const height = 400
    const radius = Math.min(width, height) / 2

    const color = d3.scaleOrdinal()
      .domain(['positive', 'neutral', 'negative'])
      .range(['#4CAF50', '#FFC107', '#F44336'])

    const pie = d3.pie<number>().value(d => d)
    const arc = d3.arc<d3.PieArcDatum<number>>().innerRadius(0).outerRadius(radius)

    const counts = {
      positive: data.filter(d => d.sentiment === 'positive').length,
      neutral: data.filter(d => d.sentiment === 'neutral').length,
      negative: data.filter(d => d.sentiment === 'negative').length,
    }

    const pieData = pie(Object.values(counts))

    const g = svg.append('g')
      .attr('transform', `translate(${width / 2},${height / 2})`)

    g.selectAll('path')
      .data(pieData)
      .enter()
      .append('path')
      .attr('d', arc)
      .attr('fill', (d, i) => color(Object.keys(counts)[i] as string))

    g.selectAll('text')
      .data(pieData)
      .enter()
      .append('text')
      .attr('transform', d => `translate(${arc.centroid(d)})`)
      .attr('dy', '0.35em')
      .text(d => `${Object.keys(counts)[d.index]}: ${d.value}`)
      .attr('text-anchor', 'middle')
      .style('fill', '#ffffff')
      .style('font-size', '12px')

  }, [data])

  return <svg ref={chartRef} width="400" height="400"></svg>
}

