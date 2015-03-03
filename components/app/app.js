import {Component, Template, Foreach, If} from 'angular2/angular2';
import {bind} from 'angular2/di';
import {FormDirectives, ControlGroup, Control} from 'angular2/forms';
import {SearchResult} from 'components/search_result/search_result';
import {YoutubeService, LocalStorageYoutubeService} from 'services/youtube';

@Component({
  selector: 'app',
  componentServices: [
    bind(YoutubeService).toClass(LocalStorageYoutubeService)
  ]
})
@Template({
  url: 'components/app/app.html',
  directives: [Foreach, If, SearchResult, FormDirectives]
})
export class App {
  videos;
  constructor(yt: YoutubeService) {
    this.videos = [];
    this.yt = yt;
    this.form = new ControlGroup({
      'input': new Control('angularjs')
    });
  }

  fetch() {
    var searchTerm = this.form.value.input;
    this.videos = [];
    this.yt.init(searchTerm).then((videos) => this.videos = videos);
  }
}

