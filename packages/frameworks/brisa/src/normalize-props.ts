import { createNormalizer } from "@zag-js/types"
type WithoutRef<T> = Omit<T, "ref">

type ElementsWithoutRef = {
  [K in keyof JSX.IntrinsicElements]: WithoutRef<JSX.IntrinsicElements[K]>
}

export type PropTypes = ElementsWithoutRef & {
  element: WithoutRef<JSX.DOMAttributes<HTMLElement>>
  style: JSX.CSSProperties
}

const eventMap: Record<string, string> = {
  onFocus: "onfocusin",
  onBlur: "onfocusout",
  onDoubleClick: "onDblClick",
  onChange: "onInput",
  defaultChecked: "checked",
  defaultValue: "value",
}

function toBrisaProp(prop: string) {
  return prop in eventMap ? eventMap[prop] : prop
}

type Dict = Record<string, any>

export const normalizeProps = createNormalizer<PropTypes>((props: Dict) => {
  const normalized: Dict = {}
  for (const key in props) {
    // if (props[key] === undefined) continue
    if (key === "disabled" && props[key] === false) continue
    normalized[toBrisaProp(key)] = props[key]
  }
  return normalized
})
