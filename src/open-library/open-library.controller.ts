import { Controller, Get, Query } from '@nestjs/common';
import { OpenLibraryService } from './open-library.service';

@Controller('books')
export class OpenLibraryController {
    constructor(private readonly openLibraryService: OpenLibraryService) { }

    @Get('search')
    async searchBooks(@Query('q') query: string) {
        if (!query) {
            return { error: 'Query parameter (q) is required' };
        }
        return this.openLibraryService.searchBooks(query);
    }

    @Get('details')
    async getBookDetails(@Query('isbn') isbn: string) {
        if (!isbn) {
            return { error: 'ISBN parameter is required' };
        }
        return this.openLibraryService.getBookDetails(isbn);
    }

    @Get('featured')
    async getFeaturedBooks() {
        return this.openLibraryService.getFeaturedBooks();
    }
}
