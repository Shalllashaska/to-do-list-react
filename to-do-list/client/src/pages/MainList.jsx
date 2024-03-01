import { memo, useCallback, useEffect, useState } from "react";
import { ItemTemplate } from "./_mainList/ItemTemplate";
import { MainListContext } from "./_mainList/MainListContext";
import { AddButton } from "./_mainList/AddButton";
import * as service from "../service";
import { useLoaderData } from "react-router-dom";


const List = memo(({ items, onDeleteItem, onChangeItem, onAddItem }) => {
    if (items === undefined) {
        throw Error('Items for list is undefined');
    }
    return (
        <MainListContext.Provider value={{
            onDeleteItem,
            onChangeItem,
            onAddItem,
        }}>
            <div>
                {items.length > 0 && (
                    <AddButton />
                )}
                {items.map((item) => (
                    <ItemTemplate
                        key={item._id}
                        id={item._id}
                        title={item.title}
                        categories={item.categories}
                        content={item.content}
                        status={item.status}
                    />
                ))}
                {!items.length && (
                    <>
                        <div className="font-bold text-lg tw-w-full mx-auto">Список пуст добавть новые посты!</div>
                        <AddButton />
                    </>
                )}
            </div>
        </MainListContext.Provider>
    );
});

export const MainList = memo((props) => {
    const posts = useLoaderData();
    const [items, setItems] = useState(posts);

    const reloadList = useCallback(() => service.loadPosts().then((posts) => setItems(posts)), []);

    useEffect(() => {
        reloadList();
    }, [])
    return (
        <List
            items={items}
            onDeleteItem={useCallback((id) => {
                service.deletePost(id).then(() => reloadList());
            }, [items])}
            onAddItem={useCallback(() => {
                // Открываем страницу поста
            }, [items])}
        />
    );
});

MainList.displayName = 'MainList';

export const mainListLoader = async ({ request, params }) => await service.loadPosts();