var AWS = require("aws-sdk");
AWS.config.update({region: "us-east-1"});
var sns = new AWS.SNS();

var params = {
    Message: 'TESTING',
    MessageAttributes: {
      'Name': {
        DataType: 'String',
        StringValue: 'Neal Magee'
      },
    },
    Subject: 'SUBJECT_VALUE',
    TopicArn: 'arn:aws:sns:us-east-1:474683445819:website-form'
  };
  sns.publish(params, function(err, data) {
    if (err) console.log(err, err.stack);
    else     console.log(data);
  });
