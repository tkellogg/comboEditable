/**
 * @license comboEditable.js
 * 
 * Copyright 2011, Tim Kellogg
 * Dual licensed under the MIT or GPL version 2
 *
 * https://github.com/tkellogg/comboEditable
 */
(function($) {
	var optionsIdentifierClass = 'ui-combo-editable-options';
	var nIconAdjustment = 2;
	var iconAdjustment = '2px';
	
	// NOTE: I'm aware that user-agent sniffing is despicable, but how else
	// can I make these adjustments without seriously kludging the code?
	if ($.browser.msie) {
		var iconSize = '22px';
		var topAdjustment = '1px';
	}
	else {
		var iconSize = '20px';
		var topAdjustment = '2px';
	}

	var ComboBox = function(el, opts) {
		this.el = el;
		this.name = el.attr('name') ? el.attr('name') : '';
		this.selectedValue = null
		this.selectedText = null;
		this.elements = this.getOptionValues(el.find('option'));
		this.$ret = $('<div/>').css({ 'display': el.css('display'), width: el.width() });
		this.opts = this.processOptions(opts, el);
	};

	$.extend(ComboBox.prototype, {
		
		processOptions: function(opts, el) {
			var ret = {};
			if (opts && opts.mode === 'text')
				ret.valueAsText = true;
			return ret;
		},
		
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
			var $table = $('<table><tr><td/></tr></table>');
			var $td = $table.find('td');
			$td.append('<input type="text" value="' + this.selectedText + '" name="text-'+this.name+'" />');
			this.$text = $td.find(':text')
				.css({display:'inline', width:this.el.width() - 20 });
			$textWrap.append($table);
			this.$textWrap = $textWrap;
		},

		makeIcon: function() {
			this.$textWrap.append('<div/>');
			this.$button = $('<div class="ui-icon ui-icon-triangle-1-s ui-state-default ui-corner-right"/>')
				.css({ height:iconSize, width:iconSize });
			
			var $td = $('<td/>').append(this.$button).appendTo(this.$textWrap.find('tr'));
			this.$textWrap.find('td').css('padding', '0px 0px 0px 0px');
			/*
			this.$button.wrap('<div/>').parent().css(
				{
					position:'relative', top:topAdjustment, right:'1px' 
				}).wrap('<div/>').parent().css({
					display:'inline', position:'absolute' 
				});	
				*/
		},

		addHiddenField: function() {
			this.$ret.append('<input type="hidden" value="' + this.selectedValue + '" name="'+this.name+'" />');
			this.$value = this.$ret.find('input[type="hidden"]');
		},

		stylizeOptions: function() {
			this.$ret.append('<div class="'+optionsIdentifierClass +'"/>');
			var $options = this.$ret.find('div.'+optionsIdentifierClass+'');
			$options.append(this.elements);
			$options.css({ 'z-index':1, position: 'absolute' });
			$options.find('div').css({display:'block', cursor:'default' })
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
			this.$ret.blur(function() { $options.hide(); }).attr('tabindex', '0').css({outline:'none'});
			this.$ret.keyup(function(e) {
				// if they hit ESC
				if (e.which === 27)
					$options.hide();	
			});

			var self = this;
			$options.find('div').click(function() {
				$options.hide();
				self.$text.val($(this).text());
				self.$value.val($(this).data('data-value'));
			});
		}, 

		setFormValues: function() {
			if (this.opts.valueAsText) {

			}
			else {
				// setup value select for each option
				this.$options.find('div').click($.proxy(function(e) {
					var val = $(e.target).attr('data-value');
					this.$value.val(val);
				}, this));

				// setup value deselect when typing
				this.$text.keyup($.proxy(function() {
					this.$value.val(undefined);
				}, this));
			}
		},

		stretchIcon: function() {
			var button = this.$button;
			function resize(p) {
				var baseProperty = 'background-position-';
				var position = button.css(baseProperty + p);
				if (position) {
					var x = parseInt(position.replace(/(-?\d+)px/, '$1'));
					button.css(baseProperty + p, (x + nIconAdjustment) + 'px');
				}
			};
			resize('x');
			resize('y');
		}
	});

	$.fn['comboEditable'] = function(opts) {
		var cb = new ComboBox(this, opts);
		cb.makeTextBox();
		cb.makeIcon();
		cb.addHiddenField();
		cb.stylizeOptions();
		cb.stylizeIcon();
		cb.wireupHideActions();
		cb.setFormValues();

		var id = this.attr('id');
		this.replaceWith(cb.$ret);
		cb.$text.attr('id', id);
		//cb.stretchIcon();
		$('.ui-icon-triangle-1-s').css('background-position', '-62px -14px')
		return cb.$ret;
	}

})(jQuery);
