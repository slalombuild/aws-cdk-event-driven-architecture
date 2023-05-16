#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { AppS3Stack} from '../lib/s3-bucket';
import 'source-map-support/register';
import { LambdaIamStack } from '../lib/lambda-iam-stack';

const app = new cdk.App();
const basic_lambda_stack = new LambdaIamStack(app, 'LambdaIamStack', {
  description: "Creates lambda function and IAM role and stores lambda arn into SSM"
});

new AppS3Stack(app, 'AppS3Stack', {
  description: "CDK Stack for S3 bucket creation and parameter store",
  lambdaFunction: basic_lambda_stack.lambdaFunction
})