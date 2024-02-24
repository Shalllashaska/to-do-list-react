import { memo, useCallback, useState } from "react";
import { Link } from "react-router-dom";
import * as service from "../service";

import classNames from "classnames";

export const Post = memo((props) => {
    const id = props.id;
    const [title, setTitle] = useState('');
    const [categories, setCategories] = useState('');
    const [content, setContent] = useState('');

    const save = useCallback(() => {
        if (!id) {
            service.addPost({
                title,
                content,
                categories
            });
        }
    }, [title, content, categories, id]);

    const backButtonText = '<';

    return (
        <div className="p-3 flex flex-col bg-cyan-100 mt-6 rounded-xl shadow-lg">
            <Link
                className="float-left text-3xl font-bold"
                to="/"
            >
                {backButtonText}
            </Link>
            <input
                type="text"
                name="title"
                className={classNames(
                    "block drop-shadow-md mt-6 w-full rounded-md",
                    "border-0 py-1.5 pl-7 pr-20 text-gray-900",
                    "ring-1 ring-inset ring-gray-300 placeholder:text-gray-400",
                    "focus:ring-2 focus:ring-inset focus:ring-indigo-600",
                    "sm:text-sm sm:leading-6")}
                placeholder="Название поста"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <input
                type="text"
                name="categories"
                className={classNames(
                    "block mt-6 drop-shadow-md w-full rounded-md",
                    "border-0 py-1.5 pl-7 pr-20 text-gray-900",
                    "ring-1 ring-inset ring-gray-300 placeholder:text-gray-400",
                    "focus:ring-2 focus:ring-inset focus:ring-indigo-600",
                    "sm:text-sm sm:leading-6")}
                placeholder="Категории"
                value={categories}
                onChange={(e) => setCategories(e.target.value)}
            />
            <textarea
                name="content"
                className={classNames(
                    "block mt-6 drop-shadow-md w-full rounded-md",
                    "border-0 py-1.5 pl-7 pr-20 text-gray-900",
                    "ring-1 ring-inset ring-gray-300 placeholder:text-gray-400",
                    "focus:ring-2 focus:ring-inset focus:ring-indigo-600",
                    "sm:text-sm sm:leading-6")}
                placeholder="Введите текст..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />
            <button
                className={classNames("mt-8 text-lg drop-shadow-md",
                    "font-bold w-full",
                    "bg-amber-200 hover:bg-amber-100 active:bg-green-600",
                    "rounded hover:rounded-2xl",
                    "ease-linear transition-all")}
                type="submit"
                onClick={save}
            >Сохранить</button>
        </div>
    );
});

Post.displayName = 'Post';