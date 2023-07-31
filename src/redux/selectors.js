export const selectIsLoading = state => state.posts.isLoading;

export const selectError = state => state.posts.error;

export const selectAllPosts = state => state.posts.posts;

export const selectComments = (state, index) => state.posts.posts[index].comments;

export const selectLikes = (state, index) => state.posts.posts[index].likes;

    // console.log(state),
    // console.log(state.posts), //posts
    // console.log(state.posts.posts[0...].comments ); //comments
    // console.log(state.posts.posts[0....].likes) //Likes
