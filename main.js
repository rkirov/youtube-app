import * as ng from 'angular2/angular2';
import {LifeCycle} from 'angular2/src/core/life_cycle/life_cycle';
import {Video} from 'components/video';

@ng.Component({
  selector: 'youtube-app'
})
@ng.Template({
  url: 'youtube_app.html',
  directives: [ng.Foreach, ng.If, Video]
})
export class YoutubeApp {
  videos;
  constructor(lc: LifeCycle) {
    this.videos = [];
    this.cachedData = true;
    this.lc = lc;
    this.init();
  }

  init() {
    var stored = this.cachedData ? JSON.parse(window.localStorage['videos']) : null;
    if (stored) {
      this.videos = stored;
    } else {
      gapi.client.setApiKey('AIzaSyDRyLXw7Q9lLjtzO8nVO102zQ7vh0_p_GU');
      gapi.client.load('youtube', 'v3').then(this.makeSearch.bind(this));
    }
  }

  makeSearch() {
    gapi.client.youtube.search.list({
      part: 'snippet',
      q: 'angular',
      kind: 'video',
      maxResults: 30
    }).then((response) => {
      var ids = [];
      response.result.items.forEach((i) => ids.push(i.id.videoId));
      this.makeInfoRequest(ids);
    });
  }

  makeInfoRequest(ids) {
    gapi.client.youtube.videos.list({
      id: (ids + ',').substr(1),
      part: 'id,snippet,contentDetails,player,status,topicDetails,statistics',
      maxResults: 10
    }).then((r) => {
      window.localStorage['videos'] = JSON.stringify(r.result.items);
      this.videos = r.result.items;
      // TODO(rado): why is this needed?
      this.lc.tick();
    });
  }
}

export function main() {
  ng.bootstrap(YoutubeApp);
}
