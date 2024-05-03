import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, ILike, Repository } from 'typeorm';
import { Categorias } from "../entities/categorias.entity";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";

@Injectable()
export class CategoriasService {
    constructor(
        @InjectRepository(Categorias)
        private categoriasRepository: Repository<Categorias>
    ) { }

    async findAll(): Promise<Categorias[]> {
        return await this.categoriasRepository.find();
    }

    async findById(id: number): Promise<Categorias> {
        const categoria = await this.categoriasRepository.findOne({ where: { id } });
        if (!categoria) {
            throw new HttpException('Categoria não encontrada!', HttpStatus.NOT_FOUND);
        }
        return categoria;
    }

    async findByTipo(tipo: string): Promise<Categorias[]> {
        return await this.categoriasRepository.find({
            where: {
                tipo: ILike(`%${tipo}%`)
            }
        });
    }

    async create(categorias: Categorias): Promise<Categorias> {
        return await this.categoriasRepository.save(categorias);
    }

    async update(categorias: Categorias): Promise<Categorias> {
        const buscaCategoria = await this.findById(categorias.id); 
        if (!buscaCategoria) {
            throw new HttpException('Categoria não encontrada!', HttpStatus.NOT_FOUND);
        }

        return await this.categoriasRepository.save(categorias);
    }

    async delete(id: number): Promise<DeleteResult> {
        const categoria = await this.findById(id);

        if (!categoria) {
            throw new HttpException('Categoria não encontrada!', HttpStatus.NOT_FOUND);
        }

        return await this.categoriasRepository.delete(id);
    }
}
