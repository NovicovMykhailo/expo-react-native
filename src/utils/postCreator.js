const shortid = require("shortid");

export default function postCreate(data) {
  const { title, location, coords, image } = data;
  const post = {
    id: shortid.generate(),
    title: title,
    location: location,
    coords: coords,
    likes: 0,
    image: image,
    comments: [],
    createdAt: new Date(),
  };

  return post;
}
