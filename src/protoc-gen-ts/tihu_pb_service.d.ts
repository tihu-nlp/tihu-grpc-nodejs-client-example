// package: tihu
// file: tihu.proto

import * as tihu_pb from "./tihu_pb";
import {grpc} from "@improbable-eng/grpc-web";

type TihuSpeak = {
  readonly methodName: string;
  readonly service: typeof Tihu;
  readonly requestStream: false;
  readonly responseStream: true;
  readonly requestType: typeof tihu_pb.SpeakRequest;
  readonly responseType: typeof tihu_pb.SpeakReply;
};

type TihuVersion = {
  readonly methodName: string;
  readonly service: typeof Tihu;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof tihu_pb.Empty;
  readonly responseType: typeof tihu_pb.VersionReply;
};

export class Tihu {
  static readonly serviceName: string;
  static readonly Speak: TihuSpeak;
  static readonly Version: TihuVersion;
}

export type ServiceError = { message: string, code: number; metadata: grpc.Metadata }
export type Status = { details: string, code: number; metadata: grpc.Metadata }

interface UnaryResponse {
  cancel(): void;
}
interface ResponseStream<T> {
  cancel(): void;
  on(type: 'data', handler: (message: T) => void): ResponseStream<T>;
  on(type: 'end', handler: (status?: Status) => void): ResponseStream<T>;
  on(type: 'status', handler: (status: Status) => void): ResponseStream<T>;
}
interface RequestStream<T> {
  write(message: T): RequestStream<T>;
  end(): void;
  cancel(): void;
  on(type: 'end', handler: (status?: Status) => void): RequestStream<T>;
  on(type: 'status', handler: (status: Status) => void): RequestStream<T>;
}
interface BidirectionalStream<ReqT, ResT> {
  write(message: ReqT): BidirectionalStream<ReqT, ResT>;
  end(): void;
  cancel(): void;
  on(type: 'data', handler: (message: ResT) => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'end', handler: (status?: Status) => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'status', handler: (status: Status) => void): BidirectionalStream<ReqT, ResT>;
}

export class TihuClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);
  speak(requestMessage: tihu_pb.SpeakRequest, metadata?: grpc.Metadata): ResponseStream<tihu_pb.SpeakReply>;
  version(
    requestMessage: tihu_pb.Empty,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: tihu_pb.VersionReply|null) => void
  ): UnaryResponse;
  version(
    requestMessage: tihu_pb.Empty,
    callback: (error: ServiceError|null, responseMessage: tihu_pb.VersionReply|null) => void
  ): UnaryResponse;
}

