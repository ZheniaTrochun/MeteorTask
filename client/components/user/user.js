import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';

import getUsername from '../../../utils/getUsername.js';


Template.User.helpers({
  name() {
    return getUsername(this);
  },

  isBlocked() {
    return Roles.userIsInRole(this._id, 'blocked');
  },

  isAdmin() {
    return Roles.userIsInRole(this._id, 'admin');
  },

// TODO use profile picture
  image() {
    return 'background: url("http://www.joshuacasper.com/contents/uploads/52582c7aba2a3.png")';
  }
});
