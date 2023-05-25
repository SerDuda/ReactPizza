export type SearchPizzaParams = {
    category: string; 
    sortBy: string; 
    order: string; 
    search: string; 
    currentPage: string;
}

export type Pizza = {
    id: string;
    title: string;
    price: number;
    picture: string;
    type: number;
    size: number;
    count: number;
}

export interface IPizzaSLiceState {
    items: Pizza[];
    status: Status;
}

// Грубо говоря это обьект, который имеет ключ и значение.
// мы можем юзать enum не в одном месте, и если нам нужно будет что-то исправить
// то не фиксить каждый файл, а достатоно будет фиксануть enum.
export enum Status {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error',
}