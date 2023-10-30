import { App } from 'aws-cdk-lib';
import { Section5Stack } from './stacks/section-5-stack';

const app = new App();

const section5Stack = new Section5Stack(app, 'section5Stack');
