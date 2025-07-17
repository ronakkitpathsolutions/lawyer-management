import { createTheme, localStorageColorSchemeManager } from "@mantine/core";
import { colors } from "./colors";

export const theme = createTheme({
  colors,
  primaryColor: 'brand',
  primaryShade: { light: 6, dark: 8 },
  
  // Modern radius and spacing
  defaultRadius: "md",
  cursorType: "pointer",
  
  // Enhanced breakpoints
  breakpoints: { 
    xs: '36em',
    sm: '48em', 
    md: '62em', 
    lg: '75em', 
    xl: '88em',
    xxl: '96em' 
  },

  // Modern spacing scale
  spacing: {
    xs: '0.5rem',
    sm: '0.75rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    xxl: '3rem',
  },

  // Typography - Enhanced with better font hierarchy
  fontFamily: "'Inter Variable', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI Variable', 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif",
  fontFamilyMonospace: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', Monaco, 'Roboto Mono', monospace",
  headings: {
    fontFamily: "'Inter Variable', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI Variable', 'Segoe UI', Roboto, sans-serif",
    fontWeight: '700',
    textWrap: 'balance',
    sizes: {
      h1: { fontSize: '2.75rem', lineHeight: '1.2', fontWeight: '800' },
      h2: { fontSize: '2.25rem', lineHeight: '1.25', fontWeight: '700' },
      h3: { fontSize: '1.75rem', lineHeight: '1.3', fontWeight: '700' },
      h4: { fontSize: '1.375rem', lineHeight: '1.35', fontWeight: '600' },
      h5: { fontSize: '1.125rem', lineHeight: '1.4', fontWeight: '600' },
      h6: { fontSize: '1rem', lineHeight: '1.5', fontWeight: '600' },
    }
  },

  // Modern shadows with enhanced depth
  shadows: {
    xs: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    sm: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
    glow: '0 0 20px rgb(42 68 142 / 0.15)',
  },

  // Component overrides with modern styling
  components: {
    // Button overrides - Enhanced with modern variants
    Button: {
      defaultProps: {
        size: 'md',
        radius: 'md',
      },
      styles: {
        root: {
          fontWeight: 600,
          fontSize: '0.875rem',
          transition: 'all 200ms cubic-bezier(0.4, 0, 0.2, 1)',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: '-100%',
            width: '100%',
            height: '100%',
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
            transition: 'left 0.5s',
          },
          '&:hover': {
            transform: 'translateY(-2px)',
            '&::before': {
              left: '100%',
            }
          },
          '&:active': {
            transform: 'translateY(0)',
          }
        }
      },
      variants: {
        gradient: (theme) => ({
          root: {
            background: `linear-gradient(135deg, ${theme.colors.brand[6]} 0%, ${theme.colors.gold[6]} 100%)`,
            border: 'none',
            color: theme.white,
            boxShadow: '0 4px 15px 0 rgba(42, 68, 142, 0.3)',
            '&:hover': {
              background: `linear-gradient(135deg, ${theme.colors.brand[7]} 0%, ${theme.colors.gold[7]} 100%)`,
              boxShadow: '0 8px 25px 0 rgba(42, 68, 142, 0.4)',
            }
          }
        }),
        elegant: (theme) => ({
          root: {
            background: theme.white,
            border: `2px solid ${theme.colors.neutral[3]}`,
            color: theme.colors.neutral[8],
            backdropFilter: 'blur(10px)',
            '&:hover': {
              background: theme.colors.neutral[0],
              borderColor: theme.colors.brand[6],
              color: theme.colors.brand[7],
              boxShadow: '0 8px 25px 0 rgba(42, 68, 142, 0.15)',
            }
          }
        }),
        glass: (theme) => ({
          root: {
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            color: theme.colors.neutral[8],
            '&:hover': {
              background: 'rgba(255, 255, 255, 0.2)',
            }
          }
        })
      }
    },

    // Card overrides - Modern card design with enhanced interactions
    Card: {
      defaultProps: {
        shadow: 'md',
        radius: 'lg',
        padding: 'xl',
        withBorder: true,
      },
      styles: {
        root: {
          background: 'linear-gradient(145deg, #ffffff 0%, #fafafa 100%)',
          border: '1px solid rgba(228, 228, 231, 0.8)',
          transition: 'all 400ms cubic-bezier(0.23, 1, 0.32, 1)',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '3px',
            background: `linear-gradient(90deg, ${colors.brand[6]}, ${colors.gold[6]})`,
            transform: 'scaleX(0)',
            transformOrigin: 'left',
            transition: 'transform 300ms ease',
          },
          '&:hover': {
            transform: 'translateY(-8px) scale(1.02)',
            boxShadow: '0 32px 64px -12px rgba(0, 0, 0, 0.15)',
            '&::before': {
              transform: 'scaleX(1)',
            }
          }
        }
      }
    },

    // Badge overrides - Enhanced status badges
    Badge: {
      defaultProps: {
        radius: 'md',
        size: 'sm',
      },
      styles: {
        root: {
          fontWeight: 600,
          fontSize: '0.75rem',
          textTransform: 'none',
          letterSpacing: '0.025em',
          padding: '0.5rem 0.75rem',
        }
      },
      variants: {
        status: (theme, { color }) => ({
          root: {
            background: `linear-gradient(135deg, ${theme.colors[color]?.[1] || theme.colors.neutral[1]}, ${theme.colors[color]?.[0] || theme.colors.neutral[0]})`,
            color: theme.colors[color]?.[8] || theme.colors.neutral[8],
            border: `1px solid ${theme.colors[color]?.[3] || theme.colors.neutral[3]}`,
            boxShadow: `0 2px 8px ${theme.colors[color]?.[2] || theme.colors.neutral[2]}`,
          }
        })
      }
    }
  },

  // Global styles with modern animations and utilities
  globalStyles: (theme) => ({
    '*, *::before, *::after': {
      boxSizing: 'border-box',
    },
    body: {
      background: `linear-gradient(135deg, ${theme.colors.neutral[0]} 0%, #fafafa 100%)`,
      color: theme.colors.neutral[8],
      lineHeight: 1.6,
      fontFamily: theme.fontFamily,
    },
    
    // Utility classes
    '.lawyer-dashboard-gradient': {
      background: `linear-gradient(135deg, ${theme.colors.brand[6]} 0%, ${theme.colors.gold[6]} 100%)`,
    },
    '.lawyer-dashboard-gradient-text': {
      background: `linear-gradient(135deg, ${theme.colors.brand[6]} 0%, ${theme.colors.gold[6]} 100%)`,
      backgroundClip: 'text',
      WebkitBackgroundClip: 'text',
      color: 'transparent',
    },
    '.lawyer-dashboard-card': {
      background: 'linear-gradient(145deg, #ffffff 0%, #fafafa 100%)',
      border: `1px solid ${theme.colors.neutral[2]}`,
      borderRadius: theme.radius.lg,
      boxShadow: theme.shadows.md,
      transition: 'all 400ms cubic-bezier(0.23, 1, 0.32, 1)',
      position: 'relative',
      overflow: 'hidden',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '3px',
        background: `linear-gradient(90deg, ${theme.colors.brand[6]}, ${theme.colors.gold[6]})`,
        transform: 'scaleX(0)',
        transformOrigin: 'left',
        transition: 'transform 300ms ease',
      },
      '&:hover': {
        transform: 'translateY(-8px) scale(1.02)',
        boxShadow: '0 32px 64px -12px rgba(0, 0, 0, 0.15)',
        '&::before': {
          transform: 'scaleX(1)',
        }
      }
    }
  }),
});

export const defaultColorScheme = "light"; // light, dark and auto

export const colorSchemeManager = localStorageColorSchemeManager({
  key: "lawyer-dashboard-color-scheme",
});