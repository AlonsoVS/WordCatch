// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

/* const readLineByLine = () => {

    const readline = require("readline");
    const fs = require("fs");
    const fileName = "wordTest.txt";
    const secondFileName = "large_test.txt";

    const reader = readline.createInterface({
          input: fs.createReadStream(secondFileName)
    });

    reader.on("line", line => {
      
    });

    reader.on("end", data => {
      console.log(data);
    })
} */

const getFromFile = (filePath:string) => {
  var file = require('fs');
  const FILE_NAME = "wordTest.txt";
  file.readFile(FILE_NAME, 'utf-8', (error, data) => {
    if (error) console.log(error);
    else data;
  })
}

const formatData = (dat) => {
  const resp = dat.split('\n');
  let letter = '';
  let words = {};
  resp.forEach(word => {
    if (word !== '') {
      if (word.length === 1) {
        letter = word;
        words = {...words, [letter]: []}
      } else {
        words[letter].push(word);
      } 
    }
  })
  return words;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  var file = require('fs');
  const FILE_NAME = "wordTest.txt";
  const secondFileName = "large_test.txt";
  const thirdFileName = 'test_n.txt';
  file.readFile(secondFileName, 'utf-8', (error, data) => {
    if (error) res.status(200).json(error);
    else {
      res.status(200).json(formatData(data));
    }
  })
}
