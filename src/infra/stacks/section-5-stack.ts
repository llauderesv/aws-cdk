import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Lambda } from '../constructs/Lambda';
import { DynamoDb } from '../constructs/DynamoDb';
import { getSuffixFromStack } from '../Utils';
import { ApiGateway } from '../constructs/ApiGateway';

export class Section5Stack extends Stack {
  private readonly suffix: string;

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    this.suffix = getSuffixFromStack(this);
    this.initialize();
  }

  initialize(): void {
    const dynamoDb = new DynamoDb(this, 'MyDynamoDb', { suffix: this.suffix });
    const lambda = new Lambda(this, 'MyLambda', {
      suffix: this.suffix,
      spacesTable: dynamoDb.getMainTable(),
    });

    new ApiGateway(this, 'MyApiGateway', {
      lambdaIntegration: lambda.getLambdaIntegration(),
    });
  }
}
