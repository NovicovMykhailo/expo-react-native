import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import * as API from "../../db/api";

export const postsApi = createApi({
  reducerPath: "posts",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Post"],
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
      providesTags: ["Post"],
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
      providesTags: ["Post"],
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
      providesTags: ["Post"],
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
      providesTags: ["Post"],
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
      invalidatesTags: ["Post"],
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
      invalidatesTags: ["Post"],
    }),
    addLike: builder.mutation({
      async queryFn(postId, uid) {
        try {
          await API.addLike(postId, uid);
          return { data: true };
        } catch (error) {
          return { error };
        }
      },
      providesTags: ["Post"],
    }),
    removeLike: builder.mutation({
      async queryFn(postId, uid) {
        try {
          await API.removeLike(postId, uid);
          return { data: true };
        } catch (error) {
          return { error };
        }
      },
      invalidatesTags: ["Post"],
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
