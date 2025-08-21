# Authly
For the Authly YSWS (also a fun hackclub project!)

## How does this work?

### Website
This system uses postgres for the database & currently it is deployed to vercel.


### Auth
The auth system is based on json matching, yes even which video is currently playing counts as well.

The json format looks something like this:
```json
{

}
```

## About
This is a super basic TODO app with a login system that matches the doomscrolling video JSON blob. This includes, the current video playing, the likes per video, and the saves, as well as how many videos you scroll, this can be 15 to unlimited! We also use UUID's as usernames to add more random-ness.
