```json

const a = {
  navigation: {
    addListener: ["Function addListener"],
    canGoBack: ["Function canGoBack"],
    dispatch: ["Function dispatch"],
    getId: ["Function getId"],
    getParent: ["Function getParent"],
    getState: ["Function anonymous"],
    goBack: ["Function anonymous"],
    isFocused: ["Function isFocused"],
    navigate: ["Function anonymous"],
    pop: ["Function anonymous"],
    popToTop: ["Function anonymous"],
    push: ["Function anonymous"],
    removeListener: ["Function removeListener"],
    replace: ["Function anonymous"],
    reset: ["Function anonymous"],
    setOptions: ["Function setOptions"],
    setParams: ["Function anonymous"],
  },
  route: {
    key: "Map-hTEk9mdeq4AXdC_4VAsyz",
    name: "Map",
    params: { geo: [Array] },
    path: undefined },
};

```

### !!!!STORE!!!!

```json
{
  "auth": {
    "error": null,
    "isLoggedIn": false,
    "isRefreshing": false,
    "token": null, //from firebase
    "user": {
      "email": null, // from firebace
      "id": null, // from firebace
      "name": null, // from firebace
      "user_photo": null // from firebace
    }
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
```
