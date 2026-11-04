import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"
import { createRequire } from "node:module"

const require = createRequire(import.meta.url)
const { pathways, courses } = require("../pathways.js")

export default defineConfig({
  plugins: [react(), tailwindcss()],
  define: {
    __PATHWAYS__: JSON.stringify(pathways),
    __COURSES__: JSON.stringify([...courses]),
    __RESOURCES__: JSON.stringify(require("../resources.js")),
  },
})
