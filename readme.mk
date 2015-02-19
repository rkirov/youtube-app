# Getting started
1) run `./build.sh`
2) serve

# components
app
 - title
 - videos ([Video])
   - video (Video)
	   - player
		 - swipper (left - right)
	   - thumbs up/down
		 # displays likeCount
		 - comments with input
		 	 - comments
		    	- comments

# points to emphasize
- template syntax
  - binding from components to subcomponents (app to videos)
	- !foreach(in videos to video)

- web components
	- shadow dom - Component with <content> swiper.
  - template - ! is shortcut for template

- events
 - thumbs up/down into video

- zones (app can make the XHR and just set videos = response).

- reusable components
  - <videos data=[longVideos]>

- forms (missing two-way data binding)
  - comments component

- web components integration
  - polymer video player

[x] add events
[x] sync with npm
[x] test with es5 compiled output
[ ] bind to video properties
[ ] insert polymer player
[ ] test on real device
