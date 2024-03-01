import { memo } from "react";
import { NavLink, Outlet } from "react-router-dom";
import classNames from "classnames";

export const Layout = memo(() => {
    const linkClassName = classNames(
        'bg-amber-200 hover:bg-amber-100 active:bg-amber-950',
        'rounded hover:rounded-2xl',
        'p-2 m-1 h-10 transition-all easy-linear'
    );
    return (
        <>
            <header className="flex w-full bg-gray-300">
                <div className="flex mx-auto my-auto h-20">
                    <NavLink
                        className={linkClassName}
                        to="/"
                    >Главная страница</NavLink>
                </div>
            </header>
            <Outlet />
        </>
    );
});