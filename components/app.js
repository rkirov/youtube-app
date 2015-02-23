import * as ng from 'angular2/angular2';
import * as forms from 'angular2/forms';
import {LifeCycle} from 'angular2/src/core/life_cycle/life_cycle';
import {Video} from 'components/video';
import {YoutubeService} from 'services/youtube';

@ng.Component({
  selector: 'youtube-app',
  componentServices: [YoutubeService]
})
@ng.Template({
  url: '/components/youtube_app.html',
  directives: [ng.Foreach, ng.If, Video, forms.ControlGroupDirective, forms.ControlNameDirective]
})
export class YoutubeApp {
  constructor(lc: LifeCycle, yt: YoutubeService) {
    this.videos = [];
    this.lc = lc;
    this.yt = yt;
    this.form = new forms.ControlGroup({
      "input": new forms.Control("angular")
    });
  }

  fetch() {
    var searchTerm = this.form.value.input;
    this.videos = [];
    this.yt.init(searchTerm).then((videos) => {
      this.videos = videos;
      this.lc.tick();  // investigate why needed?
    });
  }
}

