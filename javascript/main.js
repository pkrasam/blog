document.addEventListener('DOMContentLoaded', ()=> {

const footer = document.getElementById('footer')
const footerHeader = document.getElementsByClassName('header')
const footerLinks = document.getElementsByClassName('links')

const learnMenuToggle = document.getElementById('learnMenuToggle')
const developMenuToggle = document.getElementById('developMenuToggle')
const communityMenuToggle = document.getElementById('communityMenuToggle')

// functions

const open = (target) => {

	const links = target.nextElementSibling
	const caretDirection = target.childNodes[3].childNodes[0].src.split('/')[5]
	let targetCaretImg = target.childNodes[3].childNodes[0]
	
	switch(caretDirection) {
		case 'up-caret.svg':
			learnMenuToggle.src = '/img/footer/up-caret.svg'
			developMenuToggle.src = '/img/footer/up-caret.svg'
			communityMenuToggle.src = '/img/footer/up-caret.svg'
			targetCaretImg.src = '/img/footer/down-caret.svg'
		break
		case 'down-caret.svg':
			learnMenuToggle.src = '/img/footer/up-caret.svg'
			developMenuToggle.src = '/img/footer/up-caret.svg'
			communityMenuToggle.src = '/img/footer/up-caret.svg'
			targetCaretImg.src = '/img/footer/up-caret.svg'
		default:
		break
	}

	if(links.classList.contains('open')) {
		return links.classList.remove('open')
	}

	Array.prototype.forEach.call( footerLinks, function(item){
		item.classList.remove('open')
	})

	links.classList.add('open')
}

window.scrollToSpot = (elm) => {
	const element = document.getElementById(elm.id)
	element.scrollIntoView()
}

// event listeners

footer.addEventListener('click', function(e) {

	const target = e.target

	if (target.classList.contains('header')) {
		open( target )
	} else if ( target.parentElement.classList.contains('header')) {
		open(target.parentElement)
	}

})

})