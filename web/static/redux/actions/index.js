export function setPosts(posts = []) {
    return {
        type: 'SET_POSTS',
        posts
    };
}
