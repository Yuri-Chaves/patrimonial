import styled from 'styled-components/native';

type Props = {
    textColor?: string;
    borderColor?: string;
    bgColor?: string;
}

export const Container = styled.View`
    flex: 1;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 16px;
`
export const LoginContainer = styled.View`
    width: 100%;
    height: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;
`
export const TextContainer = styled.View`
    width: 75%;
    flex-direction: column;
    gap: 4px;
    align-items: flex-start;
    justify-content: center;
`
export const Text = styled.Text<Props>`
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;'
    color: ${({ textColor }) => textColor || "#333333"};
`
export const InputContainer = styled.View`
    flex-direction: row;
    align-items: center;
    width: 75%;
    height: 48px;
    border-radius: 24px;
    border: 2px solid #4f4f4f;
    padding: 0px 16px;
`;
export const Input = styled.TextInput`
    width: 100%;
    height: 100%;
    border: none;
    padding-left: 12px;
`
export const PressableContainer = styled(InputContainer)`
    width: 75%;
    justify-content: flex-end;
    border: none;
    gap: 16px;
`;
export const Pressable = styled.Pressable<Props>`
    border: 1px solid ${({ borderColor }) => borderColor || "#005FDF"};
    background-color: ${({ bgColor }) => bgColor || "#EEF6FF"};
    width:  100%;
    height: 42px;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    elevation: 2;
    padding: 10px;
    gap: 8px;
    elevation: 3;
`;
export const WarningContainer = styled.View`
    max-width: 85%;
    elevation: 2;
    align-items: center;
    justify-content: center;
    gap: 4px;
    background-color: #FDF3E7;
    padding: 8px 16px;
    border-radius: 8px;
    flex-direction: row;
`