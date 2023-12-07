import { DynamoDB } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocument } from "@aws-sdk/lib-dynamodb";
import { fs } from "fs";
import { jwtDecode } from "jwt-decode";

export const dynamo = DynamoDBDocument.from(
  new DynamoDB({
    region: "us-east-1",
    credentials: {
      accessKeyId: "AKIA2QPNRUV2GUUARF7Q",
      secretAccessKey: "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",
    },
  })
);
export const TableName = "YT-english-hub";

const invokeDbRunnerWithErrorHandler = async (dbRunner) => {
  try {
    return await dbRunner;
  } catch (e) {
    return e;
  }
};
/**
 *
 * @param {*} userInfo :{ email,username }
 */
const createUser = (userInfo) => {
  return dynamo.put({
    TableName,
    ConditionExpression: "attribute_not_exists(username)",
    Item: {
      username: userInfo.username,
      category: `user#${userInfo.username}`,
      email: userInfo.email,
      update_at: Date.now(),
      create_at: Date.now(),
    },
  });
};
const updateUserStudyPlan = (info) => {
  return dynamo.update({
    TableName,
    Key: {
      username: info.username,
      category: `user#${info.username}`,
    },
    ConditionExpression: "attribute_exists(username)",
    UpdateExpression:
      "SET plan_watch_time = :a,plan_master_new_word_count = :b",
    //不存在
    ExpressionAttributeValues: {
      ":a": info.plan_watch_time,
      ":b": info.plan_master_new_word_count,
    },
  });
};
// const ret = await invokeDbRunnerWithErrorHandler(
//   updateUserStudyPlan({
//     username: "andy",
//     plan_watch_time: 100,
//     plan_master_new_word_count: 20,
//   })
// );
// console.log(ret.message, ret.$metadata);
/**
 *
 * @param {*} videoInfo:{ username,id,title,thumbnail }
 * @returns
 */

const addToWatchList = (username, videoInfo) => {
  return dynamo.put({
    TableName,
    // UpdateExpression:
    //   "SET watchList = list_append(if_not_exists(watchList, :emptyList), :newWatchList),videoIdListInWatch = list_append(if_not_exists(videoIdListInWatch, :emptyList), :newVideoIdList)",
    ConditionExpression: "attribute_not_exists(username)",
    Item: {
      username: username,
      category: `video#${videoInfo.id}`,
      id: videoInfo.id,
      title: videoInfo.title,
      thumbnail: videoInfo.thumbnail,
      update_at: Date.now(),
      create_at: Date.now(),
    },
  });
};
const removeFromWatchList = (username, channelInfo) => {
  return dynamo.delete({
    TableName,
    Key: {
      username: username,
      category: `video#${channelInfo.id}`,
    },
  });
};
// const ret = await invokeDbRunnerWithErrorHandler(
//   addToWatchList("andy", {
//     title: "xxxx",
//     id: "id-name-1",
//     thumbnail: "https:////xxxxxx",
//   })
// );
// console.log(ret.message, ret.$metadata);
const addToChannelList = (username, channelInfo) => {
  return dynamo.put({
    TableName,
    ConditionExpression: "attribute_not_exists(username)",
    Item: {
      username: username,
      category: `channel#${channelInfo.id}`,

      id: channelInfo.id,
      title: channelInfo.title,
      thumbnail: channelInfo.thumbnail,
      update_at: Date.now(),
      create_at: Date.now(),
    },
  });
};
const removeFromChannelList = (username, channelInfo) => {
  return dynamo.delete({
    TableName,
    Key: {
      username: username,
      category: `channel#${channelInfo.id}`,
    },
  });
};
// const ret = await invokeDbRunnerWithErrorHandler(
//   removeFromChannelList("andy", {
//     title: "xxxx",
//     id: "id-name-2",
//     thumbnail: "https:////xxxxxx",
//   })
// );
// console.log(ret.message, ret.$metadata);
/**
 *
 * @param {*} wathInfo :{ username,video_id,watch_progress, }
 */
const updateVideoWatchProgress = (username, wathInfo) => {
  return dynamo.update({
    TableName,
    Key: {
      username: username,
      category: `video#${wathInfo.id}`,
    },
    ConditionExpression: "attribute_exists(username)",
    UpdateExpression: "SET watch_progress = :val,update_at = :update_at",
    //不存在
    ExpressionAttributeValues: {
      ":val": wathInfo.watch_progress,
      ":update_at": Date.now(),
    },
  });
};
// const ret = await invokeDbRunnerWithErrorHandler(
//   updateVideoWatchProgress("andy", {
//     title: "xxxx",
//     id: "id-name-1",
//     watch_progress: 14,
//   })
// );
// console.log(ret.message, ret.$metadata);

const insertToNotebook = (username, text) => {
  return dynamo.put({
    TableName,
    ConditionExpression: "attribute_not_exists(username)",
    Item: {
      username: username,
      category: `notebook#${text}`,
      text: text,
      update_at: Date.now(),
      create_at: Date.now(),
    },
  });
};
const removeFromNotebook = (username, text) => {
  return dynamo.delete({
    TableName,
    Key: {
      username: username,
      category: `notebook#${text}`,
    },
  });
};
//单词的掌握度。
const updateWordMastery = (username, text, mastery) => {
  return dynamo.update({
    TableName,
    Key: {
      username: username,
      category: `notebook#${wathInfo.id}`,
    },
    ConditionExpression: "attribute_exists(username)",
    UpdateExpression: "SET mastery = :val,update_at = :update_at",
    //不存在
    ExpressionAttributeValues: {
      ":val": mastery,
      ":update_at": Date.now(),
    },
  });
};

const updateWatchTime = (username, datestr, value) => {
  //。。。
  return dynamo.update({
    TableName,
    Key: {
      username: username,
      category: `watch_time#${datestr}`,
    },
    UpdateExpression: "ADD watch_time :val",
    ExpressionAttributeValues: {
      ":val": value,
    },
  });
};

const queryNotebook = (username) => {
  return dynamo.query({
    TableName,
    KeyConditionExpression: `username = :a AND begins_with(category,:b)`,
    ExpressionAttributeValues: {
      ":a": username,
      ":b": "notebook",
    },
  });
};
// const ret = await invokeDbRunnerWithErrorHandler(updateWatchTime("andy",'2012/13/16',6));
// console.log(ret.message, ret);



// console.log(jwtDecode('eyJraWQiOiJWd2FvOGhPN1V3XC9hdWtUd0FzNjVaNCtuaWR2NllLZzM5bVJDVmN4UXRSQT0iLCJhbGciOiJSUzI1NiJ9.eyJhdF9oYXNoIjoiNU9ncXNZUVZqMzBnRUswYUFYWDk3dyIsInN1YiI6ImI2N2NkNzVlLWY3NWEtNDUxYy1hYTJiLWRiZTllZGUyNWM1YSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV9Hb1VRU05IY3giLCJjb2duaXRvOnVzZXJuYW1lIjoiYW5keSIsImF1ZCI6IjdpZDg3Z2x0NHEzcGw2NWMyOWdocXUzZmYzIiwidG9rZW5fdXNlIjoiaWQiLCJhdXRoX3RpbWUiOjE3MDE4MjM2NzcsImV4cCI6MTcwMTkxMDA3NywiaWF0IjoxNzAxODIzNjc3LCJqdGkiOiIyZWFmYzg5My03OTE5LTQzOWQtYmIxMi1mZmI4ODc4ZjlmNDYiLCJlbWFpbCI6Ijk3NDA4ODU0NUBxcS5jb20ifQ.Ltob0rzi8diISb8li7Q1uNbsu3kG0Znennky3IfwfDY7S0glyiS8gJwJIDEd6kxwSR0yTBLX8KSRafx0wQCGMdBKXGFIaSJN0h3x1arm67RTWC4hwu5twyHqxDlcpXjkWRFKczNwyOhpdDLjjxW-l0EOijRnnYvObAURtm3dO76XpzsTtSetfPykr9uUt0Sse19LhUVrcXYdHOMFA1I8y7JlXMNNxArIlCIhvr9kJ3GOkUL5C4y7Uo6YF8Naz4dbyERbMVLkgoiF2iR7jNjjhjTIxAevV776zqu95OuKbR8hkGO0O0f7dklOgiZmPc_Vb1yKuzJtf1g8Mn8xfK21DA'))