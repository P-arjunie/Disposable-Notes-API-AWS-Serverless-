// index.js for ViewNoteFunction (Node.js 18)
const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, GetCommand } = require("@aws-sdk/lib-dynamodb");

const client = new DynamoDBClient({});
const ddbDocClient = DynamoDBDocumentClient.from(client);

exports.handler = async (event) => {
  const noteId = event.pathParameters?.noteId;

  if (!noteId) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Missing noteId in path" }),
    };
  }

  const params = {
    TableName: "Notes",
    Key: { noteId },
  };

  try {
    const result = await ddbDocClient.send(new GetCommand(params));

    if (!result.Item) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: "Note not found" }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify(result.Item),
    };
  } catch (err) {
    console.error("DynamoDB Error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal Server Error" }),
    };
  }
};
