import React from "react";
import { 
    Container,
    Text
} from "./style";

export function EmptyState(){
    return(
        <Container>
            <Text>Não foram encontrados dados</Text>
        </Container>
    )
}