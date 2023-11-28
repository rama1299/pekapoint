
export function transformData(data) {
    let dataClean = initialDataClean(data)
    let titleArray = generateTitleArray(dataClean)
    let scoreArray = generateScoreArray(dataClean)
    let valueArray = generateValueArray(dataClean)

console.log(data,titleArray,scoreArray,valueArray)
}

function initialDataClean(data) {
    let transformData =  data.replace(/[{}]/g, ',');
    return transformData.replace(/"/g, '');
}

function generateTitleArray(data) {
    return data.match(/[^,]+(?=:)/g);
}

function generateScoreArray(data) {
    let scoreArray = data.match(/:(.*?)(?=\||$)/g);
    return scoreArray.map(value => value.slice(1).trim());
}

function generateValueArray(data) {
    let transformArray = data.match(/\|(.*?)(?=\|)/g);
    let removeSymbolArray = transformArray.map(value => value.slice(1).trim());
    let filterNull = removeSymbolArray.filter(value => value !== '');
    let removeFirstTagHtml = filterNull.map(value => value.replace(/<.*?>/, '').trim())
    let removeEndTagHtml = removeFirstTagHtml.map(value => value.replace(/<.*?>/, '').trim())
    return removeEndTagHtml.filter((value, index) => index % 2 == 0);
}