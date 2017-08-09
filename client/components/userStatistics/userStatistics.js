import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import getUsername from '../../../utils/getUsername.js';
import checkPermissions from '../../../utils/checkPermissions.js';

const Users = Meteor.users;

Template.UserStatistics.onCreated(function() {
  Meteor.subscribe('users');
});

Template.UserStatistics.helpers({
  unlocked() {
    return !Roles.userIsInRole(FlowRouter.getParam('_id'), 'blocked');
  },

  username() {
    return getUsername(Users.findOne(FlowRouter.getParam('_id')));
  },

  email(){
    if (Users.findOne(FlowRouter.getParam('_id'))
        && Users.findOne(FlowRouter.getParam('_id')).emails) {
      return Users.findOne(FlowRouter.getParam('_id')).emails[0].address;
    }

    return '-';
  },

  id() {
    return FlowRouter.getParam('_id');
  },

  createdAt() {
    if (Users.findOne(FlowRouter.getParam('_id'))) {
      return Users.findOne(FlowRouter.getParam('_id')).createdAt;
    }
  },

  roles() {
    if (Users.findOne(FlowRouter.getParam('_id'))) {
      return Users.findOne(FlowRouter.getParam('_id')).roles;
    }
  }
});

Template.UserStatistics.events({
  'click .delete'(event) {
    if (checkPermissions(Meteor.userId())) {

      MaterializeModal.error({message: 'Access Denied'});
    } else {
      Meteor.call('users.remove', FlowRouter.getParam('_id'));

      FlowRouter.go('user.statistics', { _id: Users.find({}).fetch()[0]._id });
    }
  },

  'click .changename'(event) {
    if (((Meteor.userId() != FlowRouter.getParam('_id')) && !Roles.userIsInRole(Meteor.userId(), 'admin'))
          || Roles.userIsInRole(Meteor.userId(), 'blocked')) {

      MaterializeModal.error({message: 'Access Denied'});
    } else {
      MaterializeModal.prompt({
        message: 'Enter new username',
        callback: (err, str) => {
          if (!err) {
            Meteor.call('users.setName', FlowRouter.getParam('_id'), str.value);
          }
        }
      });
    }
  },

  'click #addRole'(event) {
    if (checkPermissions(Meteor.userId())) {

      MaterializeModal.error({message: 'Access Denied'});
    } else {
      MaterializeModal.prompt({
        message: 'Enter new user role',
        callback: (err, str) => {
          if (!err) {
            Meteor.call('users.addRole', FlowRouter.getParam('_id'), str.value);
          }
        }
      });
    }
  },

  'click .close'(event) {
    event.preventDefault();
    if (checkPermissions(Meteor.userId())) {

      MaterializeModal.error({message: 'Access Denied'});
    } else {
      Meteor.call('users.removeRole', FlowRouter.getParam('_id'), event.target.attributes.id.value);
    }
  },

  'click .block'(event) {
    if (!Meteor.userId() || !Roles.userIsInRole(Meteor.userId(), 'admin')
          || Roles.userIsInRole(Meteor.userId(), 'blocked')) {

      MaterializeModal.error({message: 'Access Denied'});
    } else {
      Meteor.call('users.addRole', FlowRouter.getParam('_id'), 'blocked');
    }
  },

  'click .unlock'(event) {
    if (checkPermissions(Meteor.userId())) {

      MaterializeModal.error({message: 'Access Denied'});
    } else {
      Meteor.call('users.removeRole', FlowRouter.getParam('_id'), 'blocked');
    }
  }
});
