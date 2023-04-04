// https://chakra-ui.com/docs/styled-system/customize-theme
import {extendTheme} from "@chakra-ui/react"

// add font- https://chakra-ui.com/community/recipes/using-fonts
import "@fontsource/open-sans/300.css";
import "@fontsource/open-sans/400.css";
import "@fontsource/open-sans/700.css";

// Call `extendTheme` and pass your custom values
export const theme = extendTheme({
    colors: {
        brand: { // reddit orange
            100: '#FF3c00',
        },
    },

    fonts: {
        body: "Open Sans, sans-serif"
    },

    styles: {
        global: () => ({
            body: {
                bg: "grey.200",
            },
        }),
    },

    components: {

    },


});
