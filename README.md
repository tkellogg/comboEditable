In Windows UI design there is a concept of an editable combo box/drop down list. However, I haven't been able to find a free version for the web. This editable combo box is a jQuery plugin that degrades nicely into a regular `<select>` element if scripts are not enabled. 

Demo is available here: http://tkellogg.github.com/comboEditable

Usage
-----------------

Link in jQuery UI CSS, and include scripts for jQuery and comboEditable.js

```html
<head>
	<link rel="stylesheet" type="text/css" href="public/style/jquery-ui-1.8.16.custom.css">
	<script type="text/javascript" src="public/jquery-1.6.2.min.js"></script>
	<script type="text/javascript" src="public/comboEditable.js"></script>
</head>
```

Populate a regular HTML combo box. For ASP.NET, a `asp:DropDownList` works

```html
<select id="fruit-choices">
	<option>apples</option>
	<option>oranges</option>
	<option>pineapples</option>
</select>
```

Create the editable combo box on page load

```javascript
$(function() {
	$('#fruit-choices').comboEditable();
});
```

Compatibility
-----------------

It has been tested extensively in Chrome and IE9. Both of these are entirely functional but look a little different in each.
There is no reason why it shouldn't work in FireFox and IE6-8. 

Requirements
-----------------

To display images and allow customized style, I use jQuery UI CSS classes heavily. If you don't use jQuery UI,
you can still use this by defining these CSS classes:

* `ui-icon` & `ui-icon-triangle-1-s` - 16x16 px div with a background image (a downward pointing arrow)
* `ui-corner-right` - rounded corners on the right side of the drop down icon
* `ui-state-default` - items from the drop down list that are not selected
* `ui-state-hover` - item from the drop down list that is being hovered over by the mouse

This page of the jQuery UI documentation describes the CSS classes in greater detail: http://jqueryui.com/docs/Theming/API


License
-----------------

You have your choice of MIT or GPL version 2. Most people will want to use the MIT license, but if for some reason you need a GPL license, that is available as well.

* [MIT License](http://www.opensource.org/licenses/mit-license.php)
* [GPLv2 License](http://www.gnu.org/licenses/gpl-2.0.html)
