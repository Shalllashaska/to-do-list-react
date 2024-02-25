import { memo } from "react";

export const ItemTemplate = memo(({ title, className}) => {
    return (
        <div className={className}>
            <div>{title}</div>
        </div>
    );
})