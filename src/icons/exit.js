import * as React from "react";

function SvgComponent(props) {
  return (
    <svg
      width={50}
      height={50}
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...props}
    >
      <path fill="url(#prefix__pattern0)" d="M0 0h50v50H0z" />
      <defs>
        <pattern
          id="prefix__pattern0"
          patternContentUnits="objectBoundingBox"
          width={1}
          height={1}
        >
          <use xlinkHref="#prefix__image0" transform="scale(.00667)" />
        </pattern>
        <image
          id="prefix__image0"
          width={150}
          height={150}
          xlinkHref="data:image/png;base64,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"
        />
      </defs>
    </svg>
  );
}

export default SvgComponent;
