import 'reflect-metadata';
import axios from 'axios';
import moxios from 'moxios';
import { StatusCodes } from 'http-status-codes';
import GiphyRepositoryInterface from '../../interfaces/repositories/giphyRepositoryInterface';
import GiphyRepository from '../../repositories/giphyRepository';

describe('testes unitarios do recipeService', () => {
  let giphyRepository: GiphyRepositoryInterface;
  beforeEach(() => {
    moxios.install();
    giphyRepository = new GiphyRepository(
      axios.create({
        validateStatus: () => true
      })
    );
  });

  afterEach(() => {
    moxios.uninstall();
  });

  describe('testes do metodo getGiphyUrl', (): void => {
    describe('1 - Testando as exceções', (): void => {
      it('1.1 - Teste caso o status code seja diferente de 200', async (done): Promise<void> => {
        expect.assertions(1);
        try {
          const urlRegex = /search/g;
          moxios.stubOnce('get', urlRegex, {
            status: StatusCodes.BAD_REQUEST
          });

          const result = giphyRepository.getGiphyUrl('');
          await expect(result).rejects.toThrow();
          done();
        } catch (error) {
          done.fail(error);
        }
      });
    });
    describe('2 - Testa o caminho ideal', (): void => {
      it('2.1 - Os retorna a url do gif', async (done): Promise<void> => {
        expect.assertions(2);
        try {
          const urlRegex = /search/g;
          moxios.stubOnce('GET', urlRegex, {
            status: StatusCodes.OK,
            response: {
              data: [
                {
                  url: 'gif'
                }
              ]
            }
          });

          const result = await giphyRepository.getGiphyUrl('search');
          expect(result).toBeDefined();
          expect(result).toBe('gif');

          done();
        } catch (error) {
          done.fail(error);
        }
      });
    });
  });
});
