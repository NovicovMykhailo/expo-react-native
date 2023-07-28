const shortid = require("shortid");

export default function postCreate(data) {
  //owner
  const { title, location, coords, image, _id } = data;
  const post = {
    id: shortid.generate(),
    owner: _id,
    title: title,
    location: location,
    coords: coords,
    image: image,
    createdAt: new Date(),
    likes: [],
    comments: [],
  };

  return post;
}
