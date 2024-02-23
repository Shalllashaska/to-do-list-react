import {memo, useContext} from "react";
import * as classNames from "classnames";
import {MainListContext} from "./MainListContext";

export const AddButton = memo(({ className }) => {
    const { onAddItem } = useContext(MainListContext);
    return (
        <button
            className={classNames(
                'text-blue-400',
                'hover: text-blue-200',
                'active: text-blue-700',
                className
            )}
            onClick={onAddItem}
        >Добавить пост</button>
    )
});