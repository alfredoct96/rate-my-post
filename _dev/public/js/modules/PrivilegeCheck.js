import rmp_frontend from 'rmp_frontend';
import FreezeWidget from './FreezeWidget';

class PrivilegeCheck {
  constructor() {
    this.requiresLogin = rmp_frontend.votingPriv;
    this.isLoggedIn = rmp_frontend.loggedIn;
    this.ratingWidget = document.querySelector('.js-rmp-rating-widget');
    this.events();
  }

  events() {
    if(this.requiresLogin == 2 && !this.isLoggedIn ) {
      let freezeWidget = new FreezeWidget('');
      this.ratingWidget.classList.add('rmp-rating-widget--no-privilege')
    }
  }

}

export default PrivilegeCheck;
