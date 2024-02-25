const fromStringToJson = (res) => res.json();

export const addPost = (params) => {
    const body = JSON.stringify({
        title: params.title,
        content:  params.content,
        categories:  params.categories
    });
    fetch('./add-post', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body
    });
}

export const loadPosts = (params) => {
    return fetch('./post-list')
        .then(fromStringToJson)
        .then((posts) => posts);
}

export const deletePos = (id) => {
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