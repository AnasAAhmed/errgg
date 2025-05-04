/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			keyframes: {
				fadeInUp: {
					'0%': { opacity: '0', transform: 'translateY(20px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' },
				},
				fadeIn: {
					'0%': { opacity: '0', transform: 'translateY(30px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' },
				},
			},
			animation: {
				fadeInUp: 'fadeInUp 0.3s ease-out forwards',
				fadeIn: 'fadeIn 0.6s ease-out forwards',
			},
		},
		screens: {
			'xsm': '375px',
			// => @media (min-width: 480px) { ... }

			'sm': '640px',
			// => @media (min-width: 640px) { ... }

			'md': '786px',
			// => @media (min-width: 786px) { ... }

			'lg': '1024px',
			// => @media (min-width: 1024px) { ... }

		},
	},
	plugins: [],
}