"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EscuelajsModule = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const escuelajs_controller_1 = require("./escuelajs.controller");
const escuelajs_service_1 = require("./escuelajs.service");
let EscuelajsModule = class EscuelajsModule {
};
exports.EscuelajsModule = EscuelajsModule;
exports.EscuelajsModule = EscuelajsModule = __decorate([
    (0, common_1.Module)({
        imports: [axios_1.HttpModule],
        controllers: [escuelajs_controller_1.EscuelajsController],
        providers: [escuelajs_service_1.EscuelajsService],
    })
], EscuelajsModule);
//# sourceMappingURL=escuelajs.module.js.map