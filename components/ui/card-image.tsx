import * as React from "react"
import { cn } from "@/lib/utils/cn"

export interface CardImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  aspectRatio?: "square" | "video" | string
}

const CardImage = React.forwardRef<HTMLImageElement, CardImageProps>(
  ({ className, aspectRatio = "video", alt, ...props }, ref) => {
    const aspectRatioClass = {
      square: "aspect-square",
      video: "aspect-video",
    }[aspectRatio] || aspectRatio

    return (
      <div className={cn("overflow-hidden rounded-t-lg", aspectRatioClass)}>
        <img
          ref={ref}
          alt={alt}
          className={cn("h-full w-full object-cover transition-transform hover:scale-105", className)}
          {...props}
        />
      </div>
    )
  }
)
CardImage.displayName = "CardImage"

export { CardImage }
