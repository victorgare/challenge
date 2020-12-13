import { Container } from 'inversify';
import RecipesServiceInterface from '../interfaces/services/recipesServiceInterface';
import RecipesService from '../services/recipesService';
import Types from './types';
import 'reflect-metadata';

const inversifyContainer = new Container();

inversifyContainer.bind<RecipesServiceInterface>(Types.RecipesService).to(RecipesService);

export default inversifyContainer;
