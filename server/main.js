import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

Meteor.startup(() => {
  Meteor.publish('users', () => {
    return Meteor.users.find({});
  });

  Meteor.publish(null, function() {
    return Meteor.roles.find({});
  });

  Meteor.methods({
    'users.remove'(id) {
      check(id, String);

      if (!Meteor.userId() || !Roles.userIsInRole(Meteor.userId(), 'admin')
            || Roles.userIsInRole(Meteor.userId(), 'blocked')) {

        throw new Meteor.Error('Access denied');
      }

      Meteor.users.remove(id);
    },

    'users.addRole'(id, role) {
      check(id, String);
      check(role, String);

      if (!Meteor.userId() || !Roles.userIsInRole(Meteor.userId(), 'admin')
            || Roles.userIsInRole(Meteor.userId(), 'blocked')) {

        throw new Meteor.Error('Access denied');
      }

      Roles.addUsersToRoles(id, [role]);
    },

    'users.removeRole'(id, role) {
      check(id, String);
      check(role, String);

      if (!Meteor.userId() || !Roles.userIsInRole(Meteor.userId(), 'admin')
            || Roles.userIsInRole(Meteor.userId(), 'blocked')) {

        throw new Meteor.Error('Access denied');
      }

      const roles = Meteor.users.findOne(id).roles;

      roles.splice(roles.indexOf(role), 1);

      Roles.setUserRoles(id, roles);
    },

    'users.setName'(id, text) {
      check(id, String);
      check(text, String);

      if (((Meteor.userId() != id) && !Roles.userIsInRole(Meteor.userId(), 'admin'))
            || Roles.userIsInRole(Meteor.userId(), 'blocked')) {

        throw new Meteor.Error('Access denied');
      }
      return Accounts.setUsername(id, text);
    }
  });
});

Accounts.onCreateUser(function(options, user) {
  if (user.emails && user.emails[0].address == 'admin@admin.com') {
    user.roles = ['admin'];
  } else {
    user.roles = ['user'];
  }

  return user;
});
