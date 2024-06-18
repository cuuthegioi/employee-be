import { ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

export const grpcClientOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    package: 'employee',
    protoPath: join(__dirname, '../protos/employee.proto'),
  },
};
