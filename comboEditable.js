(function($) {
	
	$.fn.comboEditable = function(opts) {
		var name = this.attr('name');
		var selectedValue = undefined, selectedText = undefined;
		var data = $.map(this.find('option'), function(x) { 
			if (this.selected) {
				selectedValue = this.value;
				selectedText = this.innerHTML;
			}

			return '<span data-value="' + this.value + '" ' +
				+ (this.selected ? 'selected' : '') + '>' 
				+ this.innerHTML + '</span>';
		});

		if (!selectedText) {
			selectedValue = this.find('option').first().val();
			selectedText = this.find('option').first().text();
		}

		var elements = '';
		$.each(data, function(x) { elements += x; });
		
		var $ret = $('<div/>');
		$ret.append('<input type="text" value="' + selectedText + '" />');
		var $text = $ret.find(':text');
		$ret.append('<input type="hidden" value="' + selectedValue + '" name="'+name+'" />');
		var $value = $ret.find(':hidden');

		this.replaceWith($ret);
		return $ret;
	}

})(jQuery);
