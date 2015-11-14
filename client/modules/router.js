FlowRouter.route('/', {
  name: 'login',
  triggersEnter: [function(context, redirect) {
    if (Meteor.userId())
      redirect('/dashboard');
  }],
  action: function () {
    BlazeLayout.render('user__components__Login');
  }
});

FlowRouter.route('/signup', {
  name: 'signup',
  action: function () {
    BlazeLayout.render('user__components__SignUp');
  }
});

FlowRouter.route('/pricing', {
  name: 'pricing',
  action: function () {
    BlazeLayout.render('user__components__Pricing');
  }
});


// ------
// Logged in routes

let loggedIn = FlowRouter.group({
  name: 'loggedIn',
  triggersEnter: [function(context, redirect) {
    if (!Meteor.loggingIn() && !Meteor.userId()) {
      let route = FlowRouter.current();

      if (route.routename != 'login')
        Session.set('redirectAfterLogin', route.path);

      redirect('/');
    }
  }]
});

loggedIn.route('/dashboard', {
  name: 'dashboard',
  action: function () {
    BlazeLayout.render('user__components__Dashboard');
  }
});

loggedIn.route('/:organization/:space/data', {
  name: 'data',
  action: function (params) {
    Session.set('currentOrganization', params.organization);
    Session.set('currentSpace', params.space);

    BlazeLayout.render("user__layouts__Main", {main: "user__components__Data"});
  }
});

loggedIn.route('/:organization/:space', {
  name: 'space',
  action: function (params) {
    Session.set('currentOrganization', params.organization);
    Session.set('currentSpace', params.space);

    BlazeLayout.render("user__layouts__Main", {main: "user__components__Space"});
  }
});