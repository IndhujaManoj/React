import * as React from 'react'

const ProfileIcon = (props) => (
  <svg
    width={32}
    height={32}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <circle cx={16} cy={16} r={16} fill="#9AD8FF" />
    <circle cx={16} cy={16} r={16} fill="url(#a)" />
    <defs>
      <linearGradient
        id="a"
        x1={40.4}
        y1={6.4}
        x2={16}
        y2={32}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#D23131" />
        <stop offset={1} stopColor="#1997F2" />
      </linearGradient>
    </defs>
  </svg>
)

export default ProfileIcon
