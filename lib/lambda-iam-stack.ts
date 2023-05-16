import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';
import * as path from 'path';
import * as ssm from 'aws-cdk-lib/aws-ssm';

export class LambdaIamStack extends cdk.Stack {
  public readonly bucketName: string;
  public readonly lambdaFunction: lambda.Function;

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    this.lambdaFunction = new lambda.Function(this, 'S3EventNotificationsLambda', {
      runtime: lambda.Runtime.PYTHON_3_9,
      functionName: 'S3EventNotificationsManager',
      handler: 'lambda_function.lambda_handler',
      code: lambda.Code.fromAsset(path.join(__dirname, '../lambda')),
      timeout: cdk.Duration.seconds(300)
    });

    const lambdaArn = cdk.Arn.format({
      service: 'lambda',
      resource: 'S3EventNotificationsManager'
    }, this);

    new ssm.StringParameter(this, 'lambda-arn-Parameter', {
      allowedPattern: '.*',
      description: 'lambda bucket ARN',
      parameterName: '/dev/lambda',
      stringValue: lambdaArn,

      tier: ssm.ParameterTier.ADVANCED,
    });

    new ssm.StringParameter(this, 'lambda-function-name', {
      allowedPattern: '.*',
      description: 'lambda function name',
      parameterName: '/dev/lambdafunction-name',
      stringValue:  this.lambdaFunction.functionName,

      tier: ssm.ParameterTier.ADVANCED,
    });

  }
}
