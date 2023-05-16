import {CfnOutput } from 'aws-cdk-lib';
import * as cdk from 'aws-cdk-lib'
import * as iam from 'aws-cdk-lib/aws-iam';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as ssm from 'aws-cdk-lib/aws-ssm';
import * as lambdaEventSources from 'aws-cdk-lib/aws-lambda-event-sources';
import * as lambda from 'aws-cdk-lib/aws-lambda';

export interface LambdaProps extends cdk.StackProps{
  readonly lambdaFunction: lambda.Function;
}

export class AppS3Stack extends cdk.Stack {
  public readonly S3bucket: s3.Bucket;
    constructor(scope: cdk.App, id: string, props: LambdaProps) {
    super(scope, id, props);


    const Apps3Bucket = new s3.Bucket(this, 'exampleBucket', {
      bucketName: `cdk-event-driven-arch-bucket`,
      objectOwnership: s3.ObjectOwnership.BUCKET_OWNER_ENFORCED,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
    });

    Apps3Bucket.grantRead(new iam.AccountRootPrincipal());
    const s3BucketArn = Apps3Bucket.bucketArn;
    const S3bucketName = Apps3Bucket.bucketName;

    new CfnOutput(this, 'exampleBucketArn', {
      value: s3BucketArn,
      description: 'arn of demo app s3 bucket',
    })

    new ssm.StringParameter(this, 'S3bucket-arn-Parameter', {
      allowedPattern: '.*',
      description: 'S3 bucket ARN',
      parameterName: '/dev/s3bucket',
      stringValue: s3BucketArn,
      
      tier: ssm.ParameterTier.ADVANCED,
    });

    new ssm.StringParameter(this, 'S3bucket-name-Parameter', {
      allowedPattern: '.*',
      description: 'S3 bucket Name',
      parameterName: '/dev/s3bucketname',
      stringValue: S3bucketName,

      tier: ssm.ParameterTier.ADVANCED,
    });

    const s3PutEventSource = new lambdaEventSources.S3EventSource(Apps3Bucket, {
      events: [
        s3.EventType.OBJECT_CREATED_PUT
      ]
    });

    props.lambdaFunction.addEventSource(s3PutEventSource);
  }
}
