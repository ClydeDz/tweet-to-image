import { Anchor, Center, Title, Text } from "@mantine/core";
import "./AppHeader.css";

const AppHeader = () => {
    return (
        <>
            <Title order={1} align="center">Tweet to Image</Title>
            <Text align="center">Download a Tweet as an Instagram-ready image</Text>
            <Center>
            <Anchor href="https://github.com/ClydeDz/tweet-to-image/issues/new/choose"
                target="_blank" align="center" className="anchor" size="sm">
                Have an idea?
            </Anchor>
            <Anchor href="https://github.com/ClydeDz/tweet-to-image/issues/new/choose"
                target="_blank" align="center" className="anchor" size="sm">
                Report an issue
            </Anchor>
            <Anchor href="https://sponsor.clydedsouza.net/" target="_blank"
                align="center" className="anchor" size="sm">
                Support
            </Anchor>
            <Anchor href="https://clydedsouza.net/" target="_blank" 
                align="center" className="anchor" size="sm">
                Developed by Clyde D'Souza
            </Anchor>
            </Center>
        </>
    );
};

export default AppHeader;