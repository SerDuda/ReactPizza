import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';

const FullPizza: React.FC = () => {
    // типизируем наш state.
    // если по дефолту передать {}, т.е. useState({...}), то undefined-а не будет и проверку ниже можно делать
    // но это не типизация а обычный JS.
    const [pizza, setPizza] = useState<{
        imageUrl: string,
        title: string,
        price: number
    }>()

    const { id } = useParams()

    const navigate = useNavigate()

    useEffect(() => {
        async function fetchPizza() {
            try {
                const { data } = await axios.get('https://6361980467d3b7a0a6c9ba26.mockapi.io/items/' + id)
                setPizza(data)
            }
            catch (error) {
                alert('Pizza could not be found')
                navigate('/')
            }
        }

        fetchPizza()
    }, [id])


    // pizza - до проверки {} | undefined

    // без проверки все ровно будет ругаться ts ибо fetch может выполниться не сразу, а через 2 сек или больше
    // и будет возвращаться {} | undefiend. поэтому делаем проверку, что после нее вернулся только {}.
    if (!pizza) {
        // ругалось, что FC возвращает либо elem | string. Вместо строки обернули в фрагмент
        return <>Loading...</>
    }

    // pizza - после проверки {}

    return (
        <div className='container'>
            <img src={pizza.imageUrl} alt="" />
            <h2>{pizza.title}</h2>
            <h4>{pizza.price} грн.</h4>
            <Link to={'/'}>
                <button className="button button--outline button--add">
                    <span>Назад</span>
                </button>
            </Link>
        </div>
    );
}

export default FullPizza;
