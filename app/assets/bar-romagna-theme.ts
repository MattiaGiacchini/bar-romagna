import { definePreset } from '@primeuix/themes'
import Lara from '@primeuix/themes/lara'

export const BarRomagnaTheme = definePreset(Lara, {
    primitive: {
        orange: {
            50: '#fff4e6',
            100: '#ffe0b3',
            200: '#ffcc80',
            300: '#ffb84d',
            400: '#ffa41a',
            500: '#FFA127',
            600: '#e68a1f',
            700: '#cc7317',
            800: '#b35c0f',
            900: '#994507',
            950: '#802e00'
        }
    },

    semantic: {
        primary: {
            50: '#e6f0ff',
            100: '#b3d4ff',
            200: '#80b8ff',
            300: '#4d9cff',
            400: '#1a80ff',
            500: '#0358F8',
            600: '#0247d1',
            700: '#0236aa',
            800: '#012583',
            900: '#01145c',
            950: '#000a35'
        },

        colorScheme: {
            light: {
                primary: {
                    color: '{primary.500}',
                    inverseColor: '#ffffff',
                    hoverColor: '{primary.600}',
                    activeColor: '{primary.700}'
                },
                surface: {
                    0: '#ffffff',
                    50: '#fffcf7',
                    100: '#fff9ef',
                    200: '#fff6e7',
                    300: '#fff3df',
                    400: '#fff0d7',
                    500: '#FFEABE',
                    600: '#f5d9a8',
                    700: '#e6c892',
                    800: '#d7b77c',
                    900: '#c8a666',
                    950: '#b99550'
                },

                text: {
                    color: '#212529',
                    hoverColor: '#000000',
                    mutedColor: '#6c757d',
                    highlightColor: '#212529'
                }
            }
        }
    }
})