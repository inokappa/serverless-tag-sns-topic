'use strict';

const _ = require('lodash');

let _snsService = null;
let _cloudFormationService = null;

class ServerlessSNSTopicTagPlugin {
  get stackName() {
    return `${this.serverless.service.service}-${this.options.stage}`;
  }

  get snsService() {
    if (!_snsService) {
      _snsService = new this.awsService.sdk.SNS({region: this.options.region});
    }

    return _snsService;
  }

  get cloudFormationService() {
    if (!_cloudFormationService) {
      _cloudFormationService = new this.awsService.sdk.CloudFormation({
        region: this.options.region,
      });
    }

    return _cloudFormationService;
  }

  constructor(serverless, options) {
    this.options = options;
    this.serverless = serverless;
    this.awsService = this.serverless.getProvider('aws');

    this.hooks = {
      'after:deploy:deploy': this.execute.bind(this),
    };
  }

  execute() {
    return this.getStackResources()
        .then((data) => this.tagTopics(data))
        .then((data) => this.serverless.cli.log(JSON.stringify(data)))
        .catch((err) => this.serverless.cli.log(JSON.stringify(err)));
  }

  getStackResources() {
    return new Promise((resolve, reject) => {
      this.cloudFormationService.describeStackResources({
        StackName: this.stackName}, (err, data) => {
        if (err) return reject(err);
        resolve(data);
      });
    });
  }

  tagTopics(data) {
    const snsResources = _.filter(data.StackResources,
        {ResourceType: 'AWS::SNS::Topic'});
    const promises = _.map(snsResources, (item) => {
      return new Promise((resolve, reject) => {
        const params = {
          ResourceArn: item.PhysicalResourceId,
          Tags: this.serverless.service.custom.snsTopicTags,
        };
        this.snsService.tagResource(params, (err, apiData) => {
          if (err) return reject(err);
          resolve(`Tagged SNS Topic ${item.LogicalResourceId}`);
        });
      });
    });

    return Promise.all(promises);
  }
}

module.exports = ServerlessSNSTopicTagPlugin;
