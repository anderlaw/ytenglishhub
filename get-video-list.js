const { DynamoDB, QueryCommand } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocument } = require("@aws-sdk/lib-dynamodb");
const dynamo = DynamoDBDocument.from(
  new DynamoDB({
    region: "us-east-1",
    credentials: {
      accessKeyId: "AKIA2QPNRUV2DHEANMNZ",
      secretAccessKey: "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",
    },
  })
);
/**
 * 插入数据
 */
//  dynamo.query({
//   TableName:'video-table',
//   KeyConditionExpression:`record_type = :a`,
//   FilterExpression:"label = :b",
//   // ScanIndexForward:true,
//   ExpressionAttributeValues:{
//     ":a":"category",
//     ":b":"Tech"
//   }
// }).then(res => {
//   console.log(res);
// }).catch(err => {
//   console.log('---->',err);
// });

// dynamo
//   .query({
//     TableName: "video-record",
//     KeyConditionExpression: "video_id = :a",
//     ExpressionAttributeValues: {
//       ":a": "xxxxx",
//     },
//     ScanIndexForward:true,
//     //因为name是保留字，因此需要借助ExpressionAttributeNames来完成
//     ExpressionAttributeNames: {
//       "#name": "name",
//     },
//   })
//   .then((res) => {
//     console.log(res);
//   });

// 取出最近的5条数据
//  dynamo.scan({
//     TableName:"video-category",
//     Limit:5,
//  })
//  dynamo.query({
//     TableName:"video-category",
//     // Limit:4,
//     // KeyConditionExpression: "STRING_VALUE",
// }).then(res => {
//     console.log(res);
// });
// 取出某个key为特定值的数据并分页

// dynamo.query({
//     TableName:"video-category",
//     Limit:4,
//     // KeyConditionExpression: "STRING_VALUE",
// }).then(res => {
//     console.log(res);
// });

///get: /video-detail/category 根据分类查询视频，分页功能
// dynamo.query({
//   TableName: "video-table",
//   KeyConditionExpression: `record_type = :a`,
//   FilterExpression:"contains (category_labels, :label)",
//   //false降序排列，true生序
//   ScanIndexForward: false,
//   Limit: 20,
//   ExpressionAttributeValues: {
//     ":a": "video",
//     ":label":"bad"
//   },
// }).then(res => {
//   console.log(res);
// });

// post: 单词本。
