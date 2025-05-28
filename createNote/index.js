// This Lambda function creates a note with an expiry time in DynamoDB.
const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, PutCommand } = require("@aws-sdk/lib-dynamodb");
const { randomUUID } = require("crypto");

const client = new DynamoDBClient({});
const ddbDocClient = DynamoDBDocumentClient.from(client);

exports.handler = async (event) => {
  const { noteContent, expiryMinutes } = JSON.parse(event.body);

  if (!noteContent || !expiryMinutes) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Missing required fields" }),
    };
  }

  const noteId = randomUUID();
  const expireAt = Math.floor(Date.now() / 1000) + expiryMinutes * 60;

  const params = {
    TableName: "Notes",
    Item: {
      noteId,
      noteContent,
      expireAt,
    },
  };

  try {
    await ddbDocClient.send(new PutCommand(params));
    return {
      statusCode: 201,
      body: JSON.stringify({ message: "Note created", noteId }),
    };
  } catch (err) {
    console.error("Error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal Server Error" }),
    };
  }
};
