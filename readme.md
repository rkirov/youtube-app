# Getting started
Run `tsc -w` and a webserver. Visit `src/`

## patches in the repo
- google-youtube web component (patched locally and checked in bower_components)
	- support property changes (add bug here)
	- incorrectly determines player support (add bug here)
    - fire `googleyoutubestatechange` instead of `google-youtube-state-change` (angular2 bug)
- youtube api
	- uses a custom promise lib that zone.js doesn't support (patched in patch_youtube_client.js)

## google youtube api key
- Will be revoked soon after application is public.
	You will need to provide your own key if you want to run the app.
