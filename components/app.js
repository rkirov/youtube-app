import * as ng from 'angular2/angular2';
import {LifeCycle} from 'angular2/src/core/life_cycle/life_cycle';
import {Video} from 'components/video';
import {YoutubeService} from 'services/youtube';

@ng.Component({
  selector: 'youtube-app',
  componentServices: [YoutubeService]
})
@ng.Template({
  url: '/components/youtube_app.html',
  directives: [ng.Foreach, ng.If, Video]
})
export class YoutubeApp {
  videos;
  constructor(lc: LifeCycle, yt: YoutubeService) {
    this.videos = [];
    this.lc = lc;
    yt.init().then((videos) => {
      this.videos = videos;
      lc.tick();  // investigate why needed?
    });
  }
}

