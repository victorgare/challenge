import { AxiosInstance } from 'axios';
import { StatusCodes } from 'http-status-codes';
import { inject, injectable } from 'inversify';
import qs from 'qs';
import { BadRequestError } from 'routing-controllers';
import Types from '../config/types';
import RecipePuppyRepositoryInterface from '../interfaces/repositories/recipePuppyRepositoryInterface';
import { Receita } from '../models/receita';

@injectable()
export default class RecipePuppyRepository implements RecipePuppyRepositoryInterface {
  private readonly axiosRecipePuppy: AxiosInstance;

  constructor(@inject(Types.AxiosRecipePuppy) axiosRecipePuppy: AxiosInstance) {
    this.axiosRecipePuppy = axiosRecipePuppy;
  }

  public async getRecipe(searchParam: string): Promise<Receita[]> {
    const recipeResponse = await this.axiosRecipePuppy.get(`?${qs.stringify({ i: searchParam })}`);

    if (recipeResponse.status !== StatusCodes.OK) {
      throw new BadRequestError('Ocorreu um erro ao buscar as receitas');
    }

    const receitasPromises: Promise<Receita>[] = [];

    recipeResponse.data.results.forEach((element: any) => {
      receitasPromises.push(RecipePuppyRepository.handleRecipe(element));
    });

    return Promise.all(receitasPromises);
  }

  private static async handleRecipe(recipeItem: any): Promise<Receita> {
    return {
      title: recipeItem.title,
      ingredients: recipeItem.ingredients.split(','),
      link: recipeItem.href
    } as Receita;
  }
}
