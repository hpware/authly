# DoomscollAuth
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
These videos are hand picked by me using a US vpn to view Tiktok overseas. Yea these videos have ya know brainrot.

## The JSON format.
All of the apis should normally return this format:
```JSON
{
  "true": String;
  "msg": String | null;
}
```

## What is the captcha answer?
Some might ask. Please ask chatgpt it ~~may~~ get the answer right (or just read the logic ig)
