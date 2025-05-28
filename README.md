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

## 🛠️ Endpoints

### Create Note
`POST /notes`

**Request:**
```json
{
  "noteContent": "Secret message",
  "expiryMinutes": 5
}
