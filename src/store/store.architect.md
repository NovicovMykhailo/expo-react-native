```js

const StoreMarkup = {
  "auth": {
    "error": null,
    "user": {},  //from firebase
    "token": null, //from firebase
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