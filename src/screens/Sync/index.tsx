import React, { useEffect, useContext } from "react";
import { Container, Text } from "./sryle";
import { Image, StyleSheet, ToastAndroid } from "react-native";
import { database } from "../../databases";
import { EstabsModel } from "../../databases/models/estabsModel";
import instance from "../../helpers/instance";
import { EstabsContext } from "../../contexts/EstabsContext";


type ApiData = {
  empresa: number;
  num_estab: number;
  tp_estab: string;
  nome: string;
  abreviacao: string;
  dt_atual: string;
  hr_atual: string;
}

export function Sync() {
  const { setSynced } = useContext(EstabsContext)


  async function saveEstabs(empresa: number, num_estab: number, tp_estab: string, nome: string, abreviacao: string, updated_dt: string, updated_hr: string) {
    await database.write(async () => {
      await database.get<EstabsModel>("Estabelecimentos").create(data => {
        data.empresa = empresa
        data.num_estab = num_estab
        data.tp_estab = tp_estab
        data.nome = nome
        data.abreviacao = abreviacao
        data.updated_dt = updated_dt
        data.updated_hr = updated_hr
      })
    })
  }

  async function removeEstab(item: EstabsModel) {
    await database.write(async () => {
      await item.destroyPermanently()
    })
  }

  async function updateEstab(item: EstabsModel) {
    const apiData = await (await instance.get<ApiData>(`/estabs/${item.empresa}/${item.num_estab}`)).data
    if (apiData.dt_atual != item.updated_dt) {
      await database.write(async () => {
        await item.update(data => {
          data.empresa = apiData.empresa
          data.num_estab = apiData.num_estab
          data.tp_estab = apiData.tp_estab
          data.nome = apiData.nome
          data.abreviacao = apiData.abreviacao
          data.updated_dt = apiData.dt_atual
          data.updated_hr = apiData.hr_atual
        })
      })
    }
  }

  async function syncEstbs() {
    const itmcolCollection = database.get<EstabsModel>("Estabelecimentos");
    const apiData = await (await instance.get<ApiData[]>('/estabs/')).data
    const dbData = await itmcolCollection.query().fetch();
    if (dbData.length < apiData.length) {
      // Adicionado novo estab
      let temp: string[] = []
      dbData.forEach(res => {
        temp.push(res.abreviacao)
      });
      apiData.forEach(req => {
        if (!temp.includes(req.abreviacao)) {
          saveEstabs(req.empresa, req.num_estab, req.tp_estab, req.nome, req.abreviacao, req.dt_atual, req.hr_atual)
        }
      });
    } else if (dbData.length > apiData.length) {
      // Estab excluído
      let temp: string[] = []
      apiData.forEach(req => {
        temp.push(req.abreviacao)
      });
      dbData.forEach(res => {
        if (!temp.includes(res.abreviacao)) {
          removeEstab(res)
        }
      })
    } else if (dbData.length == apiData.length) {
      // Update estab
      dbData.forEach(item => {
        updateEstab(item)
      });
    }
  }

  async function getEstabs() {
    try {
      const response = await (await instance.get<ApiData[]>('/estabs')).data
      response.forEach(res => {
        saveEstabs(res.empresa, res.num_estab, res.tp_estab, res.nome, res.abreviacao, res.dt_atual, res.hr_atual)
      });
    } catch (error) {
      console.log(error)
    }
  }

  async function handleSync() {
    try {
      const itmcolCollection = database.get<EstabsModel>("Estabelecimentos");
      const response = await itmcolCollection.query().fetch();
      if (response.length > 0) {
        syncEstbs();
      } else {
        getEstabs()
      }
    } catch (error) {
      console.log(error)
      ToastAndroid.showWithGravityAndOffset('Verifique sua conexão com a internet', ToastAndroid.SHORT, ToastAndroid.TOP, 0, 35)
    }finally{
      setSynced()
    }
  }

  useEffect(() => {
      handleSync()
  }, [])

  return (
    <Container>
      <Image source={require('../../../assets/loader.gif')} alt='Carregando' style={styles.loader} />
      <Text>Buscando dados</Text>
    </Container>
  )
}
const styles = StyleSheet.create({
  loader: {
    width: 200,
    height: 200,
  }
})