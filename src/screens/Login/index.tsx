
import { useContext, useState } from 'react'
import { Image } from 'react-native'
import microservicos from '../../helpers/microservicos';
import { EstabsContext } from '../../contexts/EstabsContext'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import {
    Container,
    LoginContainer,
    TextContainer,
    Text,
    InputContainer,
    Input,
    PressableContainer,
    Pressable,
    WarningContainer
} from './style'
type Warning = {
    visible: boolean
    msg: string
}
export function Login() {
    const { user, setUser, setIsAuth } = useContext(EstabsContext)
    const [warning, setWarning] = useState<Warning>({ visible: false, msg: '' })

    function handleName(name: string) {
        name = name.toLowerCase()
        const arr = name.split(" ")
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].length > 3 || arr[i].length < 2) {
                arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1)
            }
        }
        const newName = arr.join(" ")
        return newName
    }

    const handleLogin = async () => {
        try {
            const response = await microservicos.post('/get-client', { "MATRICULA": user.matricula })
            const { NOME_CPF: nome } = response.data["LISTA"]
            setUser({ ...user, nome: handleName(nome) })
            setWarning({ visible: false, msg: '' })
            setIsAuth(true)
        } catch (error) {
            if (user.matricula == '') {
                setWarning({ visible: true, msg: 'Digite a sua matrícula' })
            }
            if (user.matricula != '') {
                setWarning({ visible: true, msg: 'Matrícula não encontrada' })
            }
        }
    }

    return (
        <Container>
            <LoginContainer>
                <Image source={require('../../../assets/logo-alt.png')} resizeMode={'contain'} />
                <TextContainer>
                    <Text>Matrícula:</Text>
                </TextContainer>
                <InputContainer>
                    <Input
                        autoFocus={true}
                        inputMode='numeric'
                        keyboardType='number-pad'
                        value={user.matricula}
                        onChangeText={(t) => setUser({ ...user, matricula: t })}
                        onEndEditing={handleLogin}
                    />
                </InputContainer>
                <PressableContainer>
                    <Pressable
                        borderColor={user.matricula.length > 5 ? '#005FDF' : '#BDBDBD'}
                        bgColor={user.matricula.length > 5 ? '#005FDF' : '#F4F5F6'}
                        onPress={handleLogin}
                    >
                        <Text
                            textColor={user.matricula.length > 5 ? '#FFF' : '#BDBDBD'}
                        >Login</Text>
                        <MaterialCommunityIcons name="login" size={16} color={user.matricula.length > 5 ? '#FFF' : '#BDBDBD'} />
                    </Pressable>
                </PressableContainer>
                {warning.visible && (
                    <WarningContainer>
                        <Ionicons name="warning-outline" size={16} color="#A44F00" />
                        <Text textColor={'#A44F00'}>{warning.msg}</Text>
                    </WarningContainer>
                )}
            </LoginContainer>
        </Container>
    )
}