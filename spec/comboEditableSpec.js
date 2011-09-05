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
			stage.find('div[data-value!=""]').last().click();
			expect(value.val()).toBe('3');
		});

		it("sets the :hidden value to undefined when typing a new value", function() {
			stage.find(':text').val('blah').keyup();
			expect(value.val()).toBeFalsy();
		});

		it("gives all option divs an attribute called 'data-value' with a numeric value (in this case)", function() {
			var values = stage.find('.ui-combo-editable-options div');
			expect(values.size()).toBe(3);
			values = $.map(values, function(x) { return $(x).attr('data-value'); });
			expect(values).toEqual(['1', '2', '3']);
		});

		it("includes a 'text-<name>' value to the form data", function() {
			stage.find(':text').val('test data').keyup();
			var result = stage.find('[name="text-test"]');
			expect(result.size()).toBe(1);
			expect(result.val()).toBe('test data');
		});

	});

	afterEach(function() {
		stage.html('');
	});

});
