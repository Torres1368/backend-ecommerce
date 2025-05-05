"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsModule = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const products_service_1 = require("./products.service");
const products_controller_1 = require("./products.controller");
const prisma_service_1 = require("../prisma.service");
const cloudinary_1 = require("cloudinary");
const multer_storage_cloudinary_1 = require("multer-storage-cloudinary");
let ProductsModule = class ProductsModule {
};
exports.ProductsModule = ProductsModule;
exports.ProductsModule = ProductsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            platform_express_1.MulterModule.registerAsync({
                useFactory: () => {
                    cloudinary_1.v2.config({
                        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
                        api_key: process.env.CLOUDINARY_API_KEY,
                        api_secret: process.env.CLOUDINARY_API_SECRET,
                    });
                    const storage = new multer_storage_cloudinary_1.CloudinaryStorage({
                        cloudinary: cloudinary_1.v2,
                        params: async (req, file) => {
                            const timestamp = Date.now();
                            const originalName = file.originalname.split('.')[0];
                            const ext = file.mimetype.split('/')[1];
                            return {
                                folder: 'ecommerce/products',
                                public_id: `${originalName}_${timestamp}`,
                                format: ext,
                            };
                        },
                    });
                    return {
                        storage,
                        fileFilter: (_req, file, cb) => {
                            if (!file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
                                return cb(new Error('Sólo JPG/PNG permitidos'), false);
                            }
                            cb(null, true);
                        },
                        limits: { fileSize: 5 * 1024 * 1024 },
                    };
                },
            }),
        ],
        controllers: [products_controller_1.ProductsController],
        providers: [products_service_1.ProductsService, prisma_service_1.PrismaService],
    })
], ProductsModule);
//# sourceMappingURL=products.module.js.map