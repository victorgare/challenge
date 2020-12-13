import { inject, injectable } from 'inversify';
import RecipesServiceInterface from '../interfaces/services/recipesServiceInterface';
import { Receita } from '../models/receita';
import 'reflect-metadata';
import GiphyRepositoryInterface from '../interfaces/repositories/giphyRepositoryInterface';
import RecipePuppyRepositoryInterface from '../interfaces/repositories/recipePuppyRepositoryInterface';
import Types from '../config/types';

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

  public async getRecipes(ingredientes: string): Promise<Receita[]> {
    const recipes = await this.recipePuppyRepository.getRecipe(ingredientes);

    const retornoPromises: Promise<Receita>[] = [];

    // faz o foreach para que seja criado varias promises
    // assim o processamento fica async
    recipes.forEach((item) => {
      retornoPromises.push(this.handleRecipe(item));
    });

    return Promise.all(retornoPromises);
  }

  private async handleRecipe(item: Receita): Promise<Receita> {
    item.gif = await this.giphyRepository.getGiphyUrl(item.title);

    return item;
  }
}
