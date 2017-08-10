import { ReactiveDict } from 'meteor/reactive-dict';


Template.UserList.onCreated(function userListOnCreated() {
  Meteor.subscribe('users');
  this.state = new ReactiveDict();
  this.state.set('nameTemplate', '');
  this.state.set('all', true);
});

Template.UserList.events({
  'input #search'(event, templateInstance) {
    templateInstance.state.set('nameTemplate', event.target.value);
  },

  'change #allRoles'(event, templateInstance) {
    templateInstance.state.set('all', event.target.checked);
  },

  'change .roleCheckbox'(event, templateInstance) {
    templateInstance.state.set(event.target.attributes.id.value, event.target.checked);
  }
});


Template.UserList.helpers({
  users() {
    const users = Meteor.users.find({}).fetch();
    if (users) {
      return users.filter((u) => (u.emails[0].address.indexOf(Template.instance().state.get('nameTemplate')) != -1)
        && (u.roles.some((r) => Template.instance().state.get(r)) || Template.instance().state.get('all')) );
    }
  },

  roleState(role) {
    Template.instance().state.get(role) ? 'checked' : false;
  },

  roles() {
    return Meteor.roles.find({}).map((r) => r.name);
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
