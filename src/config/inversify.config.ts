import axios, { AxiosInstance } from 'axios';
import { Container } from 'inversify';
import RecipesServiceInterface from '../interfaces/services/recipesServiceInterface';
import Types from './types';
import 'reflect-metadata';
import RecipePuppyRepositoryInterface from '../interfaces/repositories/recipePuppyRepositoryInterface';
import RecipePuppyRepository from '../repositories/recipePuppyRepository';
import RecipesService from '../services/recipesService';
import GiphyRepositoryInterface from '../interfaces/repositories/giphyRepositoryInterface';
import GiphyRepository from '../repositories/giphyRepository';

const inversifyContainer = new Container();

inversifyContainer.bind<RecipesServiceInterface>(Types.RecipesService).to(RecipesService);
inversifyContainer.bind<RecipePuppyRepositoryInterface>(Types.RecipePuppyRepository).to(RecipePuppyRepository);
inversifyContainer.bind<GiphyRepositoryInterface>(Types.GiphyRepository).to(GiphyRepository);

// config do axios do recipe puppy
inversifyContainer.bind<AxiosInstance>(Types.AxiosRecipePuppy).toProvider(() =>
  axios.create({
    baseURL: process.env.RECIPEPUPPY_BASEURL
  })
);

// config do axios do giphy
inversifyContainer.bind<AxiosInstance>(Types.AxiosGiphy).toProvider(() =>
  axios.create({
    baseURL: process.env.GIPHY_BASEURL,
    params: {
      api_key: process.env.GIPHY_APIKEY
    }
  })
);

export default inversifyContainer;
