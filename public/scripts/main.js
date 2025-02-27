import { GridItem } from "./item/item.js"

customElements.define("grid-item", GridItem)

export const items = [
  { title: "Title 1", columns: 6, rows: 2 },
  { title: "Title 2", columns: 6, rows: 2 },
  { title: "Title 3", columns: 4, rows: 3 },
  { title: "Title 4", columns: 4, rows: 2 },
  { title: "Title 5", columns: 4, rows: 2 },
  { title: "Title 6", columns: 4, rows: 2 },
]

const container = document.getElementById("grid-container")

const render = ({ title, columns, rows }) => {
  const item = document.createElement("grid-item")
  item.textContent = title

  if (columns) item.setAttribute("data-columns", columns.toString())
  if (rows) item.setAttribute("data-rows", rows.toString())

  container?.appendChild(item)
}

items.forEach((item) => render(item))
