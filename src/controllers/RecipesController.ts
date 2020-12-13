import { controller } from 'inversify-express-utils';
import { Controller, Get, OnUndefined, Req } from 'routing-controllers';
import { Request } from 'express';
import BaseController from './base/baseController';
import RecipesServiceInterface from '../interfaces/services/recipesServiceInterface';
import Types from '../config/types';
import inversifyContainer from '../config/inversify.config';

@controller('/')
@Controller()
export default class RecipesController extends BaseController {
  private readonly recipesService: RecipesServiceInterface;

  constructor() {
    super();

    // injeção de dependencia
    this.recipesService = inversifyContainer.get<RecipesServiceInterface>(Types.RecipesService);
  }

  @Get('/recipes')
  @OnUndefined(404)
  async get(@Req() request: Request): Promise<any> {
    const ingredientesRaw = request.query.i as string;

    const receitas = await this.recipesService.getRecipes(ingredientesRaw);

    // organiza os ingredientes
    // em um array e ordena o array
    let ingredientes = ingredientesRaw.split(',');
    ingredientes = ingredientes.sort((firstItem: string, seconditem: string): number =>
      firstItem.localeCompare(seconditem)
    );

    return {
      keywords: ingredientes,
      recipes: receitas
    };
  }
}
