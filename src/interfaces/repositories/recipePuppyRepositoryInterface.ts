import { Receita } from '../../models/receita';

export default interface RecipePuppyRepositoryInterface {
  getRecipe(searchParam: string): Promise<Receita[]>;
}
