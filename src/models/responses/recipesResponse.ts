import { Receita } from '../receita';

export default interface RecipesResponse {
  keywords: string[];
  recipes: Receita[];
}
