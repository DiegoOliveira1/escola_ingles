const database = require('../models');

class PessoaController{
    static async pegaTodasAsPessoas(req, res){
        try{
            const todasAsPessoas = await database.Pessoas.findAll();
            res.status(200).json(todasAsPessoas);
        }catch(error){
            res.status(500).json(error.message);
        }        
    }

    static async pegaUmaPessoa(req, res){
        const { id } = req.params;
        try{            
            const resultado = await database.Pessoas.findOne( {
                where: {
                    id: Number(id)
                }
            })
            res.status(200).json(resultado);
        } catch(error){
            res.status(500).json(error.message)
        }
    }

    static async criarPessoa(req, res){
        const novaPessoa = req.body;
        try{
            const novaPessoaCriada = await database.Pessoas.create(novaPessoa)
            res.status(200).json(novaPessoaCriada)
        } catch(error){
            res.status(500).json(error.message)
        }
    }

    static async atualizaPessoa(req, res){
        const { id } = req.params;
        const novasInfos = req.body;
        try{
            await database.Pessoas.update(novasInfos, {where: { id: Number(id)}})
            const pessoaAtualizada = await database.Pessoas.findOne( {
                where: {
                    id: Number(id)
                }
            })
            res.status(200).json(pessoaAtualizada)
        } catch(error){
            res.status(500).json(error.message)
        }
    }

    static async apagaPessoa(req, res){
        const { id } = req.params;
        try{
            await database.Pessoas.destroy({ where: {id: Number(id)}})
            res.status(200).send(`id ${id} deletado!`)
        } catch(error){
            res.status(500).json(error.message)
        }
    }

    static async pegaUmaMatricula(req, res){
        const { estudanteId, matriculaId } = req.params;
        try{            
            const resultado = await database.Matriculas.findOne( {
                where: {
                    id: Number(matriculaId),
                    estudante_id: Number(estudanteId)
                }
            })
            res.status(200).json(resultado);
        } catch(error){
            res.status(500).json(error.message)
        }
    }

    static async criarMatricula(req, res){
        const { estudanteId } = req.params;
        const novaMatricula = {...req.body, estudante_id: Number(estudanteId)};
        try{
            const novaMatriculaCriada = await database.Matriculas.create(novaMatricula)
            res.status(200).json(novaMatriculaCriada)
        } catch(error){
            res.status(500).json(error.message)
        }
    }

    static async atualizaMatricula(req, res){
        const { estudanteId, matriculaId } = req.params;
        const novasInfos = req.body;
        try{
            await database.Matriculas.update(novasInfos, {
                where: { 
                    id: Number(matriculaId),
                    estudante_id: Number(estudanteId)
                }
            })
            const matriculaAtualizada = await database.Matriculas.findOne( {
                where: {
                    id: Number(matriculaId)
                }
            })
            res.status(200).json(matriculaAtualizada)
        } catch(error){
            res.status(500).json(error.message)
        }
    }

    static async apagaMatricula(req, res){
        const { estudanteId, matriculaId } = req.params;
        try{
            await database.Matriculas.destroy({
                where: {
                    id: Number(matriculaId),
                    estudante_id: Number(estudanteId)
                }
            })
            res.status(200).send(`id ${matriculaId} deletado!`)
        } catch(error){
            res.status(500).json(error.message)
        }
    }
}

module.exports = PessoaController;