export default {
  name: "pageInfo",
  title: "pageInfo",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
    },
    {
      name: "role",
      title: "Role",
      type: "string",
    },
    {
      name: "heroImage",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "phoneNumber",
      title: "phoneNumber",
      type: "string",
    },
    {
      name: "email",
      title: "email",
      type: "string",
    },
    {
      name: "address",
      title: "address",
      type: "string",
    },

    {
      name: "backgroundInformation",
      title: "backgroundInformation",
      type: "string",
    },
    {
      name: "profilePic",
      title: "profilePic",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "socials",
      title: "socials",
      type: "array",
      of: [{ type: "reference", to: { type: "social" } }],
    },
  ],
};
