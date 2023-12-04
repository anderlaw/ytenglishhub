import { exec } from 'child_process'
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
export const runCommand = (command: string) => {
    return new Promise((res, rej) => {
        exec(
            command,
            {
                maxBuffer: 1024 * 1024 * 1024,
            },
            function (err, stdout, stderr) {
                if (err) {
                    console.log(`error1 inside runCommand`, err)
                    rej(err);
                } else {
                    if (stderr.length > 0) {
                        console.log(`error2 inside runCommand`, stderr.toString())
                        // rej(stderr.toString());
                    }
                    if (stdout) {
                        res(stdout);
                    }
                }
            }
        );
    })


}

