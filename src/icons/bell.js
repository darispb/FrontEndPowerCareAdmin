import * as React from "react"

function SvgComponent(props) {
  return (
    <svg
      width={72}
      height={64}
      viewBox="0 0 72 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#prefix__clip0)" fill="#fff">
        <path d="M64.137 45.101C59.601 41.693 57 36.712 57 31.435V24c0-9.384-7.842-17.152-18-18.453v-2.88C39 1.192 37.656 0 36 0s-3 1.192-3 2.667v2.88C22.84 6.848 15 14.616 15 24v7.435c0 5.277-2.6 10.258-7.164 13.688C6.67 46.01 6 47.3 6 48.667c0 2.573 2.355 4.666 5.25 4.666h49.5c2.895 0 5.25-2.093 5.25-4.666 0-1.366-.669-2.656-1.863-3.566zM36 64c5.433 0 9.978-3.443 11.022-8H24.978c1.044 4.557 5.59 8 11.022 8z" />
      </g>
      <defs>
        <clipPath id="prefix__clip0">
          <path fill="#fff" d="M0 0h72v64H0z" />
        </clipPath>
      </defs>
    </svg>
  )
}

export default SvgComponent
