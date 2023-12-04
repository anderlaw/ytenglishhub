import { runCommand } from "@/utils";
import { NextRequest } from "next/server";
import { QueryCommand, PutItemCommand } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb';
import { db_createUser, dynamo, TableName } from "@/utils/db";
/**
 * 本机测试代码，上线后删除
 */

/**
 * 。user表插入一条信息。
 * 包含，displayname,email,photoURL 三条。其中displayname、photoURL可以修改。
 * @param request
 * @returns 
 */
export async function POST(request: NextRequest) {

  // db_createUser()

  //写入dynaicDB 然后user表里。
  const body = await request.json()
  console.log('data from 前端===>', body)
  const res = await dynamo.update({
    TableName,
    Key: {
      email: "jabin.haw@gmail.com"
    },
    UpdateExpression: "SET #resource = list_append(if_not_exists(#resource, :emptList), :vals)",
    //不存在
    ExpressionAttributeValues: {
      ":emptList": [],
      ":vals": [body],
    },
    ExpressionAttributeNames: {
      "#resource": "resource"
    }
  })

  let status = 200
  if (res.$metadata.httpStatusCode != 200) {
    status = 400;
  }
  return new Response(JSON.stringify(res), {
    status,
    // headers: { 'Set-Cookie': `token=${token.value}` },
  })
}
export async function GET(request: NextRequest) {
  const res = await dynamo.query({
    TableName,
    KeyConditionExpression: "#email = :a",
    ProjectionExpression: "#resource",
    ExpressionAttributeNames: {
      "#email": 'email',
      "#resource": "resource"
    },
    ExpressionAttributeValues: {
      ":a": "jabin.haw@gmail.com"
    }
  })

  let status = 200
  if (res.$metadata.httpStatusCode != 200) {
    status = 400;
  }
  let responseData = null
  console.log(res)
  if (res.Items?.length === 1) {
    responseData = res.Items[0].resource
  }
  return new Response(JSON.stringify(responseData), {
    status,
    // headers: { 'Set-Cookie': `token=${token.value}` },
  })
}