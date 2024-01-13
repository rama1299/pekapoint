import { filter } from 'd3-array';
import fs from 'fs';

const fileName = 'dataLogin.txt';

export async function saveDataToFile(data) {
  try {
    // Check if the file exists
    if (!fs.existsSync(fileName)) {
      // If the file doesn't exist, create it with an empty array
      fs.writeFileSync(fileName, '[]', 'utf8');
    }

    // Read the file content
    const fileContent = fs.readFileSync(fileName, 'utf8');
    
    // Parse the existing data
    const existsData = JSON.parse(fileContent);

    const currentDate = new Date()
    const filterExpiredData = existsData.filter(data => new Date(data.expired) > currentDate)
    const findData = filterExpiredData.find(obj => obj.ip == data.ip && obj.UserAgent == data.UserAgent)

    if (!findData) {
      // Push the new data
      filterExpiredData.push(data);

      // Write the updated data back to the file
      fs.writeFileSync(fileName, JSON.stringify(filterExpiredData, null, 2), 'utf8');
      return true
    }

    return true;
  } catch (error) {
    console.error('Error while saving token to file:', error.message);
    return false;
  }
}
