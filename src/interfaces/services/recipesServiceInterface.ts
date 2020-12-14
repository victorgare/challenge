import RecipesResponse from '../../models/responses/recipesResponse';

export default interface RecipesServiceInterface {
  getRecipes(ingredientes: string): Promise<RecipesResponse>;
}
