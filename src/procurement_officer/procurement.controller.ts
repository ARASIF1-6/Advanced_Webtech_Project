import { Body, Controller, Get, Param, Patch, Post, Query, UploadedFile, UseInterceptors, UsePipes, ValidationPipe, HttpException, HttpStatus } from "@nestjs/common";
import { ProcurementService } from "./procurement.services";
import { ProcurementDTO } from "./DTO/procurement.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { MulterError, diskStorage } from "multer";

@Controller('procurement')
export class ProcurementController {
  constructor(private readonly procurementService: ProcurementService) {}

  @Get('viewprofile')
  async getProfile() {
    try {
      return await this.procurementService.viewProfile();
    } catch (error) {
      throw new HttpException('Error fetching profile', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Patch('updateprofile')
  @UseInterceptors(FileInterceptor('myfile', {
    fileFilter: (req, file, cb) => {
      if (file.originalname.match(/^.\*\\.(jpg|webp|png|jpeg)$/)) cb(null, true);
      else {
        cb(new MulterError('LIMIT\_UNEXPECTED\_FILE', 'image'), false);
      }
    },
    limits: { fileSize: 30000 },
    storage: diskStorage({
      destination: './uploads',
      filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
      },
    })
  }))
  @UsePipes(new ValidationPipe)
  async addUser(@Body() updatedInfo: ProcurementDTO, @UploadedFile() myfile: Express.Multer.File): Promise<ProcurementDTO> {
    try {
      updatedInfo.profilePicture = myfile.filename;
      return await this.procurementService.updateUser(updatedInfo);
    } catch (error) {
      throw new HttpException('Error updating profile', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}