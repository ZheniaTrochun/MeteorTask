import { Template } from 'meteor/templating';

Template.GeneralStatistics.helpers({
  all() {
    return Meteor.users.find({}).count();
  },

  admins() {
    return Meteor.users.find({}).fetch().filter((user) => user.roles.indexOf('admin') != -1).length;
  },

  users() {
    return Meteor.users.find({}).fetch().filter((user) => user.roles.indexOf('user') != -1).length;
  },

  blocked() {
    return Meteor.users.find({}).fetch().filter((user) => user.roles.indexOf('blocked') != -1).length;
  }
});
