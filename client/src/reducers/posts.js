export default (posts = [], action) => {

    switch (action.type) {
        case 'FETCH_ALL':
            return action.payload;
        case 'CREATE':
            return [...posts, action.payload];
        case 'UPDATE':
            return posts.map((post) => post._id === action.payload._id ? action.payload : post); //action.payload will be return if post._id is matched
        case 'DELETE':
            return posts.filter((post) => post._id != action.payload); //Delete all the post with ID
        case 'LIKE':  //It will just give the updated like based on the ID
            return posts.map((post) => post._id === action.payload._id ? action.payload : post);
        case 'FETCH_COMMENTS':
            return posts.map((post) =>
                post._id === action.payload.postId
                    ? { ...post, comments: action.payload.comments } 
                    : post
            );
        case 'ADD_COMMENT':
            return posts.map((post) =>
                post._id === action.payload.postId
                    ? { ...post, comments: [...(post.comments || []), action.payload.comment] }
                    : post
            );
        default:
            return posts;
    }
}