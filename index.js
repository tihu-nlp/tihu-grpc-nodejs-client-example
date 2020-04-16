const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");
var PROTO_PATH = __dirname + "/tihu.proto";

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
  text: "نی دارند هم",
  voice: 10,
});

call.on("data", function (data) {
  console.log("success");
});
