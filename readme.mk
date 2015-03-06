# Components
- App
- SearchResult
- eitherpanel
- thumbs

# Sharp Edges
The application does not fully work out-of-the-box without the following patches.

## need to be patched
- zone.js
	- https://github.com/angular/zone.js/issues/52 (need to patch locally in node_modules/zone.js)
- angular 2
	- https://github.com/angular/angular/issues/776 (need to patch locally)

## patches already in the repo
- google-youtube web component
	- support property changes (add bug here)
	- incorrectly determines player support (add bug here)
	- patched locally and checked in bower_components
- youtube api
	- uses a custom promise lib that zone.js doesn't support (patched in patch_youtube_client.js)

## google youtube api key
- Will be revoked soon after application is public.
	You will need to provide your own key if you want to run the app.
