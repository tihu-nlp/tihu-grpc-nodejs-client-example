PLUGIN="./node_modules/.bin/grpc_tools_node_protoc_plugin"
DIR="./src/protoc-gen-ts"

grpc_tools_node_protoc \
  --js_out=import_style=commonjs,binary:${DIR} \
  --grpc_out=${DIR} \
  --plugin=protoc-gen-grpc="${PLUGIN}" \
  tihu.proto
