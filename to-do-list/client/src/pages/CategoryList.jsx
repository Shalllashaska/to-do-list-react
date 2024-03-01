import { memo, useState } from "react";
import { ItemTemplate } from "./_categoryList/ItemTemplate";

const getCategories = () => [
    { _id: 1, parentId: 'root', title: 'Дома' },
    { _id: 2, parentId: 1, title: 'Дома1' },
    { _id: 3, parentId: 1, title: 'Домf2' },
    { _id: 4, parentId: 2, title: 'Дома3' },
    { _id: 5, parentId: 'root', title: 'Дома4' },
    { _id: 6, parentId: 7, title: 'Дома5' },
    { _id: 7, parentId: 'root', title: 'Дома6' },
    { _id: 8, parentId: 6, title: 'Дома7' },
];

const itemsToTreeView = (items) => {

}

const List = memo(({ items, ...props }) => {
    
    
    
    if (items === undefined) {
        throw Error('Categories is not defined');
    }
    if (!items.length) {
        return (<div>Список категорий пуст</div>);
    }
    return (
        <div>
            {items.map((item) => (
                <ItemTemplate
                    key={item._id}
                    title={item.title}
                />
            ))}
        </div>
    )
})

export const CategoryList = memo((props) => {
    const [items, setItems] = useState(() => getCategories());
    
    return (
        <List
            items={items}
        />
    );
});

CategoryList.displayName = 'CategoryList';