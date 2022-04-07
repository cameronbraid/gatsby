import { ImageFit, isImage } from "../types"
import type { ImageCropFocus, WidthOrHeight } from "../types"

export function generatePublicUrl(
  {
    url,
    mimeType,
  }: {
    url: string
    mimeType: string
  },
  checkMimeType: boolean = true
): string {
  const remoteUrl = Buffer.from(url).toString(`base64url`)

  let publicUrl =
    checkMimeType && isImage({ mimeType })
      ? `/_gatsby/image/`
      : `/_gatsby/file/`
  publicUrl += `${remoteUrl}`

  return publicUrl
}

export function generateImageArgs({
  width,
  height,
  format,
  cropFocus,
  quality,
  backgroundColor,
  fit,
}: WidthOrHeight & {
  format: string
  cropFocus?: ImageCropFocus | Array<ImageCropFocus>
  quality: number
  backgroundColor?: string
  fit: ImageFit
}): string {
  const args: Array<string> = []
  if (width) {
    args.push(`w=${width}`)
  }
  if (height) {
    args.push(`h=${height}`)
  }
  if (fit) {
    args.push(`fit=${fit}`)
  }
  if (cropFocus) {
    if (!fit) {
      args.push(`fit=crop`)
    }
    args.push(
      `crop=${Array.isArray(cropFocus) ? cropFocus.join(`,`) : cropFocus}`
    )
  }
  args.push(`fm=${format}`)
  args.push(`q=${quality}`)
  if (backgroundColor) {
    args.push(`bg=${backgroundColor}`)
  }

  return Buffer.from(args.join(`&`)).toString(`base64url`)
}
