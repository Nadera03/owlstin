
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
				sans: ['Montserrat', 'sans-serif'],
				display: ['Montserrat', 'sans-serif'],
				headline: ['Montserrat', 'sans-serif'],
				mono: ['"Space Mono"', 'monospace'],
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
				archive: {
					'base': '#121212',
					'text': '#F5F5F5',
					'accent': '#8B0000', // Blood red
					'secondary': '#292929',
					'border': '#333333',
					'muted': '#757575',
				},
				biome: {
					'tropical': '#0B6623',     // Deep jungle green
					'savanna': '#D4AC0D',      // Golden savanna
					'tundra': '#A5F2F3',       // Icy blue tundra
					'desert': '#D2B48C',       // Desert sand
					'forest': '#228B22',       // Forest green
					'coral': '#FF7F50',        // Coral reef
					'swamp': '#556B2F',        // Swampy olive
					'volcanic': '#8B0000',     // Volcanic red
					'meadow': '#7CFC00',       // Bright meadow
					'cave': '#36454F',         // Dark cave
					'jungle-dark': '#0F4C28',  // Dark jungle
					'wood': '#855E42',         // Wood brown
					'vine': '#32CD32',         // Vine green
					'moss': '#8A9A5B',         // Moss green
					'soil': '#3B2F2F',         // Dark soil
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
				'text-slide': {
					'0%, 100%': { transform: 'translateX(0)' },
					'50%': { transform: 'translateX(-5%)' }
				},
				'marquee': {
					'0%': { transform: 'translateX(0)' },
					'100%': { transform: 'translateX(-100%)' }
				},
				'vine-grow': {
					'0%': { height: '0%' },
					'100%': { height: '100%' }
				},
				'leaf-sway': {
					'0%, 100%': { transform: 'rotate(-5deg)' },
					'50%': { transform: 'rotate(5deg)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'float': 'float 6s ease-in-out infinite',
				'sway': 'sway 6s ease-in-out infinite',
				'text-slide': 'text-slide 10s infinite linear',
				'marquee': 'marquee 25s infinite linear',
				'vine-grow': 'vine-grow 2s ease-out forwards',
				'leaf-sway': 'leaf-sway 4s ease-in-out infinite'
			},
			backgroundImage: {
				'noise': "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cfilter id='a' x='0' y='0'%3E%3CfeTurbulence baseFrequency='.005' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23a)' opacity='.15'/%3E%3C/svg%3E\")",
				'jungle-texture': "url('/lovable-uploads/ecba9356-4aea-4985-9b80-664406c127e5.png')",
				'tropical': "linear-gradient(to bottom, rgba(11, 102, 35, 0.7), rgba(11, 102, 35, 0.9)), url('/lovable-uploads/e34b2e85-9c2c-4b00-9071-59c984532419.png')",
				'savanna': "linear-gradient(to bottom, rgba(212, 172, 13, 0.7), rgba(212, 172, 13, 0.9)), url('/lovable-uploads/d3761d88-e647-4000-acfc-f5a546ace41e.png')",
				'tundra': "linear-gradient(to bottom, rgba(165, 242, 243, 0.7), rgba(165, 242, 243, 0.9)), url('/lovable-uploads/3201a93a-8f0b-4335-b759-cacc4899d1b1.png')",
				'desert': "linear-gradient(to bottom, rgba(210, 180, 140, 0.7), rgba(210, 180, 140, 0.9)), url('/lovable-uploads/40c42ac0-e023-4c0a-9cce-67c89caa3fb2.png')",
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
