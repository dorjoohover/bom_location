import { PutObjectCommand, PutObjectCommandInput, PutObjectCommandOutput, S3Client } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { Logger } from '@nestjs/common/services';
import appConfig from 'src/config/app.config';

@Injectable()
export class S3Service {
  private region: string;
  private logger = new Logger()
  private s3: S3Client;
  constructor() {
    this.region = appConfig().s3region;
    this.s3 = new S3Client({
      region: this.region,
      credentials: {
        accessKeyId: appConfig().s3accessKeyId,
        secretAccessKey: appConfig().s3secretAccessKey
      }
    })
  }

  async uploadFile(file: Express.Multer.File, key: string) {
    const bucket = appConfig().s3bucket
    const input: PutObjectCommandInput = {
      Body: file.buffer,
      Bucket: bucket,
      Key: key,
      ContentType: file.mimetype,
      ACL: 'public-read',
    }

    try {
      const res: PutObjectCommandOutput = await this.s3.send(new PutObjectCommand(input))
      if(res.$metadata.httpStatusCode === 200) {
        return `https://${bucket}.s3.${this.region}.amazonaws.com/${key}`
      }
      throw new Error('Image not saved to s3!')
    } catch(err) {
      this.logger.error('Connot save file inside s3', err)
      throw err
    }
  }
}