# 📝 Disposable Notes API (AWS Serverless)

A simple serverless API to create one-time-view "self-destructing" notes using AWS Lambda, API Gateway, and DynamoDB.

## 🔧 Tech Stack
- AWS Lambda (Node.js 18.x)
- API Gateway (REST)
- DynamoDB (with TTL)
- IAM & CloudWatch

## 📌 Features
- Create notes with expiry time (in minutes)
- View + auto-delete notes after 1st view
- Expiry via DynamoDB TTL

## Steps
- Create a DynamoDB table named Notes with the columns noteId (Partition key), noteContent, and expireAt
- Enable TTL (Time To Live) for the Notes table
- Create the Lambda functions (createNote and viewNote) and deploy
- Create API gateway (HTTP) routes for POST (/notes) and GET (/notes/{noteId}) requests & integrate each with the relevant Lambda function
- (Optional) To view the console logs direct to the CloudWatch Logs page  

## 🛠️ Endpoints

### Create Note
`POST /notes`

**Request:**
```json
{
  "noteContent": "Secret message",
  "expiryMinutes": 5
}
