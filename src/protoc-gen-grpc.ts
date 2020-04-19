import fs from 'fs'
import header from 'waveheader'
import { TihuClient } from './protoc-gen-grpc/tihu_grpc_pb'
import { SpeakRequest } from './protoc-gen-grpc/tihu_pb'
import grpc from 'grpc'

const client = new TihuClient(
  'http://localhost:50051/',
  grpc.credentials.createInsecure()
)

const request = new SpeakRequest()
request.setText('تیهو')
request.setVoice(1)

const wavOutput = fs.createWriteStream('./output/voice.wav')

// write wav header first
wavOutput.write(
  header(
    // set 0 because we need to write out the file first before we know the size
    // waveheader will use a very large number
    0,
    {
      sampleRate: 22050,
      channels: 1,
      bitDepth: 16,
    }
  )
)

const tagOutput = fs.createWriteStream('./output/tags.txt')

const response = client.speak(request)

response.on('data', ({ getWave_asU8, getTags }) => {
  const wave = getWave_asU8()
  wavOutput.write(wave)

  const tags = getTags()
  tagOutput.write(tags)
})

response.on('end', (status) => {
  console.log('response stream end', JSON.stringify(status))
})
