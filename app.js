const tinify = require("tinify");
tinify.key = "mLb81pL4dmfb5gjLBMSjqkRcQr0FNYl7";
const fs = require("fs");
const appDataPath = "./";
let allowType = ["png", "jpg", "jpeg"];
function filterImage(arr) {
    return arr.filter((d, i) => {
        let itemType = d.split(".");
        itemType = itemType[itemType.length - 1]
        return allowType.indexOf(itemType) != -1
    })
}

let photoCompression = (path) => {
    fs.readdir(appDataPath + path, "utf-8", function (err, data) {
        if (err) {
            return console.log(err)
        } else {
            // 过滤非图片
            let imagesNameArr = filterImage(data);
            let startTime = new Date().getTime();
            let fileCount=0;
            imagesNameArr.forEach((d, i) => {
                startTime = new Date().getTime();
                let imagePath = appDataPath + path + "/" + d;
                fs.readFile(imagePath, function (fileErr, fileData) {
                    tinify.fromBuffer(fileData).toBuffer(function (tinifyErr, resultData) {
                        if (tinifyErr) return console.log(tinifyErr);
                        fs.writeFile(appDataPath + "/minImages/" + d, resultData, "binary", function (e, bookData) {
                            let endTime = new Date().getTime();
                            fileCount++;
                            console.log(d + "压缩完成 耗时 " + (endTime - startTime) + "ms"+" >>> "+(fileCount)+"/"+imagesNameArr.length)
                        })
                    });
                })
            })
        }
    })
}
photoCompression("/images")


