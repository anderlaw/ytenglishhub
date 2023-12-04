import { DynamoDB } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb';
export const dynamo = DynamoDBDocument.from(new DynamoDB({
    region: "us-east-1",
    credentials: {
        accessKeyId: "AKIA2QPNRUV2GUUARF7Q",
        secretAccessKey: "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"
    }
}));
export const TableName = 'ytenglish-main'
export const db_createUser = ({
    displayName,
    email,
    photoURL
}: any) => {
    return dynamo.put({
        TableName,
        Item: {
            displayName,
            email,
            photoURL,
            create_at: String(Date.now())
        }
    })
}