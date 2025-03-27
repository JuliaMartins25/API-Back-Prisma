import notesModel from "../models/notesModel.js";

class notesController {
    getAll = async (req, res) => {
        try {
            const anotacao = await notesModel.getAll();
            res.json(anotacao);
        } catch (error) {
            console.error(error);
            res.status(500).json({ erro: "Erro ao buscar a anotação" });
        }
    }

    create = async (req, res) => {
        const { titulo, conteudo } = req.body;
        try {
            if (!titulo) {
                return res.status(400).json({ erro: "Título é obrigatório" });
            }
            if (!conteudo) {
                return res.status(400).json({ erro: "Conteúdo é obrigatório" });
            }
            const novaAnotacao = await notesModel.create(titulo, conteudo);
            res.status(201).json(novaAnotacao);

        } catch (error) {
            console.error(error);
            res.status(500).json({ erro: "Erro ao criar anotação" });
        }
    }

    update = async (req, res) => {
        const { id } = req.params;
        const { titulo, conteudo, favorita, cor } = req.body;

        try {
            const anotacaoAtualizada = await notesModel.update(
                Number(id),
                titulo,
                conteudo,
                favorita,
                cor

            );

            if (!anotacaoAtualizada) {
                return res.status(404).json({ erro: "anotação não encontrada!" });
            }

            res.json(anotacaoAtualizada);
        } catch (error) {
            console.error(error);
            res.status(500).json({ erro: "Erro ao atualizar anotação!" });
        }
    };

    delete = async (req, res) => {
        const { id } = req.params;

        try {
            const sucesso = await notesModel.delete(Number(id));

            if (!sucesso) {
                return res.status(404).json({ erro: "Anotação não encontrada" });
            }

            res.status(200).send({ message: "Anotação deletada com sucesso!" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Erro ao excluir anotação!" });
        }
    };

    getById = async (req, res) => {
        const { id } = req.params;

        try {
            const anotacao = await notesModel.getById(parseInt(id));

            if (!anotacao) {
                return res.status(404).json({ erro: "Anotação não encontrada" });
            }

            res.json(anotacao);
        } catch (error) {
            console.error(error);
            res.status(500).json({ erro: "Erro ao buscar anotação" });
        }
    };

}

export default new notesController();

