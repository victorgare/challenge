import { inject, injectable } from 'inversify';
import RecipesServiceInterface from '../interfaces/services/recipesServiceInterface';
import { Receita } from '../models/receita';
import 'reflect-metadata';
import GiphyRepositoryInterface from '../interfaces/repositories/giphyRepositoryInterface';
import RecipePuppyRepositoryInterface from '../interfaces/repositories/recipePuppyRepositoryInterface';
import Types from '../config/types';
import { BadRequestError } from 'routing-controllers';
import RecipesResponse from '../models/responses/recipesResponse';

@injectable()
export default class RecipesService implements RecipesServiceInterface {
  private readonly recipePuppyRepository: RecipePuppyRepositoryInterface;

  private readonly giphyRepository: GiphyRepositoryInterface;

  constructor(
    @inject(Types.RecipePuppyRepository) recipePuppyRepository: RecipePuppyRepositoryInterface,
    @inject(Types.GiphyRepository) giphyRepository: GiphyRepositoryInterface
  ) {
    this.giphyRepository = giphyRepository;
    this.recipePuppyRepository = recipePuppyRepository;
  }

  public async getRecipes(ingredientes: string): Promise<RecipesResponse> {
    // validacão do parametro
    if (!ingredientes) {
      throw new BadRequestError('Ingredientes não pode ser vazio');
    }

    // organiza os ingredientes
    // em um array e ordena o array
    let ingredientesArray = ingredientes.split(',');
    ingredientesArray = ingredientesArray.sort((firstItem: string, seconditem: string): number =>
      firstItem.localeCompare(seconditem)
    );

    if (ingredientesArray.length > 3) {
      throw new BadRequestError('O limite são 3 ingredientes');
    }

    const recipes = await this.recipePuppyRepository.getRecipe(ingredientes);

    const retornoPromises: Promise<Receita>[] = [];

    // faz o foreach para que seja criado varias promises
    // assim o processamento fica async
    recipes.forEach((item) => {
      retornoPromises.push(this.handleRecipe(item));
    });

    return {
      recipes: await Promise.all(retornoPromises),
      keywords: ingredientesArray
    } as RecipesResponse;
  }

  private async handleRecipe(item: Receita): Promise<Receita> {
    item.gif = await this.giphyRepository.getGiphyUrl(item.title);

    return item;
  }
}
