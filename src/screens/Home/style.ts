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
    flex: 1;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: rgba(255, 255, 255, .7);
    gap: 16px;
`;
export const Text = styled.Text<Props>`
    font-style: normal;
    font-weight: ${({fontWeight}) => fontWeight || "400"};
    font-size: ${({size}) => size || "14px"};
    line-height: 16px;'
    color: ${({textColor}) => textColor || "#333333"};
`;
export const TextView = styled.View`
    align-items: flex-start;
    justify-content: flex-start;
    padding: 0 16px;
    gap: 8px;
    min-width: 100%;
`;
export const InputContainer = styled.View`
    flex-direction: row;
    align-items: center;
    width: 95%;
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
`;
export const PressableContainer = styled(InputContainer)`
    width: 100%;
    justify-content: center;
    border: none;
    gap: 16px;
`;
export const Pressable = styled.Pressable<Props>`
    border: 1px solid ${({borderColor}) => borderColor || "#005FDF"};
    background-color: ${({bgColor}) => bgColor || "#EEF6FF"};
    width:  ${({width}) => width || "45%"};
    height: ${({height}) => height || "36px"};
    flex-direction: row;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    elevation: 2;
    padding: 10px;
    gap: 8px;
`;
export const SwitchContainer = styled.View`
    position: absolute;
    top: 80%;
    align-items: center;
    justify-content: center;
    gap: 4px;
`;
export const SwitchContent = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 8px;
`;