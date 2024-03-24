import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ProcurementService } from '../procurement.services';
import { ProcurementDTO, LoginDTO } from '../DTO/procurement.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private procurementOfficerService: ProcurementService,
    private jwtService: JwtService
  ) {}

  async register(userData: ProcurementDTO): Promise<ProcurementDTO> {
    return await this.procurementOfficerService.addProcurementOfficer(userData);
  }

  async login(loginData: LoginDTO): Promise<{ access_token: string }> {
    const { email, password } = loginData;
    const user = await this.procurementOfficerService.findOneByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid email or password try again');
    }
    const payload = { email: user.email, id: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
