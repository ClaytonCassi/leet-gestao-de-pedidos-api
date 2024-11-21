export default interface IStorageProvider {
  saveFile(file: string): Promise<string>;
  deleteFile(file: string): Promise<void>;
  savePDF?(file: Express.Multer.File): Promise<string>;
}
