import * as React from "react"

function SvgComponent(props) {
  return (
    <svg
      {...props}
      width="1em"
      height="1em"
      viewBox="0 0 73 76"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#prefix__clip0_1339:28)" fill="#fff">
        <path d="M41.772 38c-17.296 0-31.33 12.766-31.33 28.5 0 5.251 4.671 9.5 10.444 9.5h41.772c5.772 0 10.443-4.249 10.443-9.5 0-15.734-14.033-28.5-31.329-28.5zM41.772 28.5c8.651 0 15.665-6.38 15.665-14.25S50.423 0 41.772 0 26.107 6.38 26.107 14.25 33.121 28.5 41.772 28.5z" />
      </g>
      <defs>
        <clipPath id="prefix__clip0_1339:28">
          <path fill="#fff" d="M0 0h73v76H0z" />
        </clipPath>
      </defs>
    </svg>
  )
}

export default SvgComponent
