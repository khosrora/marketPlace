var min = 10000;
var max = 99999;
var num = Math.floor(Math.random() * (max - min + 1)) + min;
exports.createId = () => {
    return num;
}