import React, { useEffect, useState } from 'react';
import {
    View,
    SafeAreaView,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    StatusBar,
    ScrollView,
    TextInput,
    Alert
} from 'react-native';

import api from '../services/api';

import logo from '../imagens/logo.png';
import icondelete from '../imagens/icon-delete.png';
import iconeditar from '../imagens/icon-editar.png';

function Objeto() {

    const [itens, setItens] = useState([]);
    const [novoObjeto, setNovoObjeto] = useState(null);
    const [alterarObjeto, setAlterarObjeto] = useState(null);
    const [itemAlterar, setItemAltera] = useState(null);
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');

    useEffect(() => {
        async function loadItens() {
            try {
                const response = await api.get('/objeto', {
                });
                setItens(response.data);

            } catch (error) {
                Alert.alert(
                    'Falha',
                    `${error}`,
                    [
                        { text: '', onPress: () => console.log('') },

                        { text: 'OK', onPress: () => console.log('OK') },
                    ],
                    { cancelable: false },
                );
            }
        }
        loadItens();
    }, [itens]);


    async function handleExcluir(obj) {
        const response = await api.delete(`/objeto/${obj}`);
        console.log(response.data);
    }

    async function handleNovo() {

        setNovoObjeto(null);
        try {
            const response = await api.post('/objeto', { name: nome, desc: descricao });
        } catch (error) {
            Alert.alert(
                'Falha',
                `${error}`,
                [
                    { text: '', onPress: () => console.log('') },

                    { text: 'OK', onPress: () => console.log('OK') },
                ],
                { cancelable: false },
            );
        }

        setNome('');
        setDescricao('');
    }
    async function handleAlterar() {

        setAlterarObjeto(null);
        try {
            const response = await api.put(`/objeto/${itemAlterar.cod}`, { name: nome, desc: descricao });

        } catch (error) {
            Alert.alert(
                'Falha',
                `${error}`,
                [
                    { text: '', onPress: () => console.log('') },

                    { text: 'OK', onPress: () => console.log('OK') },
                ],
                { cancelable: false },
            );
        }
    }

    return (
        <SafeAreaView style={style.container}>
            <StatusBar backgroundColor="#031822" />
            <View style={style.card}>
                <View style={style.cabe}>

                    <Image source={logo} style={style.logo} />
                    <Text style={style.text}>Objetos</Text>

                </View>
                <ScrollView>
                    {itens.length === 0 ? <Text style={style.buttonText}> Nenhum Objeto cadastrado</Text>
                        : (
                            renderItem()

                        )}
                </ScrollView>
                <View>
                    <TouchableOpacity onPress={setNovoObjeto} style={style.button}>
                        <Text style={style.buttonText}>Novo</Text>
                    </TouchableOpacity>
                </View>

            </View>
            {novoObjeto && (
                viewNovoObjeto()
            )}
            {
                alterarObjeto && (
                    viewAlterarObjeto()
                )
            }
        </SafeAreaView>

    );
    function setAlterar(obj) {

        setItemAltera(obj)
        console.log(itemAlterar)
        setAlterarObjeto(true)
    }
    function viewNovoObjeto() {
        return (
            <SafeAreaView style={style.novoContainer}>
                <Text style={style.text}>Novo Objeto</Text>
                <TextInput
                    placeholder="Digite Nome do novo objeto"
                    style={style.input}
                    value={nome}
                    onChangeText={setNome}
                />
                <TextInput
                    placeholder="Digite a descrição do novo objeto"
                    style={style.input}
                    value={descricao}
                    onChangeText={setDescricao}
                />
                <View style={{ flexDirection: 'row' }}>

                    <TouchableOpacity onPress={() => { setNovoObjeto(null) }} style={style.buttonNovo}>
                        <Text style={style.buttonText}>Cancelar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleNovo} style={style.buttonNovo}>
                        <Text style={style.buttonText}>Criar</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        )
    }

    function viewAlterarObjeto() {
        return (
            <SafeAreaView style={style.novoContainer}>
                <Text style={style.text}>Alterar Objeto #{itemAlterar.cod}</Text>
                <TextInput
                    placeholder={itemAlterar.nome}
                    style={style.input}
                    value={nome}
                    onChangeText={setNome}
                />
                <TextInput
                    placeholder={itemAlterar.descricao}
                    style={style.input}
                    value={descricao}
                    onChangeText={setDescricao}
                />
                <View style={{ flexDirection: 'row' }}>

                    <TouchableOpacity onPress={() => { setAlterarObjeto(null) }} style={style.buttonNovo}>
                        <Text style={style.buttonText}>Cancelar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleAlterar} style={style.buttonNovo}>
                        <Text style={style.buttonText}>Salvar</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        )
    }
    function renderItem() {

        return (
            itens.map((item) => (
                <View key={item.cod.toString()} style={style.item}>
                    <View >
                        <View style={{ flexDirection: 'row' }}>

                            <Text style={style.itenscod}> #{item.cod} </Text>
                            <Text style={style.itensnome}> {item.nome} </Text>
                        </View>
                        <Text style={style.itensdesc}> {item.descricao} </Text>
                    </View>
                    <View style={style.buttonItem}>

                        <TouchableOpacity onPress={() => setAlterar(item)}>
                            <Image source={iconeditar}></Image>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleExcluir(item.cod.toString())} >
                            <Image source={icondelete}></Image>
                        </TouchableOpacity>
                    </View>
                </View>
            ))
        )
    }
}
export default Objeto;

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#031822',
        alignItems: 'center',
        justifyContent: "center",
    },
    card: {
        borderColor: '#DDD',
        borderRadius: 8,
        overflow: 'hidden',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    text: {
        marginBottom: 10,
        textAlign: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        fontSize: 22,
        fontWeight: 'bold',
        color: '#fff'
    },
    input: {
        borderRadius: 8,
        margin: 5,
        height: 40,
        alignSelf: 'stretch',
        backgroundColor: '#fff',

    },
    list: {
        color: '#fff',
        margin: 10,
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 9,
        paddingTop: 20,
        paddingBottom: 20,
        backgroundColor: '#062839',
        marginBottom: 2
    },
    itenscod: {
        fontWeight: 'bold',
        marginLeft: 10,
        fontSize: 10,
        color: '#fe4042',
    },
    itensnome: {
        fontWeight: 'bold',
        flexWrap: "wrap",
        marginLeft: 0,
        fontSize: 16,
        color: '#fff',
    },
    itensdesc: {
        marginTop: 5,
        fontSize: 12,
        marginLeft: 10,
        color: '#999',
        lineHeight: 12
    },
    logo: {
        height: 80,
        resizeMode: 'contain'
    },
    cabe: {
        height: 150,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    button: {
        alignSelf: 'stretch',
        backgroundColor: '#fe4042',
        borderRadius: 4,
        margin: 2,
        justifyContent: 'center',
    },
    buttonNovo: {
        flex: 1,
        alignSelf: 'stretch',
        backgroundColor: '#fe4042',
        borderRadius: 4,
        margin: 2,
        justifyContent: 'center',
    },
    buttonText: {
        textAlign: 'center',
        margin: 5,
        color: '#fff',
        fontWeight: 'bold'
    },

    buttonItem: {
        flexDirection: 'row',
        margin: 5
    },
    safeArea: {
        height: 20,
        flex: 1
    },
    novoContainer: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        justifyContent: 'center',
        alignItems: 'center'
    },
});