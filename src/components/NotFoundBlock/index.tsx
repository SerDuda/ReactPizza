import React from 'react';

import style from './NotFoundBlock.module.scss'

export const NotFoundBlock: React.FC = () => (
    <h1 className={style.root}>
        <span>😥</span>
        <br />
        Ничего не найдено
    </h1>
);
