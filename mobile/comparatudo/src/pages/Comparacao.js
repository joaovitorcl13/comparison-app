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
    Picker,
    Alert,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import api from '../services/api';

import logo from '../imagens/logo.png';
import icondelete from '../imagens/icon-delete.png';

function Comparacao() {
    const [peso, setPeso] = useState([]);

    const [resultado, setResultado] = useState([]);

    const [nota, setNota] = useState([]);

    const [objetoAvaliados, setObjetoAvaliados] = useState([]);

    const [itens, setItens] = useState([]);

    const [itensObjeto, setItensObjeto] = useState([]);
    const [novaComparacaoObjeto, setNovaComparacaoObjeto] = useState(null);


    const [itensCriterios, setItensCriterios] = useState([]);
    const [novaComparacaoCriterio, setNovaComparacaoCriterio] = useState(null);

    const [novaComparacaoPeso, setNovaComparacaoPeso] = useState(null);

    const [resultadoComparacao, setResultadoComparacao] = useState(null);

    const [objetoCompara, setObjetoCompara] = useState([]);
    const [criterioCompara, setCriterioCompara] = useState([]);
    const [novaComparacaoNotas, setNovaComparacaoNotas] = useState(null);

    useEffect(() => {
        async function loadItens() {
            try {
                const response = await api.get('/comparacao', {
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

    useEffect(() => {
        async function loadObjetos() {
            try {
                const response = await api.get('/objeto', {
                });
                setItensObjeto(response.data);

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
        loadObjetos();
    }, [itensObjeto])

    useEffect(() => {

        async function loadCriteros() {
            try {
                const response = await api.get('/criterio', {
                });
                setItensCriterios(response.data);
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
        loadCriteros();
    }, [itensCriterios])


    async function handleExcluir(obj) {
        try {

            const response = await api.delete(`/comparacao/${obj}`);

            Alert.alert(
                'Comparação Excluida',
                'Sucesso',
                [
                    { text: '', onPress: () => console.log('') },

                    { text: 'OK', onPress: () => console.log('OK') },
                ],
                { cancelable: false },
            );


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
    function handleComparacao(obj) {
        objetoAvaliados.push(obj)
        setObjetoAvaliados(objetoAvaliados)
        const [head, ...rest] = objetoCompara;
        setObjetoCompara(rest)
        if (objetoCompara.length === 1) {
            gerarResultado()
        }
    }

    async function inserirComparacao(rest) {

        var cri = criterioCompara
        var obj = objetoAvaliados
        try {

            const response = await api.post('/comparacao', {
                comparacao: { name: rest.nome, nota: rest.nota },
                criterios: cri,
                objetos: obj
            })

        } catch (error) {
            Alert.alert(
                'Erro',
                `Falha ao tentar inserir Comparação ${error}`,
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
                    <Text style={style.text}>Comparações</Text>

                </View>
                <ScrollView>
                    {itens.length === 0 ? <Text style={style.buttonText}> Nenhuma Comparação cadastrada</Text>
                        : (
                            renderItem()

                        )}
                </ScrollView>
                <View>
                    <TouchableOpacity onPress={() => { setNovaComparacaoObjeto(true); }} style={style.button}>
                        <Text style={style.buttonText}>Nova Comparação</Text>

                    </TouchableOpacity>
                </View>

            </View>
            {novaComparacaoObjeto && (
                viewNovaComparacaoObjeto()
            )
            }
            {novaComparacaoCriterio && (

                viewNovaComparacaoCriterio()
            )
            }
            {novaComparacaoPeso && (

                viewNovaComparacaoPeso()
            )
            }
            {

                novaComparacaoNotas && (
                    viewNovaComparacaoNotas()
                )
            }
            {

                resultadoComparacao && (
                    viewResultadoComparacao()
                )
            }
        </SafeAreaView>

    );
    function handleCancelar() {

        setNovaComparacaoCriterio(null);
        setNovaComparacaoObjeto(null);
        setNovaComparacaoPeso(null);

        while (objetoCompara.length) {
            objetoCompara.pop()
            setObjetoCompara(objetoCompara);
        }

        while (objetoAvaliados.length) {
            objetoAvaliados.pop()
            setObjetoAvaliados(objetoAvaliados);
        }


        while (criterioCompara.length) {
            criterioCompara.pop()
            setCriterioCompara(criterioCompara);
        }
    }

    function handleProximoComparacao() {


        {
            novaComparacaoObjeto ? (
                setNovaComparacaoObjeto(null),
                setNovaComparacaoCriterio(true),
                console.log('comparação - escolha criterios')
            ) :
                novaComparacaoCriterio ? (

                    setNovaComparacaoCriterio(null),
                    setNovaComparacaoPeso(true),
                    console.log('comparação - defina os peso')

                ) :
                    novaComparacaoPeso ? (

                        setNovaComparacaoPeso(null),
                        console.log('comparação - notas objetos'),
                        setNovaComparacaoNotas(true)
                    ) :
                        novaComparacaoNotas ? (
                            setNovaComparacaoNotas(null),
                            setresultadoComparacao(true)
                        ) :
                            resultadoComparacao ? (
                                setResultadoComparacao(true)
                            )
                                :
                                {}
        }
    }
    async function gerarResultado() {
        var comp = []
        objetoAvaliados.map((objeto) => {
            var objaux = { nota: 0, codobj: 0, nome: '' }
            var notaFinal = 0, auxNota = 0, auxPeso = 0;
            criterioCompara.map((criterio) => {
                auxNota = notaCriterioValue(criterio.cod, objeto.cod)

                auxPeso = pesoCriterioValue(criterio.cod)

                criterio.peso = auxPeso

                notaFinal = + auxNota * auxPeso + notaFinal
                objaux.nota = notaFinal
                objaux.codobj = objeto.cod
                objaux.nome = objeto.nome
                objeto.nota = notaFinal
            })
            setCriterioCompara(criterioCompara)
            comp.push(objaux)
        })
        var maiorNota = 0;
        var auxResultado = {}
        comp.map((objeto) => {
            if (objeto.nota > maiorNota) {
                maiorNota = objeto.nota
                auxResultado = objeto
            }
        })
        setResultado(auxResultado)
        setNovaComparacaoNotas(null)
        setResultadoComparacao(true)
        inserirComparacao(auxResultado)

    }



    function viewNovaComparacaoObjeto() {
      
        return (
            <SafeAreaView style={style.novoContainer}>
                <View style={style.cabe}>
                    <Text style={style.text}>Nova Comparação</Text>
                    <Text style={style.itensdesc}>Selecione os Objetos para compará-los</Text>
                </View>
                <ScrollView style={style.novaComp}>

                    {itensObjeto.length === 0 ? <Text style={style.buttonText}> Nenhum Objeto cadastrado</Text>
                        : (
                            renderItemObjetos()

                        )}
                </ScrollView>

                <View style={{ flexDirection: 'row' }}>

                    <TouchableOpacity onPress={() => { handleCancelar(); }} style={style.buttonNovo}>
                        <Text style={style.buttonText}>Cancelar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { handleProximoComparacao(); }} style={style.buttonNovo}>
                        <Text style={style.buttonText}>Próximo</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        )
    }
    function viewNovaComparacaoCriterio() {
        
        return (
            <SafeAreaView style={style.novoContainer}>
                <View style={style.cabe}>
                    <Text style={style.text}>Nova Comparação</Text>
                    <Text style={style.itensdesc}>Selecione os Critérios para avaliar os objetos</Text>
                </View>
                <ScrollView style={style.novaComp}>

                    {itensCriterios.length === 0 ? <Text style={style.buttonText}> Nenhum Critérios cadastrado</Text>
                        : (
                            renderItemCriterios()

                        )}
                </ScrollView>

                <View style={{ flexDirection: 'row' }}>

                    <TouchableOpacity onPress={() => { handleCancelar() }} style={style.buttonNovo}>
                        <Text style={style.buttonText}>Cancelar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { handleProximoComparacao(); }} style={style.buttonNovo}>
                        <Text style={style.buttonText}>Próximo</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        )
    }

    function viewNovaComparacaoPeso() {
       
        return (
            <SafeAreaView style={style.novoContainer}>
                <View style={style.cabe}>
                    <Text style={style.text}>Nova Comparação</Text>
                    <Text style={style.itensdesc}>Defina o peso de cada Critério</Text>
                </View>
                <ScrollView style={style.novaComp}>

                    {itensCriterios.length === 0 ? <Text style={style.buttonText}> Nenhum Critérios Selecionado</Text>
                        : (
                            renderItemCriteriosPeso()

                        )}
                </ScrollView>

                <View style={{ flexDirection: 'row' }}>

                    <TouchableOpacity onPress={() => { handleCancelar(); }} style={style.buttonNovo}>
                        <Text style={style.buttonText}>Cancelar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { handleProximoComparacao(); }} style={style.buttonNovo}>
                        <Text style={style.buttonText}>Próximo</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        )
    }

    function viewNovaComparacaoNotas() {

        return (
            objetoCompara.map((objeto, index) => (
                < SafeAreaView key={objeto.cod.toString()} style={[style.novoContainer, { zIndex: objetoCompara.length - index }]} >

                    <View style={[style.containerNota, {}]}>

                        <Text style={style.text}>Nova Comparação</Text>
                        <Text style={style.itensdesc}>Avalie os Critérios do objeto:</Text>
                        <Text style={style.text}>{objeto.nome}</Text>
                        <Text style={style.itensnome} > Nota </Text>

                        <ScrollView style={style.novaComp}>

                            {criterioCompara.length === 0 ? <Text style={style.buttonText}> Nenhum Critérios Selecionado</Text>
                                : (
                                    renderItemCriterioNotas(objeto.cod)

                                )}
                        </ScrollView>
                        <Text style={{ color: '#999', fontSize: 12 }}>{index + 1} de {objetoCompara.length}</Text>
                        <View style={{ flexDirection: 'row' }}>

                            <TouchableOpacity onPress={() => { handleCancelar(); }} style={style.buttonNovo}>
                                <Text style={style.buttonText}>Cancelar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { handleComparacao(objeto); }} style={style.buttonNovo}>
                                <Text style={style.buttonText}>Próximo</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </SafeAreaView >
            ))
        )
    }


    function viewResultadoComparacao() {
        return (

            <SafeAreaView style={style.novoContainer}>

                <Text style={style.text}>Resultado</Text>
                <View style={style.resultadoContainer}>

                    <Text style={style.textnota}> {resultado.nota}</Text>
                    <Text style={style.itensdesc}>Maior Nota</Text>
                    <Text style={style.text}> {resultado.nome}</Text>
                    <ScrollView style={{ margin: 10, flex: 1, borderRadius: 5, width: 300 }}>

                        {objetoAvaliados.length === 0 ? <Text style={style.buttonText}> Erro 404</Text>
                            : (
                                renderResultadoComparacao()

                            )}
                    </ScrollView>
                </View>
                <View style={{ flexDirection: 'row', width: 150 }}>
                    <TouchableOpacity onPress={() => { setResultadoComparacao(null); handleCancelar(); }} style={style.buttonNovo}>
                        <Text style={style.buttonText}>OK</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        )
    }

    function renderItemCriterioNotas(obj) {

        return (
            criterioCompara.map((criterio) => (
                <View key={criterio.cod.toString()} style={[style.item, { justifyContent: 'space-around', }]}>
                    <View style={{ width: 200 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={style.itenscod}> #{criterio.cod} </Text>
                            <Text style={style.itensnome}> {criterio.nome} </Text>
                        </View>
                    </View>
                    <Text style={style.itensdesc}>peso {pesoCriterioValue(criterio.cod)}</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Picker
                            selectedValue={(notaCriterioValue(criterio.cod, obj))}

                            style={{ height: 50, width: 100, color: '#fff' }}
                            onValueChange={(itemValue, itemIndex) =>
                                (notaCriterio(itemValue, obj, criterio.cod))
                            } >
                            <Picker.Item label=" 0 " value={0} />
                            <Picker.Item label=" 1 " value={1} />
                            <Picker.Item label=" 2 " value={2} />
                            <Picker.Item label=" 3 " value={3} />
                            <Picker.Item label=" 4 " value={4} />
                            <Picker.Item label=" 5 " value={5} />
                        </Picker>

                    </View>
                </View>
            ))
        )
    }
    function notaCriterio(notac, objcod, cricod) {
        nota.push({ notac, cricod, objcod });
        setNota(nota);
    }

    function notaCriterioValue(id, obj) {

        for (var i = 0; i < nota.length; i++) {
            if (nota[i].cricod == id && nota[i].objcod == obj) {
                var aux = nota[i].notac
            }
        }
        return aux;
    }

    function pesoCriterioValue(id) {

        for (var i = 0; i < peso.length; i++) {
            if (peso[i].cricod == id) {
                var aux = peso[i].pesoc
            }
        }
        return aux;
    }

    function pesoCriterio(pesoc, cricod, index) {

        peso.push({ cricod, pesoc, index });
        setPeso(peso);

    }

    function renderItemCriteriosPeso() {

        return (
            criterioCompara.map((item) => (
                <View key={item.cod.toString()} style={style.item}>
                    <View style={{ width: 200 }} >
                        <View style={{ flexDirection: 'row' }}>

                            <Text style={style.itenscod}> #{item.cod} </Text>
                            <Text style={style.itensnome}> {item.nome} </Text>
                        </View>
                        <Text style={style.itensdesc}> {item.descricao} </Text>
                    </View>
                    <View style={style.buttonItem}>
                        <Picker

                            selectedValue={pesoCriterioValue(item.cod)}
                            style={{ height: 50, width: 100, color: '#fff' }}
                            onValueChange={(itemValue, itemIndex) =>
                                (pesoCriterio(itemValue, item.cod, itemIndex))
                            }>
                            <Picker.Item label="0.0" value={0.0} />
                            <Picker.Item label="0.5" value={0.5} />
                            <Picker.Item label="1.0" value={1.0} />
                            <Picker.Item label="1.5" value={1.5} />
                            <Picker.Item label="2.0" value={2.0} />
                            <Picker.Item label="2.5" value={2.5} />
                            <Picker.Item label="3.0" value={3.0} />
                        </Picker>


                    </View>
                </View>
            ))
        )
    }

    function renderItemCriterios() {

        return (
            itensCriterios.map((item) => (
                <View key={item.cod.toString()} style={style.item}>
                    <View >
                        <View style={{ flexDirection: 'row' }}>

                            <Text style={style.itenscod}> #{item.cod} </Text>
                            <Text style={style.itensnome}> {item.nome} </Text>
                        </View>
                        <Text style={style.itensdesc}> {item.descricao} </Text>
                    </View>
                    <View style={style.buttonItem}>
                        <CheckBox

                            value={false}
                            onValueChange={() => { addCriterio(item) }}
                        />
                    </View>
                </View>
            ))
        )
    }
    function renderResultadoComparacao() {

        return (
            objetoAvaliados.map((objeto) => (
                <View key={objeto.cod.toString()} style={style.item}>
                    <View >
                        <View style={{ flexDirection: 'row' }}>

                            <Text style={style.itenscod}> #{objeto.cod} </Text>
                            <Text style={style.itensnome}> {objeto.nome} </Text>
                        </View>
                        <Text style={style.itensdesc}> Nota: {objeto.nota} </Text>
                    </View>
                </View>
            ))
        )
    }

    function addObjeto(obj) {
        objetoCompara.push(obj);
        setObjetoCompara(objetoCompara);
    }
    function addCriterio(obj) {
        criterioCompara.push(obj);
        setCriterioCompara(criterioCompara);
    }


    function renderItemObjetos() {

        return (
            itensObjeto.map((item) => (
                <View key={item.cod.toString()} style={style.item}>
                    <View >
                        <View style={{ flexDirection: 'row' }}>

                            <Text style={style.itenscod}> #{item.cod} </Text>
                            <Text style={style.itensnome}> {item.nome} </Text>
                        </View>
                        <Text style={style.itensdesc}> {item.descricao} </Text>
                    </View>
                    <View style={style.buttonItem}>
                        <CheckBox

                            value={false}
                            onValueChange={(value) => { addObjeto(item) }}
                        />
                    </View>
                </View>
            ))
        )
    }

    function renderItem() {

        return (
            itens.map((item) => (
                <View key={item.cod.toString()} style={style.item}>
                    <View >
                        <View style={{ flexDirection: 'row' }}>

                            <Text style={style.itenscod}> #{item.cod} </Text>
                            <Text style={style.itensnome}>  {item.resultado} </Text>
                        </View>
                        <Text style={style.itensdesc}> Nota: {item.maiornota} </Text>
                        <Text style={style.itensdesc}> {item.descricao} </Text>
                    </View>
                    <View style={style.buttonItem}>
                        <TouchableOpacity onPress={() => { handleExcluir(item.cod.toString()) }} >
                            <Image source={icondelete}></Image>
                        </TouchableOpacity>
                    </View>
                </View>
            ))
        )
    }
}
export default Comparacao;

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#031822',
        alignItems: 'center',
        justifyContent: "center",

    },
    containerNota: {
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
        marginTop: 10,
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
        borderRadius: 9,
        paddingTop: 20,
        paddingBottom: 20,
        justifyContent: 'space-between',
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
    textnota: {
        marginTop: 5,
        fontSize: 40,
        color: '#43ca43',
        fontWeight: 'bold'
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
    novoContainer: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    novaComp: {
        borderRadius: 9,
        margin: 30,
        width: 350,
    },
    resultadoContainer: {
        alignItems: "center",
        backgroundColor: '#062839',
        borderRadius: 9,
        margin: 30,
        width: 350,
        height: 450,
    }
});