import {memo, useCallback, useContext, useMemo} from "react";
import classNames from "classnames";

import './_itemTemplate.css';
import {MainListContext} from "./MainListContext";

const getStatusBackgroundColor = (status) => {
    switch (status) {
        case 'successful':
            return 'bg-green-300 hover:bg-green-200 active:bg-green-400';
        case 'warning':
            return 'bg-yellow-300 hover:bg-yellow-200 active:bg-yellow-400';
        case 'danger':
            return 'bg-red-300 hover:bg-red-200 active:bg-red-400 ';
        default:
            return 'bg-zinc-300 hover:bg-zinc-200 active:bg-zinc-400';
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
            'shadow-lg transition-colors ease-linear',
            getStatusBackgroundColor(props.status)
        )}>
            <div >
                <div className="font-bold text-lg">{props.title}</div>
                <div className="font-light italic">{categoriesTitle}</div>
                <div>{props.content}</div>
            </div>
            <div>
                <button
                    className="font-bold bg-red-400 hover:bg-red-100 active:bg-red-700 rounded p-1 px-3 mr-4 transition-colors ease-linear"
                    onClick={useCallback(() => {
                        onDeleteItem(id);
                    }, [onDeleteItem, id])}
                >Удалить</button>
                <button
                    className="font-bold bg-blue-400 hover:bg-blue-100 active:bg-blue-700 rounded p-1 px-3 transition-colors ease-linear"
                    onClick={useCallback(() => {
                        onChangeItem(id);
                    }, [onChangeItem, id])}
                >Редактировать</button>
            </div>
        </div>
    );
});

ItemTemplate.displayName = 'MainList/ItemTemplate';