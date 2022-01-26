"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
require("dotenv/config");
var express_1 = __importDefault(require("express"));
var controllers_1 = require("./controllers");
var app = (0, express_1["default"])();
var port = 5000;
app.use("/tests", controllers_1.testRouter["default"]);
app.use("/posts", controllers_1.postRouter["default"]);
app.listen(process.env.PORT, function () {
    console.log("http://localhost:".concat(process.env.PORT));
});
//# sourceMappingURL=index.js.map