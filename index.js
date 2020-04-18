const fs = require("fs");
const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");
var PROTO_PATH = __dirname + "/tihu.proto";
const header = require("waveheader");

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const tihu = grpc.loadPackageDefinition(packageDefinition).tihu;

const client = new tihu.Tihu(
  "localhost:50051",
  grpc.credentials.createInsecure()
);

const call = client.Speak({
  text: "شتر",
  voice: 1,
});

const stream = fs.createWriteStream("./result.wav");
stream.write(
  header(0, {
    sampleRate: 22050,
    channels: 1,
    bitDepth: 16,
  })
);

call.on("data", function (data) {
  stream.write(data.wave);
});

call.on("end", (data) => {
  console.log("end");
});
