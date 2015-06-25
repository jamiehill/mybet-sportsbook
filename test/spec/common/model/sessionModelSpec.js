import model, {LOGGED_IN, LOGGED_OUT} from 'core/model/SessionModel';
import App from '../../../../app/js/app/App';

describe("core/model/SessionModel", function() {
	var app, trigger, sb;
	var oldConsole = console.log;
	var creds = {
		accountId: '123',
		username: 'jamie',
		password: 'password1',
		sessionToken: 'abcdefghijklmnop',
		accountBalance: {
			amount: '999999',
			currency: '£'
		}
	};

	var logIn = function(){
		model.storeSession(creds);
	};


	// Setup/teardown ------------------------------------------


	beforeEach(function(){
		console.log = function(){};

		app = new Marionette.Application();
		model.clearSession();

		//trigger = spy(model.vent, 'trigger');
	});

	afterEach(function(){
		console.log = oldConsole;
	});


	// Specs ----------------------------------------------------


	describe("state:logged out", function() {
		it("should be logged out", function() {
			expect(model.isLoggedIn()).to.be.false;
			expect(model.isNotLoggedIn()).to.be.true;
		});
		it("should have default values", function() {
			expect(model.getBalance()).to.equal('0.00');
			expect(model.getUsername()).to.equal('');
			expect(model.getSessionToken()).to.equal('-');
			expect(model.getAccountId()).to.equal('-');
		});
		it("should trigger 'session:loggedout' on logout", function() {
			model.clearSession();
			//expect(trigger).to.have.been.calledWith('session:loggedout');
		});
	});


	describe("state:logged in", function() {
		it("should be logged in", function() {
			logIn();
			expect(model.isLoggedIn()).to.be.true;
			expect(model.isNotLoggedIn()).to.be.false;
		});
		it("should persist credentials", function() {
			logIn();
			expect(parseInt(model.getBalance())).to.equal(999999);
			expect(model.getUsername()).to.equal('jamie');
			expect(model.getSessionToken()).to.equal('abcdefghijklmnop');
			expect(model.getAccountId()).to.equal('123');
		});
		it("should trigger 'session:loggedin' on login", function() {
			logIn();
			//App.vent.trigger(LOGGED_IN, lgn);
			//expect(App.session.trigger).to.have.been.calledWith('session:loggedin', creds);
		});
	});


	describe("sessionStorage", function() {
		it("should be defined", function() {
			expect(sessionStorage).to.be.defined;
		});
		it("should be null when state = logged out", function() {
			expect(model.store).to.not.exist;
		});
		it("should be defined when state = logged in", function() {
			logIn();
			expect(model.get('accountId')).to.equal('123');
			expect(model.get('username')).to.equal('jamie');
			expect(model.get('password')).to.equal('password1');
			expect(model.get('sessionToken')).to.equal('abcdefghijklmnop');

			var accountBalance = model.get('accountBalance');
			expect(accountBalance).to.exist;
			expect(accountBalance.amount).to.equal('999999');
			expect(accountBalance.currency).to.equal('£');
		});
	});

});

