export default async function CheckSession() {
  const req = await fetch("/api/checkSystemStatus");
  const res = await req.json();
  if (res.true !== "yes") {
    return {
      loggedin: false,
      user: null,
    };
  }
  return {
    loggedin: true,
    user: res.user,
  };
}
