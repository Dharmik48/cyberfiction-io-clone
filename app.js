const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

canvas.height = 1080
canvas.width = 1920

let imgPaths = []
const FRAMES = 300
let frame = { frame: 1 }

function getImagePaths() {
	for (let i = 1; i <= FRAMES; i++) {
		imgPaths.push(`imgs/male${i}.png`)
	}
}
getImagePaths()

let imgs = []
function getImages() {
	imgPaths.forEach(path => {
		const img = new Image()
		img.src = path
		img.style.display = 'block'
		imgs.push(img)
	})
}
getImages()

gsap.registerPlugin(ScrollTrigger)

gsap.to(frame, {
	frame: FRAMES - 1,
	snap: 'frame',
	// ease: 'none',
	scrollTrigger: {
		trigger: 'canvas',
		start: 'top top',
		end: '600% top',
		scrub: true,
	},
	onUpdate: () => {
		render()
		// canvas.style.backgroundImage = `url(${imgPaths[frame.frame]})`
	},
})

function render() {
	ctx.clearRect(0, 0, canvas.width, canvas.height)
	ctx.drawImage(imgs[frame.frame], 0, 0)
}

imgs[1].onload = render

window.addEventListener('resize', () => {
	// canvas.height = window.innerHeight
	// canvas.width = window.innerWidth
	render()
})
