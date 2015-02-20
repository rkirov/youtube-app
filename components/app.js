import * as ng from 'angular2/angular2';
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
  constructor(yt: YoutubeService) {
    this.videos = [];
    yt.init().then((videos) => this.videos = videos);
  }
}

