import React, { useRef } from 'react';
import axios from 'axios';
import qs from 'qs'
import { useNavigate } from 'react-router-dom';

import {Categories, Sort, PizzaBlock, Skeleton, Pagination} from "../components";

import { useSelector } from 'react-redux'
import { useAppDispatch } from '../redux/store';

import { selectorFilter, setCategoryId, setCurrentPage, setFilters } from '../redux/filter/slice'
import { fetchPizzas } from '../redux/pizza/asyncActions';
import { SearchPizzaParams } from '../redux/pizza/types'
import { RootState } from '../redux/store';


const Home: React.FC = () => {
    const { sort, currentPage, categoryId, searchValue } = useSelector(selectorFilter)
    const { items, status } = useSelector((state: RootState) => state.pizza)

    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const isSearch = useRef(false)
    const isMounted = useRef(false)

    // сделали useCallback, чтобы наш компонент Categories не перерисовывался при изминении на Homepage-е
    // функция не будет вызываться без нужды
    const onClickCategory = React.useCallback((id: number) => {
        dispatch(setCategoryId(id))
    }, [])

    // и в компоненте куда мы опракидываем эту фу-ию, у аргумента типа тоже указываем number,
    // т.е. происходит согласованость и все корректно работает.
    const onChangePage = (page: number) => {
        dispatch(setCurrentPage(page))
    }

    const getPizzas = async () => {
        const category = categoryId > 0 ? `category=${categoryId}` : '';
        const sortBy = sort.sortProperty.replace('-', '')
        const order = sort.sortProperty.includes('-') ? 'asc' : 'desc'
        const search = searchValue ? `&search=${searchValue}` : '';

        dispatch(
            fetchPizzas({
                category,
                sortBy,
                order,
                search,
                // преобразовали в строку
                currentPage: String(currentPage)
            }))


        window.scrollTo(0, 0)
    }

    // React.useEffect(() => {
    //     if (isMounted.current) {
    //         const queryString = qs.stringify({
    //             sortProperty: sort.sortProperty,
    //             categoryId,
    //             currentPage
    //         })
    //         navigate(`?${queryString}`)
    //     }
    //     isMounted.current = true

    //     if (window.location.search) {
    //         // заствляем не известный обьект быть SearchPizzaParams
    //         dispatch(fetchPizzas({} as SearchPizzaParams))
    //     }
    // }, [categoryId, sort.sortProperty, currentPage, searchValue])

    React.useEffect(() => {
        // window.scrollTo(0, 0)

        // if (!isSearch.current) {
        //     getPizzas()
        // }

        // isSearch.current = false

        getPizzas()

    }, [categoryId, sort.sortProperty, searchValue, currentPage])

    // React.useEffect(() => {
    //     if (window.location.search) {
    //         // search может быть, а может не быть.
    //         // мы говорим window.location.search.substring(1) - это неизвестно что.
    //         // и это неизвестно что переделываем под IFilterSliceState
    //         const params = (qs.parse(window.location.search.substring(1)) as unknown) as SearchPizzaParams
    //         const sortOfList = list.find((obj) => obj.sortProperty === params.sortBy)

    //         dispatch(setFilters({
    //             // из url ьы парсим свойства в виде, к примеру, params.search, но в redux передадим
    //             // их в виде searchValue
    //             searchValue: params.search, 
    //             categoryId: Number(params.category),
    //             currentPage: Number(params.currentPage),
    //             // если не найдешь sortofList, то верни первое значение из list.
    //             sort: sortOfList || list[0]
    //         }))
    //     }
    //     isSearch.current = true;
    // }, [])

    const skeleton = [...new Array(6)].map((_, index) => <Skeleton key={index} />)
    const pizzasItems = items.map((obj: any) =>
        <PizzaBlock
            title={obj.title}
            price={obj.price}
            picture={obj.imageUrl}
            sizes={obj.sizes}
            types={obj.types}
            id={obj.id}
            key={obj.id}
        />);


    return (
        <div className='container'>
            <div className="content__top">
                <Categories categoryValue={categoryId} onClickCategory={onClickCategory} />
                <Sort value={sort} />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            {status === 'error' ? (
                <div className='content__error-info'>
                    <h2>Произошла ошибка</h2>
                    <div>К сожалению, не удалось получить пиццы</div>
                </div>
            ) : (
                <div className="content__items">
                    {status === 'loading' ? skeleton : pizzasItems}
                </div>
            )}
            <Pagination currentPage={currentPage} onChangePage={onChangePage} />
        </div>
    );
}

export default Home;
