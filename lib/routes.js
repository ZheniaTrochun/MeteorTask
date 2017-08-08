FlowRouter.route('/', {
  name: 'start',

  action() {
    BlazeLayout.render('MainLayout', {main: 'SelectUser'});
  }
});


FlowRouter.route('/user/:_id', {
  name: 'user.statistics',

  action() {
    BlazeLayout.render('MainLayout', {main: 'UserStatistics'});
  }
});
