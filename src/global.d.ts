declare module 'waveheader' {
  export default function (
    size: number,
    options: {
      sampleRate: number
      channels: number
      bitDepth: number
    }
  ): string
}
