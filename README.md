# tihu-grpc-nodejs-client-example

Example code to call the Tihu gRPC with NodeJS

## Usage

Make sure you're running the Tihu api on `localhost:50051`

Install dependencies

```sh
yarn
```

Run one of the start commands then check output in the `output` folder.

### Simple

`src/index.ts`

Using only `grpc` and `@grpc/proto-loader` libraries to dynamically load proto file and generate client.

```sh
yarn start
```

### Generated

> BROKEN  
> Possible problem in API

Recommended to use clients generated from `.proto` file.

#### protoc-gen-ts

```sh
yarn start:protoc-gen-ts
```

Returns error

```
NodeHttp.error Error: Parse Error: Expected HTTP/
    at Socket.socketOnData (_http_client.js:476:22)
    at Socket.emit (events.js:310:20)
    at Socket.EventEmitter.emit (domain.js:482:12)
    at addChunk (_stream_readable.js:286:12)
    at readableAddChunk (_stream_readable.js:268:9)
    at Socket.Readable.push (_stream_readable.js:209:10)
    at TCP.onStreamRead (internal/stream_base_commons.js:186:23) {
  bytesParsed: 0,
  code: 'HPE_INVALID_CONSTANT',
  reason: 'Expected HTTP/',
  rawPacket: <Buffer 00 00 18 04 00 00 00 00 00 00 04 00 40 00 00 00 05 00 40 00 00 00 06 00 00 20 00 fe 03 00 00 00 01 00 00 04 08 00 00 00 00 00 00 3f 00 01 00 00 08 06 ... 13 more bytes>
}
grpc.onEnd
rawOnError 2 Response closed without headers
```

#### protoc-gen-grpc

```sh
yarn start:protoc-gen-grpc
```

Returns error

```
Error: 14 UNAVAILABLE: DNS resolution failed
```

## License

MIT
