import React from "react";
// библиотека хуков React-а.
// import { useWhyDidYouUpdate } from "ahooks";

// тип который хранит в себе обьект с двумя свойствами
type CategoriesProps = {
  categoryValue: number;
  // компонент Home должен подстраиваться под компонент Categories, а не наоборот.
  // типизируем, что это стрелачная фу-ия и у нее нету return (юзаем void)
  // название аргумента может быть каким либо, главное его типизация
  onClickCategory: (index: number) => void;

  // так же можно сделать нашу ву-ия опциональной, а не обязательной с помощью опшнал ченинг.
  // onClickCategory?: (index: number) => void;
}


const catigories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']

// т.е. FC хронит в себе пропсы данного типа
// оборачиваю в memo, даже если пропсы не меняются, запрещаем перерисовываться компоненту.
export const Categories: React.FC<CategoriesProps> = React.memo(({categoryValue, onClickCategory}) => {

  // юзаем этот хук. чтобы понять, где была перерисока. принимает в себя нужный компонент и пропсы
  // useWhyDidYouUpdate('Catigories', {categoryValue, onClickCategory})

  return (
    <div className="categories">
      <ul>
        {catigories.map((value, i) => (
          <li
            key={i}
            onClick={() => onClickCategory(i)}
            className={categoryValue === i ? 'active' : ''}>
            {value}
          </li>
        ))}
      </ul>
    </div>
  );
});
