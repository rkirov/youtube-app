import * as ng from 'angular2/angular2';
import * as forms from 'angular2/forms';
import {SearchResult} from 'components/search_result';
import {YoutubeService} from 'services/youtube';

@ng.Component({
  selector: 'app',
  componentServices: [YoutubeService]
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
      "input": new forms.Control("angular")
    });
  }

  fetch() {
    var searchTerm = this.form.value.input;
    this.videos = [];
    this.yt.init(searchTerm).then((videos) => this.videos = videos);
  }
}

