import {
  BadRequestError,
  Controller,
  Get,
  HttpCode,
  OnUndefined,
  Req,
} from "routing-controllers";
import { BaseController } from "./base/baseController";
import axios, { AxiosInstance } from "axios";
import qs from "qs";
import { StatusCodes } from "http-status-codes";
import { Receita } from "../model/receita";

@Controller()
export class RecipesController extends BaseController {
  private readonly recipeApi: AxiosInstance;
  private readonly giphyApi: AxiosInstance;
  constructor() {
    super();

    this.recipeApi = axios.create({
      baseURL: process.env.RECIPEPUPPY_BASEURL,
    });

    this.giphyApi = axios.create({
      baseURL: process.env.GIPHY_BASEURL,
      params: {
        api_key: process.env.GIPHY_APIKEY,
      },
    });
  }

  @Get("/recipes")
  @OnUndefined(404)
  async get(@Req() request: any): Promise<any> {
    let ingredientes = request.query.i as string;

    const recipeResponse = await this.recipeApi.get(
      `?${qs.stringify({ i: ingredientes })}`
    );

    if (recipeResponse.status !== StatusCodes.OK) {
      throw new BadRequestError("Ocorreu um erro ao buscar as receitas");
    }

    let receitas: Receita[] = [];
    for (const item of recipeResponse.data.results) {
      var gifResponse = await this.giphyApi.get("search", {
        params: {
          q: item.title,
        },
      });

      if (gifResponse.status !== StatusCodes.OK) {
        throw new BadRequestError("Ocorreu um erro ao buscar o gif");
      }

      receitas.push({
        title: item.title,
        ingredients: item.ingredients.split(","),
        link: item.href,
        gif: gifResponse.data.data[0].url,
        // teste: "Teste",
      } as Receita);
    }

    return {
      keywords: ingredientes.split(","),
      recipes: receitas,
    };
  }
}
