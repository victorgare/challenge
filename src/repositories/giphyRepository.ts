import { AxiosInstance } from 'axios';
import { StatusCodes } from 'http-status-codes';
import { inject, injectable } from 'inversify';
import { BadRequestError } from 'routing-controllers';
import Types from '../config/types';
import GiphyRepositoryInterface from '../interfaces/repositories/giphyRepositoryInterface';

@injectable()
export default class GiphyRepository implements GiphyRepositoryInterface {
  private readonly axiosGiphy: AxiosInstance;

  constructor(@inject(Types.AxiosGiphy) axiosGiphy: AxiosInstance) {
    this.axiosGiphy = axiosGiphy;
  }

  public async getGiphyUrl(searchString: string): Promise<string> {
    const gifResponse = await this.axiosGiphy.get('search', {
      params: {
        q: searchString
      }
    });

    if (gifResponse.status !== StatusCodes.OK) {
      throw new BadRequestError('Ocorreu um erro ao buscar o gif');
    }

    return gifResponse.data.data[0].url;
  }
}
