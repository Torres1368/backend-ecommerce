import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { PrismaService } from 'src/prisma.service';

import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

@Module({
  imports: [
    MulterModule.registerAsync({
      useFactory: () => {
        cloudinary.config({
          cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
          api_key: process.env.CLOUDINARY_API_KEY,
          api_secret: process.env.CLOUDINARY_API_SECRET,
        });

        const storage = new CloudinaryStorage({
          cloudinary,
          params: async (req, file) => {
            const timestamp = Date.now();
            const originalName = file.originalname.split('.')[0];
            const ext = file.mimetype.split('/')[1];

            return {
              folder: 'ecommerce/products',        // aquí sí funciona
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
  controllers: [ProductsController],
  providers: [ProductsService, PrismaService],
})
export class ProductsModule {}
