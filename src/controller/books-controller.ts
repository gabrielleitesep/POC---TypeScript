import joi from "joi";
import { Request, Response } from "express";
import { connectionDB } from "../db/db.js";

const booksJOI = joi.object({
    title: joi.string().required(),
    author: joi.string().required()
})

type Book = {
    title: string;
    author: string;
}


export async function postBook (req: Request, res: Response){

    const {title, author} = req.body as Book
    const validacao = booksJOI.validate(req.body, { abortEarly: false });
    
    if (validacao.error) {
        const erros = validacao.error.details.map((d) => d.message)
        res.status(422).send(erros);
        return
    }

    try {

        await connectionDB.query(`INSERT INTO books ("title", "author") VALUES ($1, $2);`, [title, author]);
        res.status(201).send("Livro adicionado!");

    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}

export async function getBooks (req: Request, res: Response){

    try {
        const books = await connectionDB.query(`SELECT * FROM books;`);

        if (!books.rows[0]) {
            return res.status(404).send("Não existe nenhum livro cadastrado ainda!");
        }

        res.status(200).send(books.rows);

    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}

export async function getBookById (req: Request, res: Response){

    const { id } = req.params;

    try {
        const activeBook = await connectionDB.query(`SELECT * FROM books WHERE id=$1;`, [id]);

        if (!activeBook.rows[0]) {
            return res.status(404).send("Esse livro não existe!");
        }

        res.status(200).send(activeBook.rows);

    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}

export async function updateBookById (req: Request, res: Response){

    const { id } = req.params;
    const {title, author} = req.body as Book
    const validacao = booksJOI.validate(req.body, { abortEarly: false });
    
    if (validacao.error) {
        const erros = validacao.error.details.map((d) => d.message)
        res.status(422).send(erros);
        return
    }

    try {

        const activeBook = await connectionDB.query(`SELECT * FROM books WHERE id=$1;`, [id])
        
        if(!activeBook.rows[0]){
            return res.status(404).send("Esse livro não existe!");
        }

        await connectionDB.query(`UPDATE books SET title=$1, author=$2 WHERE id=$3;`, [title, author, id]);
        res.status(204).send("Livro atualizado com sucesso!");

    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export async function deleteBookById (req: Request, res: Response){

    const { id } = req.params;

    try {

        const activeBook = await connectionDB.query(`SELECT * FROM books WHERE id=$1;`, [id])
        
        if(!activeBook.rows[0]){
            return res.status(404).send("Livro não encontrado!");
        }

        await connectionDB.query(`DELETE FROM books WHERE id=$1;`, [id]);
        res.status(204).send("Livro excluído com sucesso!");

    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}