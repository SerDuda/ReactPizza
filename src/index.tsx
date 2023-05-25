import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from "react-router-dom";

import { store } from './redux/store';
import { Provider } from 'react-redux';

// делаем проверку, существует ли на нашей страницы элемент root.
// если существует, то засунь туда наше приложение.
// делаем так ибо ts не знает что вернется либо елемент либо null.
const rootElem = document.getElementById('root')
if (rootElem) {
    const root = ReactDOM.createRoot(rootElem);
    root.render(
        <Provider store={store}>
            <BrowserRouter>
                < App />
            </BrowserRouter>
        </Provider>
    );
}
