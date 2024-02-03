import axios from "axios"
import * as d3 from 'd3'
import Cookies from "js-cookie"
import { checkIpInfo } from "./checkIpInfo"
import { saveToSessionStorage, getFromSessionStorage } from "./sessionStorage"

export class Translate {
    static async client(array, routeSlug) {
      const path = routeSlug ? `../src/csv/client.csv` : `src/csv/client.csv`
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
                
            const response = await axios.get(path)
            const csvData = await response.data

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

  static async product(item, routeSlug) {
    const path = routeSlug ? `../src/csv/server.csv` : `src/csv/server.csv`
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
            
        const response = await axios.get(path)
        const csvData = await response.data

        await saveToSessionStorage('csvServer', csvData)

        getDataCsvFromSession = csvData
      }
        
      let csvParse = await d3.csvParse(getDataCsvFromSession)
      
        let summaryJson = JSON.parse(item.summary);
        let titleGroup = Object.keys(summaryJson)[0];
        let titleGroupTranslate = csvParse.find((itemCsv) => itemCsv.en.toLowerCase() == titleGroup.toLowerCase())[language];
        let titleAttributeTranslate = await Promise.all(summaryJson[titleGroup].map(async (itemAttribute) => {
          let findCsv = csvParse.find((itemCsv) => itemCsv.en.toLowerCase() === itemAttribute.title.toLowerCase());
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
          }; // Return original itemAttribute if not found in csvParse
        }));
        
        return {
          ...item,
          summary: JSON.stringify({ [titleGroupTranslate]: titleAttributeTranslate })
        };
        
        
      } catch (error) {
      console.log(error)
      return item
    }
  }

  static async productSpec(item, routeSlug) {
    const path = routeSlug ? `../src/csv/server.csv` : `src/csv/server.csv`
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
            
        const response = await axios.get(path)
        const csvData = await response.data

        await saveToSessionStorage('csvServer', csvData)

        getDataCsvFromSession = csvData
      }
        
      let csvParse = await d3.csvParse(getDataCsvFromSession)

      let specJson = JSON.parse(item.datas);
      let specTranslate = await Promise.all(specJson.map(async (spec) => {
        let titleTranslate = csvParse.find((itemCsv) => itemCsv.en.toLowerCase() === spec.title.toLowerCase())[language];
        let attributesTranslate = await Promise.all(spec.attributes.map(async (attribute) => {
          let findCsv = csvParse.find((itemCsv) => itemCsv.en.toLowerCase() === attribute.title.toLowerCase());
          return {
            ...attribute,
            title: findCsv[language]
          };
        }));
        return {
          ...spec,
          attributes: attributesTranslate,
          title: titleTranslate
        };
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
  

  static async compareSpec(data, routeSlug) {
    const path = routeSlug ? `../src/csv/server.csv` : `src/csv/server.csv`
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
            
        const response = await axios.get(path)
        const csvData = await response.data

        await saveToSessionStorage('csvServer', csvData)

        getDataCsvFromSession = csvData
      }
        
      let csvParse = await d3.csvParse(getDataCsvFromSession)

      let dataTranslate = await Promise.all(data.map(async (item) => {
        let specJson = JSON.parse(item.datas);
        let specTranslate = await Promise.all(specJson.map(async (spec) => {
          let titleTranslate = csvParse.find((itemCsv) => itemCsv.en.toLowerCase() === spec.title.toLowerCase())[language];
          let attributesTranslate = await Promise.all(spec.attributes.map(async (attribute) => {
            let findCsv = csvParse.find((itemCsv) => itemCsv.en.toLowerCase() === attribute.title.toLowerCase());
            return {
              ...attribute,
              title: findCsv[language]
            };
          }));
          return {
            ...spec,
            attributes: attributesTranslate,
            title: titleTranslate
          };
        }));
        
        return {
          ...item,
          datas: JSON.stringify(specTranslate)
        };
      }))

      return dataTranslate
      
      } catch (error) {
      console.log(error)
      return item
    }
  }
}