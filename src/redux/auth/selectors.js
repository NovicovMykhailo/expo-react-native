export const selectUser = state => state.auth.user; // user

export const selectUserId = state => state.auth.user.id; // UID

export const selectUserPhoto = state => state.auth.user.photoURL; // Photo

export const selectCurrentToken = state => state.auth.token; //Token

export const selectError = state => state.auth.error; // Error

export const selectIsLoading = state => state.auth.isLoading; // Is Loading
