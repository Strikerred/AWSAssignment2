# AWS Assignment 2

## 1. Dynamo Database

![](images/dynamotable.png)

## 2. S3 Bucket

![](images/imagesbucket.png)

## 3. Lambda functions:

```
const AWS = require("aws-sdk")
const docClient =  new AWS.DynamoDB.DocumentClient({ region: "us-east-1" })

exports.handler = async event => {
    var params = {
        TableName: "Items"
    }

try {
    // Utilising the scan method to get all items in the table
    const data = await docClient.scan(params).promise();
    const response = {
      statusCode: 200,
      body: JSON.stringify(data.Items)
    };
    return response;
  } catch (e) {
    return {
      statusCode: 500
    };
  }
};
```

```
const AWS = require("aws-sdk");
const docClient =  new AWS.DynamoDB.DocumentClient({ region: "us-east-1" });

exports.handler = async event => {

    var player= {};

    player.Id = event.params.path.id;

    var params = {
        TableName: "Items",
        Key: {
            Id: parseInt(player.Id)
        }
    };

try {
    // Utilising the scan method to get all items in the table
    const data = await docClient.get(params).promise();
    const response = {
      statusCode: 200,
      body: data.Item
    };
    return response;
  } catch (e) {
    return {
      statusCode: 500, body: e
    };
  }
};
```
## 4. API Gateway

![](images/apigateway.png)

