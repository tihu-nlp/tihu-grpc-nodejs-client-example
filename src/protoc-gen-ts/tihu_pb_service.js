// package: tihu
// file: tihu.proto

var tihu_pb = require("./tihu_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var Tihu = (function () {
  function Tihu() {}
  Tihu.serviceName = "tihu.Tihu";
  return Tihu;
}());

Tihu.Speak = {
  methodName: "Speak",
  service: Tihu,
  requestStream: false,
  responseStream: true,
  requestType: tihu_pb.SpeakRequest,
  responseType: tihu_pb.SpeakReply
};

Tihu.Version = {
  methodName: "Version",
  service: Tihu,
  requestStream: false,
  responseStream: false,
  requestType: tihu_pb.Empty,
  responseType: tihu_pb.VersionReply
};

exports.Tihu = Tihu;

function TihuClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

TihuClient.prototype.speak = function speak(requestMessage, metadata) {
  var listeners = {
    data: [],
    end: [],
    status: []
  };
  var client = grpc.invoke(Tihu.Speak, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onMessage: function (responseMessage) {
      listeners.data.forEach(function (handler) {
        handler(responseMessage);
      });
    },
    onEnd: function (status, statusMessage, trailers) {
      listeners.status.forEach(function (handler) {
        handler({ code: status, details: statusMessage, metadata: trailers });
      });
      listeners.end.forEach(function (handler) {
        handler({ code: status, details: statusMessage, metadata: trailers });
      });
      listeners = null;
    }
  });
  return {
    on: function (type, handler) {
      listeners[type].push(handler);
      return this;
    },
    cancel: function () {
      listeners = null;
      client.close();
    }
  };
};

TihuClient.prototype.version = function version(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(Tihu.Version, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

exports.TihuClient = TihuClient;

