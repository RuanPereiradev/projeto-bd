export interface UpdateBookDto{
    isbn: string;
    title?: string;
    yearLaunch?: number;
    publisher?: string;
    // quantExemplares?: number;
    codCategory?: number;
    codSubCategory?: number;
}