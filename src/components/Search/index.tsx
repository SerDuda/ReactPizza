import React from 'react';
import debounce from 'lodash.debounce';

import clear from '../../assets/img/clear_input.svg'
import styles from './Search.module.scss'

import { setSearchValue } from '../../redux/filter/slice';
import { useAppDispatch } from '../../redux/store';

export const Search = () => {
    const [value, setValue] = React.useState<string>('')
    const inputRef = React.useRef<HTMLInputElement>(null)
    const dispatch = useAppDispatch()

    const onClickClear = () => {
        dispatch(setSearchValue(''))
        setValue('')

        // 1-й вариант
        // if(inputRef.current){ 
        //     inputRef.current.focus()
        // }

        // 2-й вариант через опшнал ченинг. Второй короче.
        inputRef.current?.focus()
    }

    const updateSearchValue = React.useCallback(
        debounce((str: string) => {
            dispatch(setSearchValue(str))
        }, 750), []
    )

    const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value)
        updateSearchValue(event.target.value)
    }

    return (
        <div className={styles.root}>
            <svg className={styles.icon} height="18px" version="1.1" viewBox="0 0 18 18" width="18px" xmlns="http://www.w3.org/2000/svg"><title /><desc /><defs /><g fill="none" fillRule="evenodd" id="Page-1" stroke="none" strokeWidth="1"><g fill="#000000" id="Core" transform="translate(-339.000000, -381.000000)"><g id="search" transform="translate(339.000000, 381.000000)"><path d="M12.5,11 L11.7,11 L11.4,10.7 C12.4,9.6 13,8.1 13,6.5 C13,2.9 10.1,0 6.5,0 C2.9,0 0,2.9 0,6.5 C0,10.1 2.9,13 6.5,13 C8.1,13 9.6,12.4 10.7,11.4 L11,11.7 L11,12.5 L16,17.5 L17.5,16 L12.5,11 L12.5,11 Z M6.5,11 C4,11 2,9 2,6.5 C2,4 4,2 6.5,2 C9,2 11,4 11,6.5 C11,9 9,11 6.5,11 L6.5,11 Z" id="Shape" /></g></g></g></svg>
            <input 
            ref={inputRef}
            value={value}
            onChange={onChangeInput}
            className={styles.input}
            placeholder='Поиск пиццы...'
             />
            {value && <img onClick={onClickClear} src={clear} className={styles.clearIcon} alt={'Крестик'}/>}
        </div>
    );
};
