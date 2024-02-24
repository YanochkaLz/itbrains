const showAnimation = () => {
	function onEntry(entry) {
		entry.forEach(change => {
			console.log(change.isIntersecting);
			if (change.isIntersecting) {
				change.target.classList.add('element-show');
			}
		});
	}

	let options = {
		threshold: [0],
	};
	let observer = new IntersectionObserver(onEntry, options);
	let elements = document.querySelectorAll('.element-animation');

	for (let elm of elements) {
		observer.observe(elm);
	}
};

const animateTyping = typingText => {
	if (typingText.classList.contains('typing-animation')) {
		typingText.classList.remove('typing-animation');
	} else {
		typingText.classList.add('typing-animation');
	}
};


window.onload = () => {
	const header = document.querySelector('.header');
	const additionalHeader = document.querySelector('.header_v2');
	const scrollText1 = document.querySelector('.specialist-text');
	const scrollText2 = document.querySelector('.try-text');
	const typingText = document.querySelector('.marathon_submit__text');
	const collapsibleItems = [...document.querySelectorAll('.faq_item__collapsible')];

	let scrollTextSize1 = 0;
	let scrollTextSize2 = 0;
	let lastScrollPosition = window.scrollY;
	const headerHeight = header.offsetHeight;

	collapsibleItems.forEach(item => {
		item.addEventListener('click', () => {
			item.classList.toggle('active');
			let content = item.nextElementSibling;
			if (content.style.maxHeight) {
				content.style.maxHeight = null;
			} else {
				content.style.maxHeight = content.scrollHeight + 'px';
			}
		});
	});

	showAnimation();

	setInterval(() => {
		animateTyping(typingText);
	}, 3000);

	window.addEventListener('scroll', function () {
		const scrollPosition = window.scrollY;
		const scrollSize = scrollPosition - lastScrollPosition;
		lastScrollPosition = scrollPosition;

		if (scrollPosition >= headerHeight) {
			additionalHeader.classList.remove('hidden');
		} else {
			additionalHeader.classList.add('hidden');
		}

		const bounding1 = scrollText1.getBoundingClientRect();
		const bounding2 = scrollText2.getBoundingClientRect();
		if (bounding1.top < window.innerHeight / 1.4 && bounding1.top > -window.innerHeight / 2) {
			scrollTextSize1 -= scrollSize;
			scrollText1.style.transform = `translateX(${scrollTextSize1}px)`;
		}
		if (bounding2.top < window.innerHeight / 1.4 && bounding2.top > -window.innerHeight / 2) {
			scrollTextSize2 -= scrollSize / 2;
			scrollText2.style.transform = `translateX(${scrollTextSize2}px)`;
		}
	});
};
