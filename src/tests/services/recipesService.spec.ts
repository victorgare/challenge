import Substitute, { SubstituteOf } from '@fluffy-spoon/substitute';
import GiphyRepositoryInterface from '../../interfaces/repositories/giphyRepositoryInterface';
import RecipePuppyRepositoryInterface from '../../interfaces/repositories/recipePuppyRepositoryInterface';
import RecipesServiceInterface from '../../interfaces/services/recipesServiceInterface';
import RecipesService from '../../services/recipesService';

describe('Testes unitários do recipeService', () => {
  let recipePuppyRepositoryMock: SubstituteOf<RecipePuppyRepositoryInterface>;
  let giphyRepositoryMock: SubstituteOf<GiphyRepositoryInterface>;

  let recipesService: RecipesServiceInterface;
  beforeEach(() => {
    recipePuppyRepositoryMock = Substitute.for<RecipePuppyRepositoryInterface>();
    giphyRepositoryMock = Substitute.for<GiphyRepositoryInterface>();

    recipesService = new RecipesService(recipePuppyRepositoryMock, giphyRepositoryMock);
  });

  describe('Testes do método getRecipes', (): void => {
    it('Teste passando os parametros corretos', async (done): Promise<any> => {
      try {
        const result = await recipesService.getRecipes('');

        expect(result).toBeDefined();
        expect(result).toHaveLength(2);
        done();
      } catch (error) {
        done.fail(error);
      }
    });
  });
});
