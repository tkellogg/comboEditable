In Windows UI design there is a concept of an editable combo box/drop down list. However, I haven't been able to find a free version for the web. This editable combo box is a jQuery plugin that degrades nicely into a regular `<select>` element if scripts are not enabled. 

Usage
-----------------

Link in jQuery UI CSS, and include scripts for jQuery and comboEditable.js

```
	<head>
		<link rel="stylesheet" type="text/css" href="public/style/jquery-ui-1.8.16.custom.css">
		<script type="text/javascript" src="public/jquery-1.6.2.min.js"></script>
		<script type="text/javascript" src="public/comboEditable.js"></script>
	</head>
```

Populate a regular HTML combo box. For ASP.NET, a `asp:DropDownList` works

```
	<select id="fruit-choices">
		<option>apples</option>
		<option>oranges</option>
		<option>pineapples</option>
	</select>
```

Create the editable combo box on page load

```
	<script type="text/javascript">
		$(function() {
			$('#fruit-choices').comboEditable();
		});
	</script>
```


License
-----------------

You have your choice of MIT or GPL version 2. Most people will want to use the MIT license, but if for some reason you need a GPL license, that is available as well.

* [MIT License](http://www.opensource.org/licenses/mit-license.php)
* [GPLv2 License](http://www.gnu.org/licenses/gpl-2.0.html)
