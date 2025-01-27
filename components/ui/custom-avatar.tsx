import Image from "next/image"
import { cn } from "@/lib/utils"
import { Avatar as ShadcnAvatar, AvatarFallback } from "@/components/ui/avatar"

interface CustomAvatarProps {
  src: string
  alt: string
  fallback: string
  className?: string
  size?: number
}

export function CustomAvatar({ src, alt, fallback, className, size = 64 }: CustomAvatarProps) {
  return (
    <ShadcnAvatar className={cn("relative", className)} style={{ width: size, height: size }}>
      <Image
        src={src || "/placeholder.svg"}
        alt={alt}
        width={size}
        height={size}
        className="object- object-contain bg-contain"
        style={{ borderRadius: "inherit" }}
      />
      <AvatarFallback>{fallback}</AvatarFallback>
    </ShadcnAvatar>
  )
}

