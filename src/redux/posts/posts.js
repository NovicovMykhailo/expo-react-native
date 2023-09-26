import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react"; // RTK
import * as API from "../../db/api"; //Fetch functions

export const postsApi = createApi({
  reducerPath: "posts",
  baseQuery: fakeBaseQuery(),
  keepUnusedDataFor: 0,
  tagTypes: ["Posts"],
  endpoints: builder => ({
    fetchPosts: builder.query({
      async queryFn() {
        try {
          const res = await API.getPosts();
          return { data: res };
        } catch (error) {
          return { error };
        }
      },
      providesTags: ["Posts"],
    }),
    fetchUserPosts: builder.query({
      async queryFn(id) {
        try {
          const res = await API.getUserPosts(id);
          return { data: res };
        } catch (error) {
          return { error };
        }
      },
      providesTags: ["Posts"],
    }),
    fetchComments: builder.query({
      async queryFn(id) {
        try {
          const res = await API.getComments(id);
          return { data: res };
        } catch (error) {
          return { error };
        }
      },
      providesTags: ["Posts"],
    }),
    fetchLikes: builder.query({
      async queryFn(id) {
        try {
          const res = await API.getLikes(id);
          return { data: res };
        } catch (error) {
          return { error };
        }
      },
      providesTags: ["Posts"],
    }),
    addPost: builder.mutation({
      async queryFn(data) {
        try {
          const res = await API.addPost(data);
          return { data: res };
        } catch (error) {
          return { error };
        }
      },
      invalidatesTags: ["Posts"],
    }),
    addComment: builder.mutation({
      async queryFn(postId, commentItem) {
        try {
          await API.addComment(postId, commentItem);
          return { data: true };
        } catch (error) {
          return { error };
        }
      },
      invalidatesTags: (result, error, arg) => [{ type: 'Posts' }, { type: "Posts", id: arg.postId }],
    }),
    addLike: builder.mutation({
      async queryFn(data) {
        try {
          const res = await API.addLike(data);

          return { data: res };
        } catch (error) {
          return { error };
        }
      },
      invalidatesTags: (result, error, arg) => [{ type: 'Posts' },{ type: "Posts", id: arg.postId }],
    }),
    removeLike: builder.mutation({
      async queryFn(data) {
        try {
          const res = await API.removeLike(data);
          return { data: res };
        } catch (error) {
          return { error };
        }
      },
      invalidatesTags: (result, error, arg) => [{ type: 'Posts' },{ type: "Posts", id: arg.postId }],
    }),
  }),
});

export const {
  useFetchPostsQuery,
  useFetchUserPostsQuery,
  useFetchCommentsQuery,
  useFetchLikesQuery,
  useAddPostMutation,
  useAddCommentMutation,
  useAddLikeMutation,
  useRemoveLikeMutation,
} = postsApi;

