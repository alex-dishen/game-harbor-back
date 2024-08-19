import { AuthGuard } from '@nestjs/passport';
import { JwtName } from '../types/types';

export class JwtGuard extends AuthGuard(JwtName.JWT) {}
