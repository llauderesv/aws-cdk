import { LambdaIntegration } from 'aws-cdk-lib/aws-apigateway';
import { ITable } from 'aws-cdk-lib/aws-dynamodb';
import { Code, Function, Runtime } from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';
import { join } from 'path';

interface Props {
  suffix: string;
  spacesTable: ITable;
}

export class Lambda extends Construct {
  private readonly props: Props;
  private lambdaIntegration: LambdaIntegration;

  constructor(scope: Construct, id: string, props: Props) {
    super(scope, id);
    this.props = props;

    this.initialize();
  }

  initialize(): void {
    const lambdaFunction = new Function(this, 'HelloLambda', {
      runtime: Runtime.NODEJS_18_X,
      handler: 'hello.main',
      code: Code.fromAsset(join(__dirname, '..', '..', 'services')),
      environment: { TABLE_NAME: this.props.spacesTable.tableName },
    });

    this.lambdaIntegration = new LambdaIntegration(lambdaFunction);
  }

  getLambdaIntegration(): LambdaIntegration {
    return this.lambdaIntegration;
  }
}
