export interface CreateBookDto{
    isbn: string;
    title: string;
    yearLaunch: number;
    publisher: string;
    quantExemplares: number
    codCategory: number;
    codSubcategory: number;

    authorIds: number[];
    mainAuthorId: number;
}