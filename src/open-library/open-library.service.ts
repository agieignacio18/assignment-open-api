import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class OpenLibraryService {
    private readonly baseUrl = 'https://openlibrary.org';

    async searchBooks(query: string): Promise<any> {
        try {
            const response = await axios.get(`${this.baseUrl}/search.json`, {
                params: { q: query },
            });
            return this.formatBooks(response.data);
        } catch (error) {
            throw new HttpException(
                'Failed to fetch data from Open Library API',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async getBookDetails(isbn: string): Promise<any> {
        try {
            const response = await axios.get(`${this.baseUrl}/api/books`, {
                params: { bibkeys: `ISBN:${isbn}`, format: 'json', jscmd: 'data' },
            });
            const bookData = response.data[`ISBN:${isbn}`];
            if (!bookData) {
                throw new HttpException('Book not found', HttpStatus.NOT_FOUND);
            }
            return {
                title: bookData.title,
                authors: bookData.authors?.map((author: any) => author.name) || [],
                publishYear: bookData.publish_date || 'N/A',
                cover: bookData.cover?.large || null,
            };
        } catch (error) {
            throw new HttpException(
                'Failed to fetch book details',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    private formatBooks(data: any): any {
        return data.docs.map((book: any) => ({
            title: book.title,
            author: book.author_name?.[0] || 'Unknown Author',
            publicationYear: book.first_publish_year || 'N/A',
        }));
    }
}
