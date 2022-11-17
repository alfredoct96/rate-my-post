import rmp_frontend from 'rmp_frontend';
import IconHighlighter from './IconHighlighter';
import BrowserSupport from './BrowserSupport';

class AjaxLoad {
  constructor(postID) {
    this.postID = postID;
    this.widgetContainer = '.js-rmp-widgets-container--' + postID + ' ';
    this.settings = rmp_frontend;
    this.avgRatingContainer = document.querySelector(this.widgetContainer + '.js-rmp-avg-rating, .js-rmp-results-widget--' + postID + ' .js-rmp-avg-rating');
    this.voteCountContainer = document.querySelector(this.widgetContainer + '.js-rmp-vote-count, .js-rmp-results-widget--' + postID + ' .js-rmp-vote-count');
    this.noVotesContainer = document.querySelector(this.widgetContainer + '.js-rmp-not-rated');
    this.resultsTextContainer = document.querySelector(this.widgetContainer + '.js-rmp-results');
    this.noVotesContainer = document.querySelector(this.widgetContainer + '.js-rmp-not-rated');
    this.resultsTextContainer = document.querySelector(this.widgetContainer + '.js-rmp-results');
    this.msgContainer = document.querySelector(this.widgetContainer + '.js-rmp-msg');
    this.data = {
      action:'load_results',
      postID: this.postID,
      nonce: this.settings.nonce,
    }
    this.events();
  }


  async events() {
    const response = await fetch(this.settings.admin_ajax, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.data),
    });
    if(!response.ok) {
      return;
    }
    const body = await response.json();
    let voteCount = body.voteCount;
    let avgRating = body.avgRating;
    let error = response.errorMsg;
    this.loadResults(voteCount, avgRating, error);
  }

  loadResults(voteCount, avgRating, error) {
    if( error.length ) {
      this.msgContainer.textContent = error;
      this.msgContainer.classList.add('rmp-rating-widget__msg--alert');
      return;
    }
    // inject data
    this.avgRatingContainer.textContent = avgRating;
    this.voteCountContainer.textContent = voteCount;
    // highlight icons
    let highlightIcons = new IconHighlighter(this.widgetContainer, this.postID, avgRating);
    // handle classes
    if( avgRating === 0 ) {
      this.noVotesContainer.classList.remove('rmp-rating-widget__not-rated--hidden')
      this.resultsTextContainer.classList.add('rmp-rating-widget__results--hidden')
    } else {
      this.noVotesContainer.classList.add('rmp-rating-widget__not-rated--hidden')
      this.resultsTextContainer.classList.remove('rmp-rating-widget__results--hidden')
    }
    let browserSupport = new BrowserSupport();
  }
}

export default AjaxLoad;
