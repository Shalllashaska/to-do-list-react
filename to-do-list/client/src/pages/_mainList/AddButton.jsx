import { memo, useContext } from "react";
import { Link } from 'react-router-dom';
import * as classNames from "classnames";
import { MainListContext } from "./MainListContext";

export const AddButton = memo(({ className }) => {
    const { onAddItem } = useContext(MainListContext);
    return (
        <Link
            className={classNames(
                'text-blue-400 ml-3',
                'hover: text-blue-200',
                'active: text-blue-700',
                className
            )}
            to="/add-post"
            onClick={onAddItem}
        >Добавить пост</Link>
    )
});