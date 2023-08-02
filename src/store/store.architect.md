```js

const StoreMarkup = {
  "auth": {//???
    "error": null,
    "isLoggedIn": false,
    "isLoading": false,
    "isRefreshing": false,
    "token": null, //from firebase
    // "user": {
    //   "email": null, // from firebace
    //   "id": null, // from firebace
    //   "name": null, // from firebace
    //   "user_photo": null // from firebace
    // }
  },
  "posts": {
    "error": null,
    "isLoading": false,
    "posts": [
      {
        "coords": {},
        "id": null,
        "image": null,
        "likes": [],
        "location": null,
        "owner": null,
        "title": null,
        "comments": [
          {
            "id": 1,
            "createdAt": null,
            "name": null,
            "user_photo": null,
            "comment": null
          }
        ]
      }
    ]
  }
}
``