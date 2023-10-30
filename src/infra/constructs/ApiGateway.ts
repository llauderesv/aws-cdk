import { LambdaIntegration, RestApi } from 'aws-cdk-lib/aws-apigateway';
import { Construct } from 'constructs';

interface Props {
  lambdaIntegration: LambdaIntegration;
}

export class ApiGateway extends Construct {
  private props: Props;

  constructor(scope: Construct, id: string, props?: Props) {
    super(scope, id);
    this.props = props;

    this.initialize();
  }

  initialize(): void {
    const api = new RestApi(this, 'SpacesApi');
    const spacesResource = api.root.addResource('spaces');
    spacesResource.addMethod('GET', this.props.lambdaIntegration);
  }
}
