import Image from 'next/image'

interface GoogleIconProps {
  className?: string
  size?: number
}

export function GoogleIcon({ className, size = 24 }: GoogleIconProps) {
  return (
    <Image
      src="https://img.icons8.com/color/48/google-logo.png"
      alt="Google logo"
      width={size}
      height={size}
      className={className}
      unoptimized
    />
  )
}