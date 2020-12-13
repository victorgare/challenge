import { Controller, Get, OnUndefined, Req } from 'routing-controllers';
import { Request } from 'express';
import BaseController from './base/baseController';
import RecipesServiceInterface from '../interfaces/services/recipesServiceInterface';
import Types from '../config/types';
import inversifyContainer from '../config/inversify.config';

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

    return this.recipesService.getRecipes(ingredientesRaw);
  }
}
