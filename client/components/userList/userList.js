import { ReactiveDict } from 'meteor/reactive-dict';
import getRole from '../../../utils/getRole.js';


Template.UserList.onCreated(function userListOnCreated() {
  Meteor.subscribe('users');
  this.state = new ReactiveDict();
  this.state.set('nameTemplate', '');
  this.state.set('admin', true);
  this.state.set('user', true);
  this.state.set('blocked', true);
  this.state.set('all', true);
});

Template.UserList.events({
  'input #search'(event, templateInstance) {
    templateInstance.state.set('nameTemplate', event.target.value);
  },

  'change #allRoles'(event, templateInstance) {
    templateInstance.state.set('all', event.target.checked);
  },

  'change #adminRole'(event, templateInstance) {
    templateInstance.state.set('admin', event.target.checked);
  },

  'change #userRole'(event, templateInstance) {
    templateInstance.state.set('user', event.target.checked);
  },

  'change #blockedRole'(event, templateInstance) {
    templateInstance.state.set('blocked', event.target.checked);
  }
});


Template.UserList.helpers({
  users() {
    const users = Meteor.users.find({}).fetch();
    if (users) {
      return users.filter((u) => (u.emails[0].address.indexOf(Template.instance().state.get('nameTemplate')) != -1)
        && (Template.instance().state.get(getRole(u)) || Template.instance().state.get('all')) );
    }
  },

  allRoles() {
    return Template.instance().state.get('all') ? 'checked' : false;
  },

  userRole() {
    return Template.instance().state.get('user') ? 'checked' : false;
  },

  adminRole() {
    return Template.instance().state.get('admin') ? 'checked' : false;
  },

  blockedRole() {
    return Template.instance().state.get('blocked') ? 'checked' : false;
  }
});
