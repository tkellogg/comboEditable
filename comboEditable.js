(function($) {
	
	$.fn.comboEditable = function(opts) {
		var name = this.attr('name') ? this.attr('name') : '';
		var selectedValue = undefined, selectedText = undefined;

		var data = $.map(this.find('option'), function(x, i) { 
			if (x.selected) {
				selectedValue = x.value;
				selectedText = x.innerHTML;
			}
			
			return '<div class="ui-state-default" data-value="' + x.value + '" ' +
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
		
		var $textWrap = $ret.append('<div/>').children().first();
		$textWrap.css({ position: 'relative' });
		$textWrap.append('<input type="text" value="' + selectedText + '" />');
		var $text = $textWrap.find(':text').css({display:'inline', width:this.width()});
		$textWrap.append('<div/>');
		var $button = $textWrap.find('div').addClass('ui-icon ui-icon-carat-1-s ui-state-default');
		$button.wrap('<div/>').parent().css(
			{
				position:'relative', right:'20px', top:'4px'
			}).wrap('<div/>').parent().css({
				display:'inline', position:'absolute' 
			});	

		$ret.append('<input type="hidden" value="' + selectedValue + '" name="'+name+'" />');
		var $value = $ret.find('input[type="hidden"]');

		$ret.append('<div class="ui-combo-editable-options"/>');
		var $options = $ret.find('div.ui-combo-editable-options');
		$options.append(elements);
		$options.find('div').css({display:'block', cursor:'default'})
			.hover(function() {
				$(this).addClass('ui-state-hover');
			}, function() {
				$(this).removeClass('ui-state-hover');
			}).css({ width: this.width() });

		$options.hide();
		$button.click(function() {
			if ($options.is(':visible'))
				$options.hide();
			else
				$options.show();
		}).hover(function() {
			$(this).addClass('ui-state-hover');
		}, function() {
			$(this).removeClass('ui-state-hover');
		});


		$options.find('div').click(function() {
			$options.hide();
			$text.val($(this).text());
			$value.val($(this).data('data-value'));
		});

		this.replaceWith($ret);
		return $ret;
	}

})(jQuery);
