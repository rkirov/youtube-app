import * as ng from 'angular2/angular2';
import * as forms from 'angular2/forms';
import {bind} from 'angular2/di';
import {SearchResult} from 'components/search_result';
import {YoutubeService, LocalStorageYoutubeService} from 'services/youtube';

@ng.Component({
  selector: 'app',
  componentServices: [bind(YoutubeService).toClass(LocalStorageYoutubeService)]
})
@ng.Template({
  url: '/components/app.html',
  directives: [ng.Foreach, ng.If, SearchResult, forms.FormDirectives] 
})
export class App {
  videos;
  constructor(yt: YoutubeService) {
    this.videos = [];
    this.yt = yt;
    this.form = new forms.ControlGroup({
      'input': new forms.Control('angularjs')
    });
  }

  fetch() {
    var searchTerm = this.form.value.input;
    this.videos = [];
    this.yt.init(searchTerm).then((videos) => this.videos = videos);
  }
}

