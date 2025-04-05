
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
					'deep-blue': '#1A1F3C',
					'midnight': '#15122C',
					'purple-dark': '#2A1B3D',
					'purple-light': '#8265A7',
					'glowing-blue': '#44DDFF',
					'glowing-purple': '#9b87f5',
					'starlight': '#E0E0E0',
					'enchanted': '#5B247A',
				},
				wizardry: {
					'parchment': '#F8F4E3',
					'gold': '#D4AF37',
					'dark-gold': '#B3901E',
					'crimson': '#DC143C',
					'deep-crimson': '#8B0000',
					'deep-blue': '#1A1F3C',
					'midnight': '#15122C',
					'purple': '#5D3E8D',
					'navy': '#2E3A59',
					'glow': '#9b87f5',
					'mist': '#CCCCFF',
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
				'sway': {
					'0%, 100%': { transform: 'rotate(-3deg)' },
					'50%': { transform: 'rotate(3deg)' }
				},
				'candle-flicker': {
					'0%, 100%': { opacity: '1', filter: 'brightness(1)' },
					'25%': { opacity: '0.8', filter: 'brightness(0.8)' },
					'50%': { opacity: '0.9', filter: 'brightness(1.2)' },
					'75%': { opacity: '0.7', filter: 'brightness(0.9)' }
				},
				'glow': {
					'0%, 100%': { filter: 'drop-shadow(0 0 5px rgba(138, 43, 226, 0.5))' },
					'50%': { filter: 'drop-shadow(0 0 15px rgba(138, 43, 226, 0.8))' }
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
				'pulse': {
					'0%, 100%': { boxShadow: '0 0 5px rgba(138, 43, 226, 0.5)' },
					'50%': { boxShadow: '0 0 15px rgba(138, 43, 226, 0.8)' }
				},
				'fog-drift': {
					'0%': { backgroundPosition: '0% 50%' },
					'100%': { backgroundPosition: '100% 50%' }
				},
				'particles-float': {
					'0%': { transform: 'translateY(0) rotate(0deg)' },
					'50%': { transform: 'translateY(-15px) rotate(5deg)' },
					'100%': { transform: 'translateY(0) rotate(0deg)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'float': 'float 6s ease-in-out infinite',
				'sway': 'sway 6s ease-in-out infinite',
				'candle-flicker': 'candle-flicker 3s infinite',
				'glow': 'glow 2s ease-in-out infinite',
				'spin-slow': 'spin-slow 10s linear infinite',
				'shimmer': 'shimmer 3s infinite linear',
				'stars-twinkle': 'stars-twinkle 3s ease-in-out infinite',
				'flicker': 'flicker 3s infinite alternate',
				'pulse': 'pulse 4s infinite',
				'fog-drift': 'fog-drift 30s infinite alternate linear',
				'particles-float': 'particles-float 8s infinite ease-in-out'
			},
			backgroundImage: {
				'magical-gradient': 'linear-gradient(to right bottom, rgb(93, 62, 141), rgb(42, 27, 61))',
				'glow-border': 'linear-gradient(90deg, #5D3E8D, #2A1B3D, #5D3E8D)',
				'enchanted-card': 'linear-gradient(to bottom, rgba(93, 62, 141, 0.8), rgba(42, 27, 61, 0.9))',
				'starfield': 'radial-gradient(circle, transparent 20%, rgba(42, 27, 61, 0.9) 70%)',
				'wizardry-dark': 'linear-gradient(to bottom, #2A1B3D, #15122C)',
				'mystical-card': 'linear-gradient(to bottom, rgba(93, 62, 141, 0.7), rgba(42, 27, 61, 0.9))',
				'glowing-border': 'linear-gradient(90deg, #5D3E8D, #2A1B3D, #5D3E8D)',
				'scroll-texture': 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z\' fill=\'%235D3E8D\' fill-opacity=\'0.05\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
