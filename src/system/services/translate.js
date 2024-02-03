import fs from 'fs/promises';
import {parse} from 'csv-parse';

export class Translate {
    static async server(data, language) {
        try {
            const csvFilePath = 'src/csv/server.csv';
            const fileContent = await fs.readFile(csvFilePath, 'utf-8');
        
            // Use csv-parse with columns: true option
            const parsedData = await new Promise((resolve, reject) => {
              parse(fileContent, { columns: true }, (err, records) => {
                if (err) reject(err);
                resolve(records);
              });
            });
            
            if (parsedData.length == 0) {
                return data
            }
            
            const translateData = await Promise.all(data.map(async (item) => {
              let summaryJson = JSON.parse(item.summary)
              let titleGroupTranslate = parsedData.find((csv) => csv.en.toLowerCase() == Object.keys(summaryJson)[0].toLowerCase())[language]
              let attributeTranslate = await Promise.all(summaryJson.Performance.map(async (obj) => {
                  let findCsv = parsedData.find((csv) => csv.en.toLowerCase() == obj.title.toLowerCase())
                  if(findCsv) {
                    return {
                      ...obj,
                      title: findCsv[language],
                      code: obj.title
                    }
                  } else {
                    return {
                      ...obj,
                      code: obj.title
                    }
                  }
              }))
              return {
                  ...item,
                  summary: JSON.stringify({[titleGroupTranslate]: attributeTranslate})
              }
          }))

          return translateData
          } catch (error) {
            console.error(error.message);
            return data
          }
    }

    static async attributeGroup(name, language) {
        try {
            const csvFilePath = 'src/csv/attribute_groups.csv';
        
            const fileContent = await fs.readFile(csvFilePath, 'utf-8');
        
            // Use csv-parse with columns: true option
            const parsedData = await new Promise((resolve, reject) => {
              parse(fileContent, { columns: true }, (err, records) => {
                if (err) reject(err);
                resolve(records);
              });
            });
            
            if (parsedData.length == 0) {
                return name
            }

            const findDataName = parsedData.find((item) => item.en == name)
            
            if (!findDataName || findDataName == undefined) {
                return name
            }
            
            return findDataName[language]
          } catch (error) {
            console.error(error.message);
            return name
          }
    }
}