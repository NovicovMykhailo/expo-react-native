const shortid = require("shortid");

export default function postCreator(data) {
  const { title, location, coords, image, owner } = data;
  const post = {
    id: shortid.generate(),
    createdAt: `${Date.now()}`,
    title,
    location,
    coords,
    image,
    owner,
    likes: [],
    comments: [],
  };

  return post;
}
