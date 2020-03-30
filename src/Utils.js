export const sort = (arr, selector, numberOfDataPoints, countryNameArray, dataArray) => {
    arr.sort((a, b) => b[1] - a[1]);
    let length = arr.length;
    arr.splice(numberOfDataPoints, length);
    for (selector in arr) {
        countryNameArray.push(arr[selector][0]);
        dataArray.push(arr[selector][1]);
    }
 };
