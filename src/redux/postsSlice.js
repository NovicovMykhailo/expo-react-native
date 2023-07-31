// import * as API from "./operations";
const { createSlice } = require("@reduxjs/toolkit");
import data from "../store/test/StoreSampleTest.json";

// {
//   "id": "1",
//   "owner": "owner ID",
//   "title": "title",
//   "location": "place",
//   "coords": {},
//   "likes": [],
//   "image": "url",
//   "comments": [
//     {
//       "createdAt": "2020-03-11T06:26:58.571Z",
//       "id": "1",
//       "name": "Name",
//       "user_photo": "UserPhoto",
//       "comment": "Text"
//     }
//   ]
// }

const initialState = {
  posts: [],
  isLoading: false,
  error: null,
};

// const handlePending = state => {
//   state.isLoading = true;
// };

// const handleRejected = (state, action) => {
//   state.isLoading = false;
//   state.error = action.payload;
// };

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addPost(state, { payload }) {
      // state.posts = []
      state.posts.push(payload);
    },
    getAllPosts(state, action) {
      state.posts = [...data.posts];
    },
    addLike(state, { payload }) {
      const foundPost = state.posts.find(post => post.id === payload.id);
      foundPost.likes.push(payload.userId);
      // state.posts[]
    },
    removeLike(state, { payload }) {
      const foundPost = state.posts.find(post => post.id === payload.id);
      const updatedArray = foundPost.likes.filter(like => like !== payload.userId);
      foundPost.likes = updatedArray;
    },
    addComment(state, { payload }) {
      const { postId, commentItem } = payload;
      const foundPost = state.posts.filter(post => post.id === postId);
      foundPost[0].comments.push(commentItem);
    },
  },

  // extraReducers: builder => {
  //   builder
  //     .addCase(API.getAllPosts.pending, handlePending)
  //     .addCase(API.addPost.pending, handlePending)

  //     .addCase(API.getAllPosts.rejected, handleRejected)
  //     .addCase(API.addPost.rejected, handleRejected)

  //     .addCase(API.getAllPosts.fulfilled, (state, { payload }) => {
  //       state.isLoading = false;
  //       state.error = null;
  //       state.items = payload;
  //     })
  //     .addCase(API.addPost.fulfilled, (state, action) => {
  //       state.isLoading = false;
  //       state.error = null;
  //       state.items.push(action.payload);
  //     });
  // },
});
export const { addPost, getAllPosts, addLike, removeLike, addComment } = postsSlice.actions;

export default postsSlice.reducer;
