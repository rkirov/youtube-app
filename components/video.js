import * as ng from 'angular2/angular2';
import {EitherPanel} from 'components/eitherpanel';
import {Thumbs} from 'components/thumbs';

// temp hack until attr bindings are available.
@ng.Decorator({
  selector: '[videoId]',
  bind: {
    'id': 'videoid'
  }
})
class VideoId {
  constructor(el: ng.NgElement) {
    this.el = el;
  }
  set id(id) {
    this.el.domElement.setAttribute('videoId', id);
  }
}

@ng.Component({
  selector: 'youtube-video',
  bind: {
    'video': 'video'
  }
})
@ng.Template({
  url: '/components/video.html',
  directives: [ng.Foreach, ng.If, EitherPanel, Thumbs, VideoId]
})
export class Video {
  player;
  constructor() {
    this.player = false;
  }

  url() {
    return this.video.player.embedHtml.match(/src='([^']*)'/)[1];
  }

  togglePlayer() {
    this.player = !this.player;
  }

  thumbsChange(event) {
    var likes = parseInt(this.video.statistics.likeCount);
    var dislikes = parseInt(this.video.statistics.dislikeCount);

    likes += event.upDiff;
    dislikes += event.downDiff;

    this.video.statistics.likeCount = likes + '';
    this.video.statistics.dislikeCount = dislikes + '';
  }
}
