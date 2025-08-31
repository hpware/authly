# DoomscrollAuth
![](https://status.yhw.tw/badge/doomscrollauth/uptime?labelColor=333&color=4699ba&style=for-the-badge&label=Uptime&sinceLast=7776000&hideDuration=true)

>[!NOTE]
> Most of the code is stored in the `~/web` dir. Please go there to view the source code.

This is a application that uses doomscrolling behavior as auth, such as which posts you liked, saved and the current playing. For the Authly YSWS!

## The stack
This application uses Nuxt, Postgres, Tailwind and Bun.

## AI involvement
Some of the code is written by an AI (which is the model Claude Sonnet 3.5 in Ask mode in Zed), including the main observer logic in the `~/web/app/components/doomscrolling.vue` component handling the main doomscrolling logic. Most of the css components are not AI generated.

## Why is the things in the ~/web folder?
Short answer, is that I want to make a app which you can run abtratrary code on you pc to login. But it brings the risk of ppl being hacked due to this weird idea. And changed it to a TikTok like auth system.

## What are these video selections????
These videos are hand picked by me using a US vpn to view Tiktok overseas. Yea these videos have ya know brainrot. Want to add a few videos? No, this system is used to match JSON. so this system cannot handle adding new videos. If I ever do that, everyone will have their account locked up forever.

## Where are the videos stored at?
All of the videos are stored in the branch `videos` in the same GitHub repo. And can be accessed via GitHub Pages `https://github.yuanhau.com/authly/videos/dlv[number].mp4` from 1~13.

## What is the captcha answer?
Some might ask. Please ask chatgpt it ~~may~~ get the answer right (or just read the logic ig)

## Logic of this app
This app is based on matching the video's json to the db (in plaintext), your likes, saves and currently playing are all factors that are counted in the auth flow (and default behavors cannot be setted up as a password due to this logic
```typescript
if (
  !(
    JSON.stringify(body.video_json_data) !== JSON.stringify(videoJson) &&
    JSON.stringify(body.video_json_data) !== JSON.stringify(videoJson2)
  )
) {
  return {
    true: "no",
    msg: "This is super insecure 💥💥 Please change it!",
  };
}
```
). This app is also using session stored in Cookies as a way to let the server know what user is logged in, this component is at `~/web/server/components/checkSesion.ts`, which is used by every single endpoint in the `~/web/server/api/bottle/` folder.

### Push Updates & Pulls in the notes/todo app
Every single publish update in the `/bottle/` dashboard goes to the `/api/bottle/publish` endpoint via a POST request. And all data is pulled via the `/api/bottle/get_data` api endpoint. The expection is only the `/api/bye` endpoint, which is where the user can logout of their account to change to a different account (lets be honest here, no one is trying to do the auth again, its a pain).

## Endpoints & Pages
The endpoints below are NOT mentioned above. If you find any missing endpoints. Please go up and find it.

### /api/status/update
This is only for my uptime service checking if the service is up or not.

### /api/chatgpt
This redirects to the captcha's correct answer via ChatGPT

### /api/checkSystemStatus
This endpoint checks if a user is logged in or not. While checking if the DB and the server are both ok.

### /api/ditchcopypaste
#### GET
Returns
```json
{
  true: "no",
  msg: "This request does not include any of your secrets 😔"
};
```
#### POST
This is where all the magic happens, where you can submit a uuid, captcha_answer, and finally a DoomSrollAuth, it can give your browser a Cookie token encoded using uuid. This is used by the `/cap` endpoint.

While submiting:
```json
{
  username: String;
  captcha_data: String;
  video_json_data: [
  {
      id: Number;
      url: String;
      liked: boolean;
      saved: boolean;
      current: boolean;
  }
  ]
}
```

It returns a few responses on how the status is going on.

##### Success
```json
{
        true: "yes",
        msg: null,
      };
```
##### Failed
```json
{
        true: "no",
        msg: "a random message",
      };
```


### /api/register
#### GET
Returns
```json
{
  true: "no",
  msg: "a message here"
};
```
#### POST
This where the register logic comes in. This is used in the URL `/seal` for signing up users.

While submiting:
```json
{
  username: String;
  captcha_data: String;
  video_json_data: [
  {
      id: Number;
      url: String;
      liked: boolean;
      saved: boolean;
      current: boolean;
  }
  ]
}
```

It returns a few responses a success one and a failed one.

##### Success
```json
{
        true: "yes",
        msg: null,
};
```
##### Failed
```json
{
        true: "no",
        msg: "a random message",
};
```

### /robots.txt
The app's robot.txt file is below
```
User-Agent:*
Disallow: /
```

### /cap
This is the sign in page, if you are signed in, you are auto magicly redirected into the `/bottle` endpoint.

### /seal
This is the register page, which is bottle's seal. The same as the `/cap` endpoint, if you are logged in, it will redirect you to the dashboard `/bottle`.

### /bottle/
This is the main dashboard, where you can create todo/notes, and it uses the endpoint `/api/bottle/publish` via POST to send it to the db, and it sometimes (3s or click on update) gets data from the endpoint `/api/bottle/get_data`.

### /bottle/password
This page is all about changing your auth. If you want to submit it, it requires you to enter your captcha answer when you signed up for the application.

#### Known issues
This page has the issue that when you are at the success page, you cannot click at the top nav buttons at all. Sooo thats bad.

And the default matching system does not work, so if you set the password as the default you will be locked out of your account forever.
