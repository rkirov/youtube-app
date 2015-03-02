# Getting started
1) run `./build.sh`
2) serve

# components
app
 - search
 - videos ([Video])
   - video (Video)
	   - player
		 - eitherpanel (left - right)
	   - thumbs up/down

[x] add events
[x] sync with npm
[x] test with es5 compiled output
[x] use form API
[x] make transclusion work with emulated shadow dom (will solve video problem)
[x] get bootstrap glyphs to show (or other thumbs)
[x] insert google-youtube player into component
[x] bind to video properties
[x] switch back to emulated mode
[ ] replace as much as possible cdn with localhost

# patches
- zone.js
	- https://github.com/angular/zone.js/issues/52 (patch locally in node_modules/zone.js)
- google-youtube element
	- support property changes (add bug here)
	- incorrectly determines player support (add bug here)
	- patched locally
- youtube api
	- uses a custom promise lib that zone.js doesn't support (patch in patch_youtube_client.js)
- angular 2
	- https://github.com/angular/angular/issues/776
