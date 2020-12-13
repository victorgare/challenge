export default interface GiphyRepositoryInterface {
  getGiphyUrl(searchString: string): Promise<string>;
}
