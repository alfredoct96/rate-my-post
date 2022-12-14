import $ from 'jquery';

class RelationsHandler {
  constructor() {
    // Social dependencies
    this.socialFollowDependencies = $('.js-rmp-social-share, .js-rmp-social-follow');
    this.socialFollowCb = $('.js-rmp-social-follow');
    this.socialShareCb = $('.js-rmp-social-share');
    this.socialFollowTable = $('.js-rmp-social-follow-links');
    // Multilingual dependencies
    this.multilingualCb = $('.js-rmp-multilingual');
    this.multilingualDisable = $('.js-rmp-no-multilingual .js-rmp-customization');
    // IP tracking
    this.ipTracking = $('.js-rmp-track-ip');
    this.ipDoubleVotes = $('.js-rmp-ip-double-vote');
    // Ajax load
    this.ajaxLoad = $('#rmp-ajax-load');
    this.ajaxLoadAllWidgets = $('#rmp-ajax-load-all-widgets');
    this.events();
  }

  events() {
    // Social dependencies
    this.socialFollowDependencies.change((event) => this.handleSocialFollowDependencies());
    this.handleSocialFollowDependencies();
    // Multilingual dependencies
    this.multilingualCb.change((event) => this.handleMultilingualDependencies());
    this.handleMultilingualDependencies();
    // IP dependencies
    this.ipTracking.change((event) => this.handleIpTrackingDependencies());
    this.handleIpTrackingDependencies();
    // Ajax load
    this.ajaxLoad.change((event) => this.handleAjaxLoadDependencies());
    this.handleAjaxLoadDependencies();
  }

  handleSocialFollowDependencies() {
    if( this.socialFollowCb.is(':checked') && ! this.socialShareCb.is(':checked')  ) {
      this.socialFollowTable.removeClass('rmp-tab-content__table--hidden');
    } else {
        this.socialFollowTable.addClass('rmp-tab-content__table--hidden');
    }
  }

  handleMultilingualDependencies() {
    if(this.multilingualCb.is(':checked') ) {
      this.multilingualDisable.prop('disabled', true);
      this.multilingualDisable.attr('disabled','disabled');
    } else {
        this.multilingualDisable.prop('disabled', false);
        this.multilingualDisable.removeAttr('disabled');
    }
  }

  handleIpTrackingDependencies() {
    if(this.ipTracking.val() == 1 ) {
      this.ipDoubleVotes.prop('disabled', true);
      this.ipDoubleVotes.attr('disabled','disabled');
      this.ipDoubleVotes.val('1');
    } else {
        this.ipDoubleVotes.prop('disabled', false);
        this.ipDoubleVotes.removeAttr('disabled');
    }
  }

  handleAjaxLoadDependencies() {
    if(this.ajaxLoad.is(':checked')) {
      this.ajaxLoadAllWidgets.prop('disabled', false);
      this.ajaxLoadAllWidgets.removeAttr('disabled');
      return;
    }
    this.ajaxLoadAllWidgets.prop('disabled', true);
    this.ajaxLoadAllWidgets.attr('disabled', 'disabled');
    this.ajaxLoadAllWidgets.prop('checked', false);
    this.ajaxLoadAllWidgets.val('1');
  }
}

export default RelationsHandler;
