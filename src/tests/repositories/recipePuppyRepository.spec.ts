import 'reflect-metadata';
import axios from 'axios';
import moxios from 'moxios';
import { StatusCodes } from 'http-status-codes';
import RecipePuppyRepositoryInterface from '../../interfaces/repositories/recipePuppyRepositoryInterface';
import RecipePuppyRepository from '../../repositories/recipePuppyRepository';

describe('testes unitarios do recipeService', () => {
  let recipePuppyRepository: RecipePuppyRepositoryInterface;
  beforeEach(() => {
    moxios.install();

    recipePuppyRepository = new RecipePuppyRepository(
      axios.create({
        validateStatus: () => true
      })
    );
  });

  afterEach(() => {
    moxios.uninstall();
  });

  describe('testes do metodo getRecipe', (): void => {
    describe('1 - Testando as exceções', (): void => {
      it('1.1 - Teste caso o status code seja diferente de 200', async (done): Promise<void> => {
        expect.assertions(1);
        try {
          const regex = /\//;

          moxios.stubOnce('get', regex, {
            status: StatusCodes.BAD_REQUEST
          });

          const result = recipePuppyRepository.getRecipe('');
          await expect(result).rejects.toThrow();
          done();
        } catch (error) {
          done.fail(error);
        }
      });
    });
    describe('2 - Testa o caminho ideal', (): void => {
      it('2.1 - Os retorna a url do gif', async (done): Promise<void> => {
        expect.assertions(5);
        try {
          const regex = /\//;
          moxios.stubOnce('GET', regex, {
            status: StatusCodes.OK,
            response: {
              results: [
                {
                  title: 'title',
                  ingredients: 'ingrediente1,ingredient2',
                  href: 'href'
                }
              ]
            }
          });

          const result = await recipePuppyRepository.getRecipe('ingredients');
          expect(result).toBeDefined();
          expect(result).toHaveLength(1);
          expect(result[0].title).toBe('title');
          expect(result[0].ingredients).toHaveLength(2);
          expect(result[0].link).toBe('href');

          done();
        } catch (error) {
          done.fail(error);
        }
      });
    });
  });
});
