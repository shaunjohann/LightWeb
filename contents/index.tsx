import cssText from "data-text:~/contents/style.css"
import type { PlasmoCSConfig } from "plasmo"
import { useEffect, useRef, useState } from "react"

import { useStorage } from "@plasmohq/storage/hook"

import "./style.css"

export const config: PlasmoCSConfig = {
  matches: ["<all_urls>"]
}

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

const Promptbar = () => {
  const [activePrompt, setActivePrompt] = useStorage(
    "light-active-prompt-text",
    (v) => (v === undefined ? "" : v)
  )
  const [show, setShow] = useState(true)

  const promptBarRef = useRef<HTMLInputElement>(null)

  // Trigger prompt bar with keyboard shortcut (ctrl + cmd + k)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "k" && e.metaKey && e.ctrlKey) {
        setShow((prev) => !prev)
      }
    }

    document.addEventListener("keydown", handleKeyDown)

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [])

  // Focus prompt bar when it is shown
  useEffect(() => {
    if (show) {
      promptBarRef.current?.focus()
    }
  }, [show])

  return show ? (
    <section className="w-[500px] h-fit bg-black/80 backdrop-blur-md rounded-lg border-white m-auto border-[1.5px] border-white/[0.13]">
      <input
        ref={promptBarRef}
        type="text"
        value={activePrompt}
        placeholder="How can i help you?"
        className="p-[15px] w-full bg-transparent text-white outline-none placeholder:text-white/30"
        onChange={(e) => setActivePrompt(e.target.value)}
      />
      <section className="flex items-center justify-between w-full p-[15px] border-t-[1.5px] border-white/[0.13]">
        <p>Light</p>
      </section>
    </section>
  ) : null
}

export default Promptbar
