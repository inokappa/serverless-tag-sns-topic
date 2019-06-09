# serverless-tag-sns-topic

Serverless plugin to tag SNS Topic (referred to https://github.com/gfragoso/serverless-tag-sqs :tada:)

## Installation

Install the plugin via <a href="https://github.com/inokappa/serverless-tag-sns-topic">Github</a>.

```
npm install --save-dev github:inokappa/serverless-tag-sns-topic
```

## Usage

In Serverless template:

```
custom:
  snsTopicTags:
      -
        Key: 'key1'
        Value: 'value1'
      -
        Key: 'key2'
        Value: 'value2'


plugins: 
  - serverless-tag-sns-topic

```