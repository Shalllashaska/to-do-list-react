const fromStringToJson = (res) => res.json();

export const loadPosts = (params) => {
    return fetch('./post-list')
        .then(fromStringToJson)
        .then((posts) => posts);
}

export const addPost = (params) => {
    return fetch('./add-post', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: params.title,
            content:  params.content,
            categories:  params.categories
        })
    });
}

export const updatePost = (record) => {
    return fetch('/update-post', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(record)
    })
}

export const deletePost = (id) => {
    return fetch('./post-delete', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id })
    }).then((res) => true);
}

export const readPost = (id) => {
    return fetch(`/read-post/${id}`)
        .then(fromStringToJson)
        .then((post) => post);
}