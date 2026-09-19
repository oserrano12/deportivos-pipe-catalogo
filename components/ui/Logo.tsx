import React from 'react'

interface LogoProps extends React.SVGProps<SVGSVGElement> {
  className?: string
  showText?: boolean
}

export function Logo({ className = "h-8", showText = true, ...props }: LogoProps) {
  return (
    <svg 
      viewBox={showText ? "0 0 400 120" : "0 0 150 120"} 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      {/* Winged P Icon */}
      <g transform="translate(10, 10)">
        {/* Light Blue Accent / Wings */}
        <path 
          d="M 50 80 Q 20 70 0 30 Q 30 40 50 50 Z" 
          fill="#1EA1F2" 
        />
        <path 
          d="M 55 65 Q 20 50 5 10 Q 35 25 55 40 Z" 
          fill="#1EA1F2" 
        />
        <path 
          d="M 65 45 Q 30 30 15 -5 Q 50 15 70 25 Z" 
          fill="#0047BB" 
        />
        
        {/* The Main 'P' */}
        <path 
          d="M 55 100 L 75 20 C 75 20 120 15 130 45 C 140 75 90 85 70 85 L 60 100 Z" 
          fill="#111827" 
          className="dark:fill-white"
        />
        {/* Inner hole of 'P' */}
        <path 
          d="M 85 45 C 85 45 105 45 105 55 C 105 65 85 65 85 65 Z" 
          fill="white" 
          className="dark:fill-[#0F172A]"
        />

        {/* Light blue wrap around */}
        <path 
          d="M 75 10 L 80 -5 C 80 -5 145 0 155 45 C 165 90 95 105 75 105 L 70 90 C 70 90 125 75 125 45 C 125 25 80 15 75 10 Z" 
          fill="#1EA1F2" 
        />
      </g>

      {/* Text */}
      {showText && (
        <g transform="translate(170, 0)">
          <text 
            x="0" 
            y="45" 
            fontFamily="Arial, sans-serif" 
            fontWeight="900" 
            fontStyle="italic" 
            fontSize="32" 
            letterSpacing="2"
            fill="#111827"
            className="dark:fill-white"
          >
            DEPORTIVOS
          </text>
          <text 
            x="0" 
            y="105" 
            fontFamily="Arial, sans-serif" 
            fontWeight="900" 
            fontStyle="italic" 
            fontSize="72" 
            letterSpacing="-1"
            fill="#0047BB"
            className="dark:fill-[#38BDF8]"
          >
            PIPE
          </text>
        </g>
      )}
    </svg>
  )
}
