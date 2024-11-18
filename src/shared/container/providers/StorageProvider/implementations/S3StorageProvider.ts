import fs from 'fs';
import path from 'path';
import aws, { S3 } from 'aws-sdk';
import mime from 'mime';
import uploadConfig from '../../../../../config/storage';
import { AWS_S3_BUCKET } from '../../../../../shared/utils/environment';
import AppError from '../../../../../shared/errors/AppError';
import IStorageProvider from '../models/IStorageProvider';
import { Express } from 'express';

class S3StorageProvider implements IStorageProvider {
  private client: S3;

  constructor() {
    this.client = new aws.S3({
      region: 'us-east-1',
    });
  }

  // Método original saveFile
  public async saveFile(file: string): Promise<string> {
    const originalPath = path.resolve(uploadConfig.tmpFolder, file);

    const fileContent = await fs.promises.readFile(originalPath);
    const fileType = mime.getType(originalPath);

    if (!fileType) {
      throw new AppError('File type not supported');
    }

    const bucketName = AWS_S3_BUCKET || 'leet-order-images';

    await this.client
      .putObject({
        Bucket: bucketName,
        Key: file,
        ContentType: fileType,
        Body: fileContent,
      })
      .promise();

    await fs.promises.unlink(originalPath);

    return `https://${bucketName}.s3.amazonaws.com/${file}`;
  }

  // Novo método savePDF
  public async savePDF(file: Express.Multer.File): Promise<string> {
    const { originalname, buffer } = file;
    const fileType = mime.getType(originalname);

    if (!fileType) {
      throw new AppError('File type not supported');
    }

    const uniqueFileName = `pdf-${Date.now()}-${originalname.replace(/\s+/g, '-')}`;
    const bucketName = AWS_S3_BUCKET || 'leet-order-files';

    await this.client
      .putObject({
        Bucket: bucketName,
        Key: uniqueFileName,
        ContentType: fileType,
        Body: buffer,
      })
      .promise();

    return `https://${bucketName}.s3.amazonaws.com/${uniqueFileName}`;
  }

  public async deleteFile(file: string): Promise<void> {
    await this.client
      .deleteObject({
        Bucket: AWS_S3_BUCKET || 'leet-order-images',
        Key: file,
      })
      .promise();
  }
}

export default S3StorageProvider;
