export default defineEventHandler((event) => {
  return {
    true: "no",
    msg: "This request does not include any of your cool todos 😔😔😔😔",
  };
});
