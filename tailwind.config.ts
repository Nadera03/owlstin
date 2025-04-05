
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				cinzel: ['Cinzel', 'serif'],
				sans: ['Inter', 'sans-serif'],
				gothic: ['"MedievalSharp"', 'cursive'],
				vampire: ['"Pirata One"', 'cursive'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				magical: {
					'deep-purple': '#2A1B3D',
					'midnight': '#151226',
					'glowing-teal': '#44DDDD',
					'starlight': '#E0E0E0',
					'purple-light': '#8265A7',
					'purple-dark': '#1D1135',
					'enchanted': '#5B247A',
				},
				castlevania: {
					'blood': '#8B0000',
					'dark': '#1A1F2C',
					'stone': '#4A4A4A',
					'gold': '#D4AF37',
					'parchment': '#F5F5DC',
					'shadow': '#221F26',
					'moonlight': '#E6E6FA',
					'flame': '#FF4500',
					'mist': '#CCCCCC',
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' }
				},
				'glow': {
					'0%, 100%': { filter: 'drop-shadow(0 0 5px rgba(68, 221, 221, 0.5))' },
					'50%': { filter: 'drop-shadow(0 0 15px rgba(68, 221, 221, 0.8))' }
				},
				'spin-slow': {
					'0%': { transform: 'rotate(0deg)' },
					'100%': { transform: 'rotate(360deg)' }
				},
				'shimmer': {
					'0%': { backgroundPosition: '-40rem 0' },
					'100%': { backgroundPosition: '40rem 0' }
				},
				'stars-twinkle': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.5' }
				},
				'flicker': {
					'0%, 100%': { opacity: '1' },
					'25%': { opacity: '0.8' },
					'50%': { opacity: '0.6' },
					'75%': { opacity: '0.9' }
				},
				'blood-pulse': {
					'0%, 100%': { boxShadow: '0 0 5px rgba(139, 0, 0, 0.5)' },
					'50%': { boxShadow: '0 0 15px rgba(139, 0, 0, 0.8)' }
				},
				'fog-drift': {
					'0%': { backgroundPosition: '0% 50%' },
					'100%': { backgroundPosition: '100% 50%' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'float': 'float 6s ease-in-out infinite',
				'glow': 'glow 2s ease-in-out infinite',
				'spin-slow': 'spin-slow 10s linear infinite',
				'shimmer': 'shimmer 3s infinite linear',
				'stars-twinkle': 'stars-twinkle 3s ease-in-out infinite',
				'flicker': 'flicker 3s infinite alternate',
				'blood-pulse': 'blood-pulse 4s infinite',
				'fog-drift': 'fog-drift 30s infinite alternate linear'
			},
			backgroundImage: {
				'magical-gradient': 'linear-gradient(to right bottom, rgb(42, 27, 61), rgb(29, 17, 53))',
				'glow-border': 'linear-gradient(90deg, #44DDDD, #8265A7, #44DDDD)',
				'enchanted-card': 'linear-gradient(to bottom, rgba(42, 27, 61, 0.8), rgba(29, 17, 53, 0.9))',
				'starfield': 'radial-gradient(circle, transparent 20%, rgba(29, 17, 53, 0.9) 70%)',
				'castle-stone': 'linear-gradient(to bottom, rgba(74, 74, 74, 0.8), rgba(34, 31, 38, 0.9))',
				'blood-veil': 'linear-gradient(to right, rgba(139, 0, 0, 0.6), rgba(34, 31, 38, 0.8))',
				'moonlit-night': 'linear-gradient(to bottom, #1A1F2C, #221F26)',
				'parchment': 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z\' fill=\'%23F5F5DC\' fill-opacity=\'0.1\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
