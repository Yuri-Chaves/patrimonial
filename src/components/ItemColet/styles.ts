import styled from 'styled-components/native';

type Props = {
    fontWeight?: string | number;
    size?: string | number;
    lineHeight?: string | number;
    textColor?: string;
    borderWidth?: string | number;
    borderColor?: string;
    borderRadius?: string;
    bgColor?: string;
    width?: string | number;
    minWidth?: string | number;
    height?: string | number;
    justify?: string;
    direction?: string;
}

export const Pressable = styled.TouchableOpacity<Props>`
    width: ${({width}) => width || '100%'};
    height: ${({height}) => height || '72px'};
    flex-direction: row;
    align-items: ${({justify}) => justify || 'center'};
    justify-content: center;
    border-radius: ${({borderRadius}) => borderRadius || "0px"};
    background-color: ${({bgColor}) => bgColor || "#FFEFE7"};
    gap: 8px;
`
export const Infos = styled.View<Props>`
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    /* min-width: 155px; */
    min-width: ${({minWidth}) => minWidth || '111px'}
`
export const Info = styled.View<Props>`
    flex-direction: row;
    align-items: center;
    gap: 4px;
`
export const Text = styled.Text<Props>`
    font-style: normal;
    font-weight: ${({fontWeight}) => fontWeight  || "400"};
    font-size: ${({size}) => size || "14px"};
    color: ${({textColor}) => textColor || "#333"};
    line-height: ${({lineHeight}) => lineHeight || "20px"};
`;
export const Container = styled.View<Props>`
    flex: 1;
    align-items: center;
    justify-content: center;
    padding-top: 16px;
`
export const ModalContainer = styled.View<Props>`
    width: 95%;
    padding: 0 5%;
`
export const ModalContent = styled.View<Props>`
    width: 100%;
    background-color: ${({bgColor}) => bgColor || "rgba(255, 255, 255, 0.9)"};
    flex-direction: ${({direction}) => direction || "column"};
    align-items: center;
    justify-content: ${({justify}) => justify || 'center'};
    border-radius: ${({borderRadius}) => borderRadius || "0px"};
    gap: 12px;
    border-width: ${({borderWidth}) => borderWidth || '0px'};
    border-style: solid;
    border-color: ${({borderColor}) => borderColor || '#D40000'};
`