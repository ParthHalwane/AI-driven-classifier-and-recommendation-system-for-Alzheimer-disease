const AWS = require("aws-sdk");

AWS.config.update({ region: "your-region" });

const dynamoDB = new AWS.DynamoDB.DocumentClient();
const tableName = "YourDynamoDBTableName";

async function saveToDynamoDB(userId, data) {
    const params = {
        TableName: tableName,
        Item: {
            userId: userId,
            id: Date.now().toString(),
            ...data,
        },
    };

    return dynamoDB.put(params).promise();
}

module.exports = { saveToDynamoDB };
