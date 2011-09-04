/**
 * @license comboEditable.js
 * 
 * Copyright 2011, Tim Kellogg
 * Dual licensed under the MIT or GPL version 2
 *
 * https://github.com/tkellogg/comboEditable
 */
(function($) {

	var ComboBox = function(el) {
		this.el = el;
		this.name = el.attr('name') ? el.attr('name') : '';
		this.selectedValue = null
		this.selectedText = null;
		this.elements = this.getOptionValues(el.find('option'));
		this.$ret = $('<div/>');
	};

	$.extend(ComboBox.prototype, {
		
		getOptionValues: function() {
			var data = this._mapOptionsToElements();
			if (!this.selectedText) {
				this.selectedValue = this.el.find('option').first().val();
				this.selectedText = this.el.find('option').first().text();
			}

			var elements = '';
			$.each(data, function(i, x) { elements += x; });

			return elements;
		},

		_mapOptionsToElements: function() {
			var data = $.map(this.el.find('option'), $.proxy(function(x, i) { 
				if (x.selected) {
					this.selectedValue = x.value;
					this.selectedText = x.innerHTML;
				}
				
				return '<div class="ui-state-default" data-value="' + x.value + '" ' +
					+ (x.selected ? 'selected' : '') + '>' 
					+ x.innerHTML + '</div>';
			}, this));
			return data;
		},

		makeTextBox: function() {
			var $textWrap = this.$ret.append('<div/>').children().first();
			$textWrap.css({ position: 'relative' });
			$textWrap.append('<input type="text" value="' + this.selectedText + '" />');
			this.$text = $textWrap.find(':text').css({display:'inline', width:this.el.width()});
			this.$textWrap = $textWrap;
		},

		makeIcon: function() {
			this.$textWrap.append('<div/>');
			this.$button = this.$textWrap.find('div')
				.addClass('ui-icon ui-icon-carat-1-s ui-state-default')
				.css({ margin:'1px 1px 1px 1px' });

			this.$button.wrap('<div/>').parent().addClass('ui-state-default').css(
				{
					position:'relative', top:'2px', right:'1px' 
				}).wrap('<div/>').parent().css({
					display:'inline', position:'absolute' 
				});	
		},

		addHiddenField: function() {
			this.$ret.append('<input type="hidden" value="' + this.selectedValue + '" name="'+this.name+'" />');
			this.$value = this.$ret.find('input[type="hidden"]');
		},

		stylizeOptions: function() {
			this.$ret.append('<div class="ui-combo-editable-options"/>');
			var $options = this.$ret.find('div.ui-combo-editable-options');
			$options.append(this.elements);
			$options.find('div').css({display:'block', cursor:'default'})
				.hover(function() {
					$(this).addClass('ui-state-hover');
				}, function() {
					$(this).removeClass('ui-state-hover');
				}).css({ width: this.el.width() });
			this.$options = $options;	
		},

		stylizeIcon: function() {
			var $ops = this.$options;
			$ops.hide();
			this.$button.click(function() {
				if ($ops.is(':visible'))
					$ops.hide();
				else
					$ops.show();
			}).hover(function() {
				$(this).addClass('ui-state-hover');
			}, function() {
				$(this).removeClass('ui-state-hover');
			});
		},

		wireupHideActions: function() {
			var $options = this.$options;
			this.$ret.blur(function() { $options.hide(); }).attr('tabindex', '999').css({outline:'none'});
			this.$ret.keyup(function(e) {
				if (e.which === 27)
					$options.hide();	
			});

			var self = this;
			$options.find('div').click(function() {
				$options.hide();
				self.$text.val($(this).text());
				self.$value.val($(this).data('data-value'));
			});
		}

	});

	$.fn.comboEditable = function(opts) {
		var cb = new ComboBox(this);
		cb.makeTextBox();
		cb.makeIcon();
		cb.addHiddenField();
		cb.stylizeOptions();
		cb.stylizeIcon();
		cb.wireupHideActions();

		var id = this.attr('id');
		this.replaceWith(cb.$ret);
		cb.$text.attr('id', id);
		return cb.$ret;
	}

})(jQuery);
