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

export const Container = styled.View<Props>`
    width: 100%;
    height: 64px;
    flex-direction: row;
    align-items: center;
    background-color: ${({bgColor}) => bgColor || "#FFEFE7"};
    gap: 8px;
`
export const Line = styled.View<Props>`
    width: 20px;
    height: 100%;
    align-items: center;
    justify-content: center;
    background-color: ${({bgColor}) => bgColor || "#EE6005"};
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
`
export const Items = styled.View<Props>`
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    min-width: 108px;
`
export const Item = styled.View<Props>`
    flex-direction: row;
    align-items: center;
    gap: 4px;
`
export const Text = styled.Text<Props>`
    font-style: normal;
    font-weight: ${({fontWeight}) => fontWeight  || "400"};
    font-size: ${({size}) => size || "14px"};
    color: ${({textColor}) => textColor || "#333"};
`;