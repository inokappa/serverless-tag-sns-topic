# serverless-tag-sns-topic

Serverless plugin to tag SNS Topic

## Installation

Install the plugin via <a href="https://docs.npmjs.com/cli/install">NPM</a>

```
npm install --save-dev serverless-tag-sns-topic
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