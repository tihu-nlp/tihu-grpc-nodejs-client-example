import fs from 'fs'
import path from 'path'
import grpc from 'grpc'
import * as protoLoader from '@grpc/proto-loader'
import header from 'waveheader'

var PROTO_PATH = path.resolve(__dirname, '..', 'tihu.proto')

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
})

const tihu = grpc.loadPackageDefinition(packageDefinition).tihu as any

const client = new tihu.Tihu(
  'localhost:50051',
  grpc.credentials.createInsecure()
)

const call = client.Speak({
  text: 'تیهو',
  voice: 1,
})

const stream = fs.createWriteStream('./output/simple.wav')
// write wav header first
stream.write(
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

call.on('data', function (data) {
  stream.write(data.wave)
})

call.on('end', (data) => {
  console.log('end')
})
