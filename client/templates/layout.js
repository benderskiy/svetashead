Template.layout.rendered = function() {
	$('header .header-link')
		.removeClass('active')
			.find('a[href="/' + Session.get('activeLink') + '"]')
			.parent()
			.addClass('active');
};