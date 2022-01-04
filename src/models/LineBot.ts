export interface MessageInput {
  type: string
  // text
  text?: string
  // sticker
  packageId?: string
  stickerId?: string
  // image or video
  originalContentUrl?: string
  previewImageUrl?: string
}
