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
    width: 100%;
    height: 124px;
    background-color: #fff;
    padding: 16px;
    gap: 16px;
    border-bottom-width: 1px;
    border-bottom-style: solid;
    border-bottom-color: #333;
    padding-bottom: 0;
`
export const BtnContainer = styled.View`
    width: 100%;
    height: 50px;
    flex-direction: row;
    align-items: flex-end;
    justify-content: center;
    gap: 8px;
`
export const Pressable = styled.Pressable<Props>`
    border: 1px solid ${({borderColor}) => borderColor || "#005FDF"};
    background-color: ${({bgColor}) => bgColor || "#EEF6FF"};
    width:  ${({width}) => width || "50%"};
    height: ${({height}) => height || "36px"};
    flex-direction: row;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    elevation: 2;
    padding: 10px;
    gap: 8px;
`
export const FilterContainer = styled.Pressable<Props>`
    width: 100%;
    height: 30px;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 8px;
    border-radius: 15px;
    border: 1px solid ${({borderColor}) => borderColor || "#828282"};
    background-color: ${({bgColor}) => bgColor || "#F4F5F6"};
`
export const Text = styled.Text<Props>`
    font-style: normal;
    font-weight: ${({fontWeight}) => fontWeight || "400"};
    font-size: ${({size}) => size || "14px"};
    line-height: 16px;'
    color: ${({textColor}) => textColor || "#005FDF"};
`