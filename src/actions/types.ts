export const ACTION_TYPES = {
  registerSuccess: 'REGISTER_SUCCESS/Auth',
  registerFail: 'REGISTER_FAIL/Auth',
  loginSuccess: 'LOGIN_SUCCESS/Auth',
  loginFail: 'LOGIN_FAIL/Auth',
  logOut: 'LOGOUT/Auth',
  authError: 'AUTH_ERROR/Auth',
  userLoaded: 'USER_LOADED/Auth',
  updateUser: 'UPDATE_USER/Auth',

  loadBooks: 'FETCH_BOOKS_SUCCESS/Books',
  loadPages: 'LOAD_PAGES/Books',

  bookRequest: 'FETCH_BOOK_REQUEST/Books',
  bookLoaded: 'FETCH_BOOK_LOADED/Books',
  bookError: 'FETCH_BOOK_ERROR/Books',
  bookAdd: 'ADD_BOOK/Books',

  loadCategories: 'FETCH_CATEGORIES/Books',
  loadAuthors: 'FETCH_AUTHORS/Books',
  setRating: 'SET_RATING/Books',
  loadUserFavoritesBooks: 'FETCH_USER_FAVORITES_BOOKS/Books',
  loadFavorites: 'FETCH_FAVORITES/Books',
  setFavorite: 'SET_FAVORITE/Books',
  setBookCover: 'SET_BOOK_COVER/Books',

  reviewsRequest: 'FETCH_REVIEW_REQUEST/Reviews',
  reviewsLoaded: 'FETCH_REVIEWS/Reviews',
  reviewError: 'REVIEW_ERROR/Reviews',
  addReview: 'ADD_REVIEW/Reviews',
  deleteReview: 'DELETE_REVIEW/Reviews',
};
