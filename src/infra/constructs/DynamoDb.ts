import { CfnOutput } from 'aws-cdk-lib';
import { AttributeType, Table } from 'aws-cdk-lib/aws-dynamodb';
import { Construct } from 'constructs';

interface Props {
  suffix: string;
}

export class DynamoDb extends Construct {
  private mainTable: Table;
  private readonly props: Props;

  constructor(scope: Construct, id: string, props: Props) {
    super(scope, id);
    this.props = props;

    this.initialize();
  }

  initialize(): void {
    const suffix = this.props.suffix;
    this.mainTable = new Table(this, 'SpacesTable', {
      partitionKey: {
        name: 'id',
        type: AttributeType.STRING,
      },
      tableName: `SpaceTable-${suffix}`,
    });

    new CfnOutput(this, 'DataStackSuffix', { value: suffix });
  }

  getMainTable(): Table {
    return this.mainTable;
  }
}
