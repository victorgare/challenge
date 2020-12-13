import axios, { AxiosInstance } from 'axios';
import qs from 'qs';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError } from 'routing-controllers';
import { injectable } from 'inversify';
import RecipesServiceInterface from '../interfaces/services/recipesServiceInterface';
import { Receita } from '../models/receita';
import 'reflect-metadata';

@injectable()
export default class RecipesService implements RecipesServiceInterface {
  private readonly recipeApi: AxiosInstance;

  private readonly giphyApi: AxiosInstance;

  constructor() {
    this.recipeApi = axios.create({
      baseURL: process.env.RECIPEPUPPY_BASEURL
    });

    this.giphyApi = axios.create({
      baseURL: process.env.GIPHY_BASEURL,
      params: {
        api_key: process.env.GIPHY_APIKEY
      }
    });
  }

  public async getRecipes(ingredientes: string): Promise<Receita[]> {
    const recipeResponse = await this.recipeApi.get(`?${qs.stringify({ i: ingredientes })}`);

    if (recipeResponse.status !== StatusCodes.OK) {
      throw new BadRequestError('Ocorreu um erro ao buscar as receitas');
    }

    const receitasPromises: Promise<Receita>[] = [];

    recipeResponse.data.results.forEach((element: any) => {
      receitasPromises.push(this.handleRecipes(element));
    });

    return Promise.all(receitasPromises);
  }

  private async handleRecipes(recipeItem: any): Promise<Receita> {
    const gifUrl = await this.getGifUrl(recipeItem.title);

    return {
      title: recipeItem.title,
      ingredients: recipeItem.ingredients.split(','),
      link: recipeItem.href,
      gif: gifUrl
    } as Receita;
  }

  private async getGifUrl(searchString: string): Promise<string> {
    const gifResponse = await this.giphyApi.get('search', {
      params: {
        q: searchString
      }
    });

    if (gifResponse.status !== StatusCodes.OK) {
      throw new BadRequestError('Ocorreu um erro ao buscar o gif');
    }

    return gifResponse.data.data[0].url;
  }
}
