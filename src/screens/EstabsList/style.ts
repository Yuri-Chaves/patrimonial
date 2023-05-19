import styled from 'styled-components/native';

type Props = {
    fontWeight?: string | number;
    size?: string | number;
    textColor?: string | number;
}

export const Container = styled.View`
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    background-color: #FFFFFF;
    gap: 16px;
    padding-top: 32px;
`;
export const Button = styled.Pressable`
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 8px;
    width: 85%;
    height: 48px;
    border: 1px solid #D40000;
    border-radius: 8px;
    background-color: #F6EAEA;
    elevation: 2;
`;
export const Text = styled.Text<Props>`
    font-style: normal;
    font-weight: ${({fontWeight}) => fontWeight  || "400"};
    font-size: ${({size}) => size || "14px"};
    color: ${({textColor}) => textColor || "#333333"};
`;
export const SearchContainer = styled.View`
    width: 100%;
    height: 48px;
    padding: 8px 16px;
    margin-bottom: 0px;
`;
export const SearchContent = styled.View`
    width: 100%;
    height: 100%;
    flex-direction: row;
    align-items: center;
    gap: 8px;
    padding: 0 8px;
    border: 1px solid #333333;
    border-radius: 8px;
    padding-right: 32px;
`;
export const SearchInput = styled.TextInput`
    width: 100%;
    height: 100%;
    padding: 0 8px;
`;
