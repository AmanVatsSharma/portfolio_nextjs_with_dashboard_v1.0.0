export default {
  name: "projects",
  title: "Projects",
  type: "document",
  fields: [
    {
      name: "title",
      title: "title",
      description: "Title of the project",
      type: "string",
    },
    {
      name: "image",
      title: "image",
      type: "image",
      options: {
        hotspot: true,
      },
    },
{
  name: "summary",
  title: "summary",
  type: "text",
},
{
  name: "technologies",
  title: "technologies",
  type: "array",
  of: [
    {
      type: "reference",
      to: [{ type: "skill" }],
    },
  ],
},
{
  name: "linkToBuild",
  title: "linkToBuild",
  type: "url",
},
  ],
};
