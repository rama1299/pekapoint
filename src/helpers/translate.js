import axios from "axios"
import * as d3 from 'd3'
import { FetchCsv } from "../modules/fetchCsv"
import { checkIpInfo } from "./checkIpInfo"
import { saveToSessionStorage, getFromSessionStorage } from "./sessionStorage"
import translateServer from './translateServer.json'

export class Translate {
    static async client(array) {
        try {
          let language = 'en'
          let geoInfo = await checkIpInfo()

          if (geoInfo) {
              language = geoInfo.language
          }

          if (language == 'en') {
            return array
          }

          let getDataCsvFromSession = await getFromSessionStorage('csvClient')

          if (!getDataCsvFromSession || getDataCsvFromSession == undefined) {
                
            const response = await FetchCsv.getCsvClient()
            const csvData = await response.data

            if (csvData == '') {
              return array
            }

            await saveToSessionStorage('csvClient', csvData)

            getDataCsvFromSession = csvData
          }
            
			    let csvParse = await d3.csvParse(getDataCsvFromSession)

          const findDataArray = Promise.all(array.map(async (name) => {
          const findDataCsv = csvParse.find((item) => item.en.toLowerCase() == name.toLowerCase());
              
          if (findDataCsv) {
            return findDataCsv[language];
          } else {
            return name;
          }
        }));

      return findDataArray
		} catch (error) {
			console.log(error)
      return array
		}
    }

  static async product(data, isProductSlug) {
    let dataTranslate

    try {
      let language = 'en'
      let geoInfo = await checkIpInfo()

      if (geoInfo) {
          language = geoInfo.language
      }

      if (language == 'en') {
        return data
      }

      let jsonTranslate = translateServer

      if (!jsonTranslate || jsonTranslate == undefined || jsonTranslate.length == 0) {
            
        const response = await FetchCsv.getCsvServer()
        const csvData = await response.data

        if (csvData == '') {
          return data
        }

        await saveToSessionStorage('csvServer', csvData)

        let csvParse = await d3.csvParse(csvData)

        jsonTranslate = csvParse
      }
        
        if (isProductSlug) {
          let summaryJson = JSON.parse(data.summary);
          let titleGroup = Object.keys(summaryJson)[0];
          let titleGroupTranslate = jsonTranslate.find((itemCsv) => itemCsv.en.toLowerCase() == titleGroup.toLowerCase())[language];
          let titleAttributeTranslate = await Promise.all(summaryJson[titleGroup].map(async (itemAttribute) => {
            let findCsv = jsonTranslate.find((itemCsv) => itemCsv.en.toLowerCase() === itemAttribute.title.toLowerCase());
            if (findCsv) {
              return {
                ...itemAttribute,
                title: findCsv[language],
                code: itemAttribute.title
              };
            }
            return {
              ...itemAttribute,
              code: itemAttribute.title
            };
          }));
          
          return {
            ...data,
            summary: JSON.stringify({ [titleGroupTranslate]: titleAttributeTranslate })
          };
        } else {
          dataTranslate = await Promise.all(data.map(async(item) => {
            let summaryJson = JSON.parse(item.summary);
            let titleGroup = Object.keys(summaryJson)[0];
            let titleGroupTranslate = jsonTranslate.find((itemCsv) => itemCsv.en.toLowerCase() == titleGroup.toLowerCase())[language];
            let titleAttributeTranslate = await Promise.all(summaryJson[titleGroup].map(async (itemAttribute) => {
              let findCsv = jsonTranslate.find((itemCsv) => itemCsv.en.toLowerCase() === itemAttribute.title.toLowerCase());
              if (findCsv) {
                return {
                  ...itemAttribute,
                  title: findCsv[language],
                  code: itemAttribute.title
                };
              }
              return {
                ...itemAttribute,
                code: itemAttribute.title
              };
            }));
            
            return {
              ...item,
              summary: JSON.stringify({ [titleGroupTranslate]: titleAttributeTranslate })
            };
          }))
          
          return dataTranslate
        }
      } catch (error) {
      console.log(error)
      return data
    }
  }

  static async productSpec(item) {
    try {
      let language = 'en'
      let geoInfo = await checkIpInfo()

      if (geoInfo) {
          language = geoInfo.language
      }

      if (language == 'en') {
        return item
      }

      let getDataCsvFromSession = await getFromSessionStorage('csvServer')

      if (!getDataCsvFromSession || getDataCsvFromSession == undefined) {
            
        const response = await FetchCsv.getCsvServer()
        const csvData = await response.data

        if (csvData == '') {
          return item
        }

        await saveToSessionStorage('csvServer', csvData)

        getDataCsvFromSession = csvData
      }
        
      let csvParse = await d3.csvParse(getDataCsvFromSession);

      let specJson = JSON.parse(item.datas);
      let specTranslate = await Promise.all(specJson.map(async (spec) => {
          let titleTranslate = csvParse.find((itemCsv) => itemCsv.en.toLowerCase() === spec.title.toLowerCase());
          let attributesTranslate = await Promise.all(spec.attributes.map(async (attribute) => {
              let findCsv = csvParse.find((itemCsv) => itemCsv.en.toLowerCase() === attribute.title.toLowerCase());
              if (findCsv) {
                  return {
                      ...attribute,
                      title: findCsv[language]
                  };
              }
              return {
                  ...attribute
              }
          }));
          if (titleTranslate) {
              return {
                  ...spec,
                  attributes: attributesTranslate,
                  title: titleTranslate[language]
              };
          }
          return {
              ...spec,
              attributes: attributesTranslate
          }
      }));
  
      return {
          ...item,
          datas: JSON.stringify(specTranslate)
      };
      } catch (error) {
      console.log(error)
      return item
    }
  }
  

  static async compareSpec(data) {
    try {
      let language = 'en'
      let geoInfo = await checkIpInfo()

      if (geoInfo) {
          language = geoInfo.language
      }

      if (language == 'en') {
        return data
      }

      let getDataCsvFromSession = await getFromSessionStorage('csvServer')

      if (!getDataCsvFromSession || getDataCsvFromSession == undefined) {
            
        const response = await FetchCsv.getCsvServer()
        const csvData = await response.data

        if (csvData == '') {
          return data
        }

        await saveToSessionStorage('csvServer', csvData)

        getDataCsvFromSession = csvData
      }
        
      let csvParse = await d3.csvParse(getDataCsvFromSession)

      let dataTranslate = await Promise.all(data.map(async (item) => {
        let specJson = JSON.parse(item.datas);
        let specTranslate = await Promise.all(specJson.map(async (spec) => {
          let titleTranslate = csvParse.find((itemCsv) => itemCsv.en.toLowerCase() === spec.title.toLowerCase());
          let attributesTranslate = await Promise.all(spec.attributes.map(async (attribute) => {
            let findCsv = csvParse.find((itemCsv) => itemCsv.en.toLowerCase() === attribute.title.toLowerCase());
            if (findCsv) {
              return {
                  ...attribute,
                  title: findCsv[language]
              };
            }
            return {
                ...attribute
            }
          }));
          if (titleTranslate) {
            return {
                ...spec,
                attributes: attributesTranslate,
                title: titleTranslate[language]
            };
        }
        return {
            ...spec,
            attributes: attributesTranslate
        }
        }));
        
        return {
          ...item,
          datas: JSON.stringify(specTranslate)
        };
      }))

      return dataTranslate
      
      } catch (error) {
      console.log(error)
      return data
    }
  }
}