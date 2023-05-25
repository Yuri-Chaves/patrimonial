import styled from 'styled-components/native';

type Props = {
    fontWeight?: string | number;
    size?: string | number;
    textColor?: string;
    borderColor?: string;
    bgColor?: string;
    width?: string | number;
    height?: string | number;
}

export const Container = styled.View`
    min-width: 100%;
    min-height: 580px;
    align-items: center;
    justify-content: center;
`
export const Text = styled.Text<Props>`
    font-style: normal;
    font-weight: ${({fontWeight}) => fontWeight  || "400"};
    font-size: ${({size}) => size || "14px"};
    color: ${({textColor}) => textColor || "#333"};
`;