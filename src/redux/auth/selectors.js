export const selectUser = state => state.auth.user;

export const selectUserId = state => state.auth.user.id;

export const selectUserPhoto = state => state.auth.user.photoURL;

export const selectCurrentToken = state => state.auth.token;

export const selectError = state => state.auth.error;

export const selectIsLoading = state => state.auth.isLoading;
