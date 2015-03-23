# Components
- App
- SearchResult
- Eitherpanel
- Thumbs

# Baked in dependencies
Due to the fast changing pace of angular 2 development node_module deps are
backed in this repo.
Angular2 version baked in
https://github.com/angular/angular/commit/47c1a0f3814c888509f2e653d57b33727046103d

## patches in the repo
- google-youtube web component (patched locally and checked in bower_components)
	- support property changes (add bug here)
	- incorrectly determines player support (add bug here)
- youtube api
	- uses a custom promise lib that zone.js doesn't support (patched in patch_youtube_client.js)
- zone.js
	- https://github.com/angular/zone.js/issues/52 (patched locally in node_modules/zone.js)

## google youtube api key
- Will be revoked soon after application is public.
	You will need to provide your own key if you want to run the app.
