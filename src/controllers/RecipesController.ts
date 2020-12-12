import { Controller, Get, OnUndefined, Req } from "routing-controllers";
import { BaseController } from "./base/baseController";
import axios, { AxiosInstance } from "axios";
import qs from "qs";

@Controller()
export class RecipesController extends BaseController {
  private readonly recipeApi: AxiosInstance;
  constructor() {
    super();

    this.recipeApi = axios.create({
      baseURL: "http://www.recipepuppy.com/api/",
    });
  }

  @Get("/recipes")
  @OnUndefined(404)
  async get(@Req() request: any): Promise<any> {
    let ingredientes = request.query.i as string;

    const recipeResponse = await this.recipeApi.get(
      `?${qs.stringify({ i: ingredientes })}`
    );
    debugger;
    return {
      keywords: ingredientes.split(","),
    };
  }
}
