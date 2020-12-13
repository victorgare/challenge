import Substitute from '@fluffy-spoon/substitute';
import { ObjectSubstitute } from '@fluffy-spoon/substitute/dist/src/Transformations';
import GiphyRepositoryInterface from '../../interfaces/repositories/giphyRepositoryInterface';
import RecipePuppyRepositoryInterface from '../../interfaces/repositories/recipePuppyRepositoryInterface';
import RecipesServiceInterface from '../../interfaces/services/recipesServiceInterface';
import RecipesService from '../../services/recipesService';

let recipePuppyRepositoryMock: ObjectSubstitute<RecipePuppyRepositoryInterface> = null;
let giphyRepositoryMock: ObjectSubstitute<GiphyRepositoryInterface> = null;
let recipesService: RecipesServiceInterface = null;

describe('Testes unitários do recipeService', () => {
  beforeEach(() => {
    recipePuppyRepositoryMock = Substitute.for<RecipePuppyRepositoryInterface>();
    giphyRepositoryMock = Substitute.for<GiphyRepositoryInterface>();

    recipesService = new RecipesService(recipePuppyRepositoryMock, giphyRepositoryMock);
  });

  describe('Testes do método getRecipes', (): void => {
    describe('1 - Testando as exceções', (): void => {
      it('1.1 - Teste passando uma string vazia como parametro', async (done): Promise<any> => {
        try {
          const result = await recipesService.getRecipes('');

          // eslint-disable-next-line no-debugger
          debugger;
          // expect(result).toBe();
          expect(result).toHaveLength(2);
          done();
        } catch (error) {
          done.fail(error);
        }
      });
    });
  });
});
