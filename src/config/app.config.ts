export default () => ({
  appSecret: process.env.APP_SECRET,
  dbUrl: process.env.DB_URL,
  dbName: process.env.DB_NAME,
  s3accessKeyId: process.env.S3ACCESSKEYID,
  s3secretAccessKey: process.env.S3SECRETACCESSKEY,
  s3bucket: process.env.S3BUCKET,
  s3region: process.env.S3REGION,
  link: process.env.LINK,
  nodemailerPort: process.env.nodePort,
  nodemailerUser: process.env.nodeUser,
  nodemailerPass: process.env.nodePass,
  nodemailerHost: process.env.nodeHost,
})