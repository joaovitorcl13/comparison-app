const Pool = require('pg').Pool

const pool = new Pool({
    user: 'api_user',
    host: 'localhost',
    database: 'comparatudo',
    password: 'password',
    port: 5432,
})


const selectObjeto = (request, response) => {
    pool.query('SELECT * FROM objeto', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
        const itens = results.rows;
        return itens;
    })


}

const insertObjeto = (request, response) => {

    const { name, desc } = request.body

    pool.query('INSERT INTO objeto(nome, descricao) VALUES ($1, $2)', [name, desc], (error, results) => {
        if (error) {
            throw error
        }

        response.status(201).send(`Objeto inserido`)
    })
}

const deleteObjeto = (request, response) => {

    const cod = parseInt(request.params.cod)

    pool.query('DELETE FROM objeto WHERE cod = $1', [cod], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`Objeto deletado COD: ${cod}`)
    })
}
const updateObjeto = (request, response) => {
    const cod = parseInt(request.params.cod)

    const { name, desc } = request.body

    pool.query(
        'UPDATE objeto SET nome = $1, descricao = $2 WHERE cod = $3',
        [name, desc, cod],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send(`Objeto alterado COD: ${cod}`)
        }
    )
}

const selectCriterio = (request, response) => {
    pool.query('SELECT * FROM criterio', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })


}

const insertCriterio = (request, response) => {

    const { name, desc } = request.body

    pool.query('INSERT INTO criterio(nome, descricao) VALUES ($1, $2)', [name, desc], (error, results) => {
        if (error) {
            throw error
        }

        response.status(201).send(`Criterio inserido`)
    })
}

const deleteCriterio = (request, response) => {

    const cod = parseInt(request.params.cod)

    pool.query('DELETE FROM criterio WHERE cod = $1', [cod], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`Criterio deletado COD: ${cod}`)
    })
}
const updateCriterio = (request, response) => {
    const cod = parseInt(request.params.cod)
    const { name, desc } = request.body

    pool.query(
        'UPDATE criterio SET nome = $1, descricao = $2 WHERE cod = $3',
        [name, desc, cod],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send(`Criterio alterado COD: ${cod}`)
        }
    )
}

const selectComparacao = (request, response) => {
    pool.query('SELECT * FROM comparacao', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const insertComparacao = (request, response) => {
    const {comparacao, objetos, criterios} = request.body
    console.log('comparacao')
    console.log(comparacao)
    console.log('objetos')
    console.log(objetos)
    console.log('criterios')
    console.log(criterios)
    
    
    pool.query('INSERT INTO comparacao(resultado, maiornota) VALUES ($1, $2)', [comparacao.name, comparacao.nota], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send(`Comparacao inserida`)
        setCodComparacao()
    })

    function setCodComparacao() {
        pool.query('SELECT MAX(cod) FROM comparacao', (error, results) => {
            if (error) {
                throw error
            }
            comparacao.cod = results.rows[0].max
            insertNovaComp(comparacao, objetos, criterios)

        })

    } 
}

function insertNovaComp(comparacao, objetos, criterios) {
    objetos.map((objeto) => {
        try {
            pool.query('INSERT INTO objetocomp(codobjeto, codcomp) VALUES ($1, $2)', [objeto.cod, comparacao.cod], (error, results) => {
                if (error) {
                    throw error
                }
            })
            
        } catch (error) {
            console.log(error)
        }
    })
    criterios.map((criterio) => {
        try {
            pool.query('INSERT INTO compcriterio(peso, codcomp, codcriterio) VALUES ($1, $2, $3)',
                [criterio.peso, comparacao.cod, criterio.cod], (error, results) => {
                    if (error) {
                        throw error
                    }
                })
            
        } catch (error) {
            console.log(error)
        }
    })
    objetos.map((objeto) => {
        criterios.map((criterio) => {
            try {
               pool.query('INSERT INTO nota(nota, codcriterio, codcomp, codobjeto) VALUES ($1, $2, $3, $4)',
                    [objeto.nota, criterio.cod, comparacao.cod, objeto.cod], (error, results) => {
                        if (error) {
                            console.log(error)
                        }
                    })
                
            } catch (error) {
                console.log(error)
            }
        })

    })

}

const deleteComparacao = (request, response) => {

    const cod = parseInt(request.params.cod)

    pool.query('DELETE FROM comparacao WHERE cod = $1', [cod], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`Comparação deletada COD: ${cod}`)
    })
}


module.exports = {
    selectObjeto,
    insertObjeto,
    deleteObjeto,
    updateObjeto,

    selectCriterio,
    insertCriterio,
    deleteCriterio,
    updateCriterio,

    selectComparacao,
    insertComparacao,
    deleteComparacao,
}