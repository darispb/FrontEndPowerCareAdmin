import * as React from "react"

function SvgComponent(props) {
  return (
    <svg
      width={23}
      height={23}
      viewBox="0 0 23 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M13.607 11.52l8.956-8.956a1.488 1.488 0 000-2.107 1.489 1.489 0 00-2.107 0L11.5 9.413 2.544.457a1.489 1.489 0 00-2.107 0 1.488 1.488 0 000 2.107l8.956 8.956-8.956 8.956a1.488 1.488 0 001.054 2.543c.381 0 .763-.146 1.053-.436l8.956-8.956 8.956 8.956a1.486 1.486 0 002.107 0 1.488 1.488 0 000-2.107l-8.956-8.956z"
        fill="#FEFCFC"
      />
    </svg>
  )
}

export default SvgComponent