export enum SortPropertyEnum {
    RAITING_DESC = 'rating',
    RAITING_ASC = '-rating',
    TITLE_DESC = 'title',
    TITLE_ASC = '-title',
    PRICE_DESC = 'price',
    PRICE_ASC = '-price'
}

export type Sort = {
    name: string;
    // мы указали, что значение не просто string, а определенные строчки.
    // sortProperty:  'title' | 'price' | 'rating' | '-rating' | '-title' | '-price'

    // сделали enum для sortProperty
    sortProperty: SortPropertyEnum
}

export interface IFilterSliceState {
    searchValue: string;
    categoryId: number;
    currentPage: number;
    sort: Sort;
}