"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConfig = getConfig;
exports.updateConfig = updateConfig;
const data_1 = require("../mocks/data");
function getConfig() {
    return data_1.configPizzaria;
}
function updateConfig(data) {
    Object.assign(data_1.configPizzaria, data);
    return data_1.configPizzaria;
}
