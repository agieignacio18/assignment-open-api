import { Module } from '@nestjs/common';
import { OpenLibraryService } from './open-library/open-library.service';
import { OpenLibraryController } from './open-library/open-library.controller';

@Module({
  imports: [],
  controllers: [OpenLibraryController],
  providers: [OpenLibraryService],
})
export class AppModule { }
