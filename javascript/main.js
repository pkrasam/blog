document.addEventListener('DOMContentLoaded', () => {

const footer = document.getElementById('footer')
const footerHeader = document.getElementsByClassName('header')
const footerLinks = document.getElementsByClassName('links')
const footerCarets = document.getElementsByClassName('footer-caret')
let lastFooterTarget = null

// functions

const setCaretOrientationToClosed = () => {
	for (keys in footerCarets) {
		footerCarets[keys].src = '../img/footer/up-caret.svg'
	}
}

const open = (target) => {

	if (target === lastFooterTarget) {
		target.lastElementChild.children[0].src = '/img/footer/up-caret.svg'
	}

	const links = target.nextElementSibling

	if(links.classList.contains('open')) {
		return links.classList.remove('open')
	}

	Array.prototype.forEach.call(footerLinks, (item) => {
		item.classList.remove('open')
	})

	setCaretOrientationToClosed()
	links.classList.add('open')
	target.lastElementChild.children[0].src = '/img/footer/down-caret.svg'
}

window.scrollToSpot = (elm) => {
	const element = document.getElementById(elm.id)
	element.scrollIntoView()
}

// event listeners

footer.addEventListener('click', (e) => {

	const target = e.target

	if (target.classList.contains('header')) {
		open(target)
		lastFooterTarget = target
	} else if (target.parentElement.classList.contains('header')) {
		open(target.parentElement)
		lastFooterTarget = target.parentElement
	}


})

})