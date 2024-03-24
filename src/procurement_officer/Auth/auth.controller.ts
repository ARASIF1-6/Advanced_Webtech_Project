import { Body, Controller, Post, UsePipes, UseInterceptors, UploadedFile, ValidationPipe, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ProcurementDTO, LoginDTO } from '../DTO/procurement.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterError, diskStorage } from 'multer';
import * as bcrypt from 'bcrypt';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @UseInterceptors(FileInterceptor('myfile',
    {
      fileFilter: (req, file, cb) => {
        if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/))
          cb(null, true);
        else {
          cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
        }
      },
      limits: { fileSize: 30000 },
      storage: diskStorage({
        destination: './upload',
        filename: function (req, file, cb) {
          cb(null, Date.now() + file.originalname)
        },
      })
    }
  ))
  @UsePipes(new ValidationPipe)
  async registerUser(@Body() myobj: ProcurementDTO, @UploadedFile() myfile: Express.Multer.File): Promise<ProcurementDTO> {
    const salt = await bcrypt.genSalt();
    const hashedpassword = await bcrypt.hash(myobj.password, salt); 
    myobj.password= hashedpassword;
    myobj.profilePicture = myfile.filename;
    return this.authService.register(myobj);
  }

  @Post('login')
  signIn(@Query() logindata: LoginDTO) {
    return this.authService.login(logindata);
  }
}
