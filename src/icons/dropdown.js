import * as React from "react"

function SvgComponent(props) {
  return (
    <svg
      width={17}
      height={17}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#prefix__clip0_144:120)">
        <path
          d="M.149 2.81l7.466 12.443c.4.668 1.37.668 1.77 0l7.466-12.444a1.032 1.032 0 00-.885-1.563H1.034c-.803 0-1.298.875-.885 1.563z"
          fill="#878282"
        />
      </g>
      <defs>
        <clipPath id="prefix__clip0_144:120">
          <path
            fill="#fff"
            transform="rotate(-180 8.5 8.5)"
            d="M0 0h17v17H0z"
          />
        </clipPath>
      </defs>
    </svg>
  )
}

export default SvgComponent
