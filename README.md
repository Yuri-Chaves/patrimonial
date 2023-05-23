# App de coleta de patrimônio usando React Native e WatermelonDB 🍉 


Este repositório contém o código-fonte e os recursos necessários para construir um aplicativo móvel em React Native, destinado a ser usado em um aparelho coletor de dados para a realização do inventário de itens pertencentes ao patrimônio de uma empresa.

## Descrição

O objetivo deste projeto é fornecer uma solução eficiente para a coleta de informações sobre os itens de patrimônio de uma empresa, simplificando e agilizando o processo de inventário. O aplicativo móvel, atualmente, permite que os funcionários realizem a leitura dos códigos de barras dos itens e registrem informações de local, data e hora da coleta, podendo ser facilmente ampliado para registro de outras informações como descrição, estado de conservação, entre outras.

## Recursos Principais

- **React Native**: A base do projeto é construída com React Native, uma estrutura popular para o desenvolvimento de aplicativos móveis multiplataforma. Isso permite que o aplicativo seja executado em dispositivos iOS e Android, maximizando a acessibilidade e o alcance.

- **WatermelonDB**: WatermelonDB é um banco de dados offline e em tempo real para aplicativos móveis, especialmente adequado para lidar com grandes quantidades de dados. Ele oferece suporte a consultas flexíveis, sincronização com o servidor e gerenciamento eficiente de armazenamento local, tornando-o uma escolha ideal para um aplicativo de coleta de dados.

- **Leitura de Códigos de Barras**: O aplicativo foi desenvolvido para o coletor de dados _Honeywell EDA51_, mas pode ser utilizado em outros modelos de coletores de dados. Permitindo que os usuários coletores escaneiem os códigos de barras dos itens de patrimônio de forma rápida e precisa. Também existe a opção de habilitar digitação, para que seja realizada a coleta de itens onde o código de barras esteja de difícil leitura, ou inexistente.

- **Registro de Informações**: O aplicativo oferece uma interface intuitiva para registrar informações sobre a coleta dos itens de patrimônio. Os dados são armazenados no banco de dados WatermelonDB e posteriormente enviados para o sistema integrado da empresa para fins de análise.
