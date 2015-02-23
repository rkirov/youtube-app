var gapi = window.gapi;

export class YoutubeService {
  constructor() {
    this.cachedData = false;
    this.searchTerm = 'angular';
  }

  init(searchTerm) {
    this.searchTerm = searchTerm; 
    var stored = this.cachedData ? JSON.parse(window.localStorage['videos']) : null;
    if (stored) {
      return Promise.resolve(stored);
    } else {
      gapi.client.setApiKey('AIzaSyDRyLXw7Q9lLjtzO8nVO102zQ7vh0_p_GU');
      return gapi.client.load('youtube', 'v3')
        .then(this.makeSearch.bind(this));
    }
  }

  makeSearch() {
    return gapi.client.youtube.search.list({
      part: 'snippet',
      q: this.searchTerm,
      kind: 'video',
      maxResults: 30
    }).then((response) => {
      var ids = [];
      response.result.items.forEach((i) => ids.push(i.id.videoId));
      return this.makeInfoRequest(ids);
    });
  }

  makeInfoRequest(ids) {
    return gapi.client.youtube.videos.list({
      id: (ids + ',').substr(1),
      part: 'id,snippet,contentDetails,player,status,topicDetails,statistics',
      maxResults: 10
    }).then((r) => {
      window.localStorage['videos'] = JSON.stringify(r.result.items);
      return r.result.items;
    });
  }
}
