import { Receita } from '../../models/receita';

export default interface RecipesServiceInterface {
  getRecipes(ingredientes: string): Promise<Receita[]>;
}
