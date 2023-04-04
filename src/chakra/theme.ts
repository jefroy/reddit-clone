// https://chakra-ui.com/docs/styled-system/customize-theme
import {extendTheme} from "@chakra-ui/react"

// add font- https://chakra-ui.com/community/recipes/using-fonts
import "@fontsource/open-sans/300.css";
import "@fontsource/open-sans/400.css";
import "@fontsource/open-sans/700.css";
import {Button} from "@/chakra/button";
import {Input} from "@/chakra/input";

// Call `extendTheme` and pass your custom values
export const theme = extendTheme({
    colors: {
        brand: {
            100: "#FF3C00",
        },
    },
    fonts: {
        body: "Open Sans, sans-serif",
    },
    styles: {
        global: () => ({
            body: {
                bg: "gray.200",
            },
        }),
    },
    components: {
        Button,
        Input, // not working for some reason - come back to this
    },
});
