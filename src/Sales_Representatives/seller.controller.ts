import { Body, Controller, Delete, Get, HttpException, HttpStatus, InternalServerErrorException, Param, ParseIntPipe, Post, Put, Session, UploadedFile, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from "@nestjs/common";
import { SellerService } from "./seller.service";
import { AuthGuard } from "./auth/auth.guard";
import { FileInterceptor } from "@nestjs/platform-express";
import { MulterError, diskStorage } from "multer";
import { SellerDTO, UpdatePasswordDTO, UpdateProfilePicDto, UpdateSellerDTO, addressDto } from "./seller.dto";
import { ProductDTO, UpdateDTO } from "./product.dto";
import { parse } from "path";
import { ProductEntity } from "./product.entity";
import { CustomerDTO, UpdateCustomerDTO } from "./customer/customer.dto";
import { CustomerEntity } from "./customer/customer.entity";
import { CartDTO } from "./cart.dto";
import { SessionGuard } from "./session.guard";
import * as bcrypt from 'bcrypt';
import { AddressEntity } from "./address.entity";
import session from "express-session";




@Controller('/seller')
export class SellerController {
    constructor(private readonly sellerService: SellerService) { }

    @UseGuards(AuthGuard)
    @Post('address')
    @UsePipes(new ValidationPipe())
    async createAddress(@Body() addressDto: addressDto, @Session() session): Promise<AddressEntity> {
        try{
            return await this.sellerService.createAddress(addressDto, session.username);
        } 
        catch{
            throw new InternalServerErrorException('Failed to create address');
        }
    }

    @UseGuards(AuthGuard)
    @Put('/update_profile')
    updateProfile(@Session() session, @Body() UpdateInfo:UpdateSellerDTO): object{
        try{
            return this.sellerService.updateProfile(session.username, UpdateInfo);
         }
         catch{
            throw new InternalServerErrorException("Failed to update profile");
         }

    }

    @UseGuards(AuthGuard)
    @Put('/update_profilePic')
    @UseInterceptors(FileInterceptor('profilePic',
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
    updatePic(@Session() session, @Body() UpdatePic:UpdateProfilePicDto, @UploadedFile() myfile: Express.Multer.File): object
    {
        UpdatePic.filename = myfile.filename;
        try{
           return this.sellerService.updatePic(session.username, UpdatePic);
        }
        catch{
            throw new InternalServerErrorException("Failed to update profile pic");
        }
    }

    @UseGuards(AuthGuard)
    @Put('/update_password')
    async updatePassword(@Session() session, @Body() UpdatePassword:UpdatePasswordDTO): Promise<object>{
        try{
            const salt = await bcrypt.genSalt();
            const hashedpassword = await bcrypt.hash(UpdatePassword.password, salt); 
            UpdatePassword.password= hashedpassword;
            return this.sellerService.updatePassword(session.username, UpdatePassword);
         }
         catch{
            throw new InternalServerErrorException("Failed to update password");
         }

    }

    @UseGuards(AuthGuard)
    @Get('/show_profile')
    showProfile(@Session() session): object
    {
        try{
           return this.sellerService.showProfile(session.username);
        }
        catch{
            throw new InternalServerErrorException("Failed to show profile");
        }
    }

    /*@UseGuards(AuthGuard)
    @Delete('/delete_profile')
    DeleteProfile(@Session() session):object
    {
       return this.sellerService.DeleteProfile(session.username);
    }*/

    @UseGuards(SessionGuard)
    @Post('addproduct')
    @UseInterceptors(FileInterceptor('productPic',
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
    addProduct(@Body() myobj: ProductDTO, @UploadedFile() myfile: Express.Multer.File): object {
        myobj.filename = myfile.filename;
        try{
            return this.sellerService.addProduct(myobj);
        }
        catch{
            throw new InternalServerErrorException("Failed to add product");
        }
    }

    @UseGuards(SessionGuard)
    @Put('/update_product/:id')
    @UseInterceptors(FileInterceptor('productPic',
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
    updateProduct(@Param('id',  ParseIntPipe) id:number, @Body() UpdateProduct:UpdateDTO,  @UploadedFile() myfile: Express.Multer.File): object
    {
        UpdateProduct.filename = myfile.filename;
        try{
          return this.sellerService.updateProduct(id,UpdateProduct);
        }
        catch{
            throw new InternalServerErrorException("Failed to update product");
        }
    }

    @UseGuards(SessionGuard)
    @Get('/show_all_product')
    showAllProduct(): object
    {
        try{
           return this.sellerService.showAllProduct();
        }
        catch{
            throw new InternalServerErrorException("Failed to show all product");
        }
    }

    @UseGuards(SessionGuard)
    @Get('/search_product_name/:name')
    searchProduct(@Param('name') name:string): object
    {
        try{
           return this.sellerService.searchProduct(name);
        }
        catch{
            throw new InternalServerErrorException("Failed to search");
        }
    }

    @UseGuards(SessionGuard)
    @Get('/search_product_category/:category')
    searchProductCategory(@Param('category') category:string): object
    {
        try{  
           return this.sellerService.searchProductCategory(category);
        }
        catch{
            throw new InternalServerErrorException("Failed to search");
        }
    }

    @UseGuards(SessionGuard)
    @Delete('/delete_product/:name')
    DeleteProduct(@Param('name') name:string):object
    {
        try{
            return this.sellerService.DeleteProduct(name);
        }
        catch{
            throw new InternalServerErrorException("Failed to delete");
        }
    }

    @UseGuards(SessionGuard)
    @Post('addcustomer')
    @UseInterceptors(FileInterceptor('profilePic',
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
    async addCustomer(@Body() myobj: CustomerDTO, @UploadedFile() myfile: Express.Multer.File): Promise<object> {
        try{
            const salt = await bcrypt.genSalt();
            const hashedpassword = await bcrypt.hash(myobj.password, salt); 
            myobj.password= hashedpassword;
            myobj.filename = myfile.filename;
            return this.sellerService.addCustomer(myobj);
        }
        catch{
            throw new InternalServerErrorException("Failed to add customer");
        }
    }

    @UseGuards(SessionGuard)
    @Put('/update_customer/:id')
    @UseInterceptors(FileInterceptor('profilePic',
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
    updateCustomer(@Param('id',  ParseIntPipe) id:number, @Body() UpdateCustomer:UpdateCustomerDTO, @UploadedFile() myfile: Express.Multer.File): object
    {
        UpdateCustomer.filename = myfile.filename;
        try{
           return this.sellerService.updateCustomer(id,UpdateCustomer);
        }
        catch{
            throw new InternalServerErrorException("Failed to update customer");
        }
    }

    @UseGuards(SessionGuard)
    @Get('/show_all_customer')
    showAllCustomer(): object
    {
        try{
           return this.sellerService.showAllCustomer();
        }
        catch{
            throw new InternalServerErrorException("Failed to show all customer");
        }
    }

    @UseGuards(SessionGuard)
    @Get('/search_customer_name/:name')
    searchCustomer(@Param('name') name:string): object
    {
        try{
           return this.sellerService.searchCustomer(name);
        }
        catch{
            throw new InternalServerErrorException("Failed to search");
        }
    }

    @UseGuards(SessionGuard)
    @Delete('/delete_customer/:username')
    DeleteCustomer(@Param('username') username:string):object
    {
        try{
            return this.sellerService.DeleteCustomer(username);
        }
        catch{
            throw new InternalServerErrorException("Failed to delete");
        }
    }

    @UseGuards(SessionGuard)
    @Post('/order')
    @UsePipes(new ValidationPipe)
    addCart(@Session() session, @Body() myobj: CartDTO): object {
        try{
          return this.sellerService.addCart(session.username, myobj);
        }
        catch{
            throw new InternalServerErrorException("Failed to order");
        }
    }

    /*@UseGuards(SessionGuard)
    @Get('/show_all_order')
    showAllOrder(@Session() session): object
    {
        try{
           return this.sellerService.showAllOrder(session.username);
        }
        catch{
            throw new InternalServerErrorException("Failed to show all customer");
        }
    }*/

    /*@Post('/confirm_order/:msg')
    order(@Param('msg') msg:string): object {
        try{
          return this.sellerService.order(msg);
        }
        catch{
            return {error: 'invalid'};
        }
    }*/

    /*@Post('order')
    @UsePipes(new ValidationPipe())
    async createOrder(@Body() cartDto: CartDTO): Promise<CartDTO> {
       const id=1
       return this.sellerService.createOrder(cartDto, id);
    }*/


}