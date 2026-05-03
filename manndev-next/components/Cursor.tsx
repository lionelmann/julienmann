"use client"
import { useEffect } from "react"

export default function Cursor() {
  useEffect(() => {
    const cursor = document.getElementById("cursor")!
    const ring = document.getElementById("cursor-ring")!
    let mx = 0, my = 0, rx = 0, ry = 0

    document.addEventListener("mousemove", (e) => {
      mx = e.clientX; my = e.clientY
      cursor.style.left = mx + "px"; cursor.style.top = my + "px"
    })
    const animRing = () => {
      rx += (mx - rx) * 0.12; ry += (my - ry) * 0.12
      ring.style.left = rx + "px"; ring.style.top = ry + "px"
      requestAnimationFrame(animRing)
    }
    animRing()

    const hoverEls = document.querySelectorAll("a,button,[role='button'],.process-trigger,.tab-btn")
    hoverEls.forEach((el) => {
      el.addEventListener("mouseenter", () => document.body.classList.add("cursor-hover"))
      el.addEventListener("mouseleave", () => document.body.classList.remove("cursor-hover"))
    })
    document.addEventListener("mousedown", () => document.body.classList.add("cursor-active"))
    document.addEventListener("mouseup", () => document.body.classList.remove("cursor-active"))
  }, [])

  return (
    <>
      <div id="noise" aria-hidden="true" />
      <div id="cursor" aria-hidden="true" />
      <div id="cursor-ring" aria-hidden="true" />
    </>
  )
}
