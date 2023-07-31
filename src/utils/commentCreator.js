const shortid = require("shortid");

export default function commentCreator(data) {
  const { name, user_photo, comment, _id: id } = data;

  const obj = {
    id: shortid.generate(),
    createdAt: `${new Date()}`,
    user_id: id,
    name,
    user_photo,
    comment,
  };

  return obj;
}
