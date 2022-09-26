import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { configDBService } from './config/config.db.service';
import { UsersModule } from './users/users.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { ResultsModule } from './results/results.module';
import { InvoicesModule } from './invoices/invoices.module';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { ConfigModule } from '@nestjs/config';
import Configs from './config/index';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { RolesGuard } from './auth/guards/roles.guard';
import { HttpExceptionFilter } from './core/filters/http-exception.filter';

@Module({
  imports: [
    TypeOrmModule.forRoot(configDBService.getTypeOrmConfig()),
    ConfigModule.forRoot({ load: Configs, isGlobal: true }),
    AuthModule,
    UsersModule,
    AppointmentsModule,
    ResultsModule,
    InvoicesModule,
    ProductsModule,
    CategoriesModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_GUARD, useClass: RolesGuard },
    { provide: APP_FILTER, useClass: HttpExceptionFilter },
  ],
})
export class AppModule {}
