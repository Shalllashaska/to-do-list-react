import {memo} from "react";

export const CategoryList = memo((props) => (
    <div>
        <h1>
            Список категорий
        </h1>
        <h2>
            Создание категорий
        </h2>
    </div>
));

CategoryList.displayName = 'CategoryList';