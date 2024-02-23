import {memo, useCallback, useContext, useMemo} from "react";
import classNames from "classnames";

import './_itemTemplate.css';
import {MainListContext} from "./MainListContext";

const getStatusBackgroundColor = (status) => {
    switch (status) {
        case 'successful':
            return 'bg-green-300';
        case 'warning':
            return 'bg-yellow-300';
        case 'danger':
            return 'bg-red-300';
        default:
            return 'bg-zinc-300';
    }
}

export const ItemTemplate = memo(({ categories, id, ...props}) => {
    const { onDeleteItem, onChangeItem } = useContext(MainListContext);
    const categoriesTitle = useMemo(() => {
        if (!categories?.length) {
                return 'No categories'
        }
        return categories.join(' ');
    }, [categories]);
    return (
        <div className={classNames(
            'itemTemplate',
            'flex',
            'h-full',
            'justify-between',
            'shadow-lg',
            getStatusBackgroundColor(props.status)
        )}>
            <div >
                <div className="font-bold text-lg">{props.title}</div>
                <div className="font-light italic">{categoriesTitle}</div>
                <div>{props.content}</div>
            </div>
            <div>
                <button
                    className="font-bold bg-red-400 hover:bg-red-100 active:bg-red-700 rounded p-1 mr-4"
                    onClick={useCallback(() => {
                        onDeleteItem(id);
                    }, [onDeleteItem, id])}
                >Удалить</button>
                <button
                    className="font-bold bg-blue-400 hover:bg-blue-100 active:bg-blue-700 rounded p-1"
                    onClick={useCallback(() => {
                        onChangeItem(id);
                    }, [onChangeItem, id])}
                >Редактировать</button>
            </div>
        </div>
    );
});

ItemTemplate.displayName = 'MainList/ItemTemplate';