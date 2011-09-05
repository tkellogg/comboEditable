describe("comboEditable", function() {

	var stage = null;

	function load(id) {
		stage = $('#staging').html($('#' + id).html());
		stage.find('select').comboEditable();
	}

	describe("when <select> has a name", function() {
		beforeEach(function() { 
			load('plain-options-with-name'); 
		});

		it("also sets the name on the target :hidden element", function() {
			var value = stage.find('[name="test"]');
			expect(value.size()).toBe(1);
			expect(value.is(':hidden')).toBeTruthy();
		});
	});

	afterEach(function() {
		stage.html('');
	});

});
