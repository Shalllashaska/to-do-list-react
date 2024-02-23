import {memo, useCallback, useState} from "react";
import {ItemTemplate} from "./_mainList/ItemTemplate";
import {MainListContext} from "./_mainList/MainListContext";
import {AddButton} from "./_mainList/AddButton";

const getPosts = () => [
    {
        id: 1,
        title: 'Title',
        categories: ['1 category', '2 category'],
        content: 'Content',
        status: 'successful',
    },
    {
        id: 2,
        title: 'Title',
        categories: ['1 category', '2 category'],
        content: 'Content',
        status: 'successful',
    },
    {
        id: 3,
        title: 'Title',
        categories: ['1 category', '2 category'],
        content: 'Content',
        status: 'warning',
    },
    {
        id: 4,
        title: 'Title',
        categories: ['1 category', '2 category'],
        content: 'Content',
        status: 'warning',
    },
    {
        id: 5,
        title: 'Title',
        categories: ['1 category', '2 category'],
        content: 'Content',
        status: 'danger',
    },
    {
        id: 6,
        title: 'Title',
        content: 'Content',
        status: 'danger',
    },
    {
        id: 7,
        title: 'Title',
        categories: ['1 category', '2 category'],
        content: 'Content',
    },
    {
        id: 8,
        title: 'Title',
        categories: ['1 category', '2 category'],
        content: 'Content',
    },
];


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
                        key={item.id}
                        id={item.id}
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
    const [items, setItems] = useState(() => getPosts());
    const [nextId, setNexId] = useState(items.length + 1);
    return (
        <div>
            <div className="font-light text-2xl mx-auto flex w-full">Main Page</div>
            <List
                items={items}
                onDeleteItem={useCallback((id) => {
                    const itemIndex = items.findIndex((item) => item.id === id);
                    if (itemIndex !== -1) {
                        items.splice(itemIndex, 1);
                        setItems([...items]);
                    }
                }, [items])}
                onChangeItem={useCallback((id) => {
                    console.log(`Changed item with id ${id}`);
                }, [])}
                onAddItem={useCallback(() => {
                    setItems([...items, {
                        id: nextId,
                        title: `Title ${nextId}`,
                        content: `Content ${nextId}`,
                        status: 'successful'
                    }]);
                    setNexId(nextId + 1);
                }, [items, nextId])}
            />
        </div>
    );
});

MainList.displayName = 'MainList';