(function($) {
	
	$.fn.comboEditable = function(opts) {
		var name = this.attr('name') ? this.attr('name') : '';
		var selectedValue = undefined, selectedText = undefined;

		var data = $.map(this.find('option'), function(x, i) { 
			if (x.selected) {
				selectedValue = x.value;
				selectedText = x.innerHTML;
			}
			
			return '<div data-value="' + x.value + '" ' +
				+ (x.selected ? 'selected' : '') + '>' 
				+ x.innerHTML + '</div>';
		});

		if (!selectedText) {
			selectedValue = this.find('option').first().val();
			selectedText = this.find('option').first().text();
		}

		var elements = '';
		$.each(data, function(i, x) { elements += x; });
		
		var $ret = $('<div/>');
		$ret.append('<input type="text" value="' + selectedText + '" />');
		var $text = $ret.find(':text');
		$ret.append('<input type="hidden" value="' + selectedValue + '" name="'+name+'" />');
		var $value = $ret.find(':hidden');

		$ret.append('<div/>');
		var $options = $ret.find('div');
		$options.append(elements);
		$options.find('div').css({'display':'block'}).addClass('ui-state-highlight');
		$options.attr('width', '150px');

		this.replaceWith($ret);
		return $ret;
	}

})(jQuery);
