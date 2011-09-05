describe("comboEditable", function() {

	var stage = null;

	function load(id) {
		stage = $('#staging').html($('#' + id).html());
		stage.find('select').comboEditable();
	}

	describe("when <select> has a name", function() {
		beforeEach(function() { 
			load('plain-options-with-name'); 
			value = stage.find('[name="test"]');
		});

		it("also sets the name on the target :hidden element", function() {
			expect(value.size()).toBe(1);
			expect(value.is(':hidden')).toBeTruthy();
		});

		it("sets the :hidden value to the clicked option", function() {
			var assumtion = stage.find('div[data-value!=""]').last().click();
			expect(assumtion.size()).toBe(1);
			expect(value.val()).toBe('3');
		});

		it("sets the :hidden value to undefined when typing a new value", function() {
			
		});

	});

	afterEach(function() {
		stage.html('');
	});

});
