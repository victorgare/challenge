import Substitute, { Arg } from '@fluffy-spoon/substitute';
import { ObjectSubstitute } from '@fluffy-spoon/substitute/dist/src/Transformations';
import GiphyRepositoryInterface from '../../interfaces/repositories/giphyRepositoryInterface';
import RecipePuppyRepositoryInterface from '../../interfaces/repositories/recipePuppyRepositoryInterface';
import RecipesServiceInterface from '../../interfaces/services/recipesServiceInterface';
import { Receita } from '../../models/receita';
import RecipesService from '../../services/recipesService';

let recipePuppyRepositoryMock: ObjectSubstitute<RecipePuppyRepositoryInterface> = null;
let giphyRepositoryMock: ObjectSubstitute<GiphyRepositoryInterface> = null;
let recipesService: RecipesServiceInterface = null;

describe('testes unitarios do recipeService', () => {
  beforeEach(() => {
    recipePuppyRepositoryMock = Substitute.for<RecipePuppyRepositoryInterface>();
    giphyRepositoryMock = Substitute.for<GiphyRepositoryInterface>();

    recipesService = new RecipesService(recipePuppyRepositoryMock, giphyRepositoryMock);
  });

  describe('testes do metodo getRecipes', (): void => {
    describe('1 - Testando as exceções', (): void => {
      it('1.1 - Teste passando uma string vazia como parametro, o metodo retorna uma exception', async (done): Promise<void> => {
        expect.assertions(1);
        try {
          const result = recipesService.getRecipes('');

          await expect(result).rejects.toThrow();
          done();
        } catch (error) {
          done.fail(error);
        }
      });

      it('1.2 - Teste mais parametros que o permitido', async (done): Promise<any> => {
        expect.assertions(1);
        try {
          const result = recipesService.getRecipes('tomato,onion,cucumber,cheddar cheese');

          await expect(result).rejects.toThrow();
          done();
        } catch (error) {
          done.fail(error);
        }
      });
    });

    describe('2 - Testa o caminho ideal', (): void => {
      it('2.1 - Os repositories retornam dados corretos', async (done): Promise<void> => {
        expect.assertions(7);
        try {
          recipePuppyRepositoryMock.getRecipe(Arg.any()).returns(
            Promise.resolve([
              {
                title: 'title',
                ingredients: ['ingredient'],
                link: 'link'
              } as Receita
            ])
          );

          giphyRepositoryMock.getGiphyUrl(Arg.any()).returns(Promise.resolve('gif'));

          const result = await recipesService.getRecipes('ingrediente1,ingrediente2');

          expect(result).toBeDefined();
          expect(result.keywords).toBeDefined();
          expect(result.recipes).toHaveLength(1);
          expect(result.recipes[0].title).toBe('title');
          expect(result.recipes[0].ingredients).toHaveLength(1);
          expect(result.recipes[0].link).toBe('link');
          expect(result.recipes[0].gif).toBe('gif');
          done();
        } catch (error) {
          done.fail(error);
        }
      });
    });
  });
});
