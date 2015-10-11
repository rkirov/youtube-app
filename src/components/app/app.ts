import {Component, View, CORE_DIRECTIVES, bind, FORM_DIRECTIVES, ControlGroup, Control} from 'angular2/angular2';
import {SearchResult} from '../search_result/search_result';
import {YoutubeService, LocalStorageYoutubeService} from '../../services/youtube';
import {Video} from '../../models/video';

@Component({
  selector: 'app',
  viewBindings: [
    bind(YoutubeService).toClass(LocalStorageYoutubeService)
  ]
})
@View({
  templateUrl: 'components/app/app.html',
  directives: [SearchResult, CORE_DIRECTIVES, FORM_DIRECTIVES]
})
export class App {
  videos: Video[] = [];
  searchTerm: string = 'angularjs';
  constructor(public yt: YoutubeService) {}

  fetch() {
    this.videos = [];
    this.yt.init(this.searchTerm).then((videos) => {
      this.videos = videos;
      console.log(videos);
    });
  }
}

