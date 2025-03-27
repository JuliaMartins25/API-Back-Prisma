import prisma from "../../prisma/client.js";

class notesModel {
  getAll = async () => {
    return await prisma.nota.findMany();
  };

  create = async (titulo, conteudo, favorita, cor) => {
    return await prisma.nota.create({
      data: {
        titulo,
        conteudo,
        favorita,
        cor,
      },
    });
  };

  update = async (id, titulo, conteudo,  favorita, cor) => {
    try {
      return await prisma.nota.update({
        where: { id },
        data: {
          titulo: titulo !== undefined ? titulo : true,
          conteudo: conteudo !== undefined ? conteudo : true,
          favorita: favorita !== undefined ? favorita : true,
          cor: cor !== undefined ? cor : true,
        },
      });
    } catch (error) {
      // Se a anotação não for encontrada, o Prisma lançará uma exceção
      if (error.code === "P2025") {
        return null;
      }
      throw error;
    }
  };



  delete = async (id) => {
    try {
      await prisma.nota.delete({
        where: { id },
      });
      return true;
    } catch (error) {
      // Se a anotação não for encontrada, o Prisma lançará uma exceção
      if (error.code === "P2025") {
        return false;
      }
      throw error;
    }
  };

  getById = async (id) => {
    return await prisma.nota.findUnique({
      where: { id },
    });
  };
}

export default new notesModel();