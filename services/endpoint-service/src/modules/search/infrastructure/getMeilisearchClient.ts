import MeiliSearch from 'meilisearch';
import { INDEX_INSTITUICAO } from './SEARCH_INDEXES';

let clientCache: MeiliSearch | null = null;

const MEILISEARCH_INDEXES = [
  {
    index: INDEX_INSTITUICAO,

    searchable: ['nome', 'sigla', 'apelido'],
    filterable: ['id'],
    sortable: ['apelido'],
  },
];

const isEqualArr = (a: any[], b: any[]) =>
  JSON.stringify(Array.from(a).sort()) === JSON.stringify(Array.from(b).sort());

export const getMeilisearchClient = async (
  forceRecreate = false,
): Promise<MeiliSearch> => {
  if (!clientCache || forceRecreate) {
    const HOST = process.env.MEILI_INSTANCE;
    const API_KEY = process.env.MEILI_API_KEY;

    if (HOST === undefined || API_KEY === undefined) {
      throw new Error('Plase provide correct MeiliSearch HOST and API_KEY.');
    }

    const client = new MeiliSearch({ host: HOST, apiKey: API_KEY });

    for (const meilisearchIndex of MEILISEARCH_INDEXES) {
      const { index, filterable, searchable, sortable } = meilisearchIndex;

      const currentSearchable = await client
        .index(index)
        .getSearchableAttributes();

      if (!isEqualArr(currentSearchable, searchable)) {
        console.info(
          `[INFO] MeilisearchClient: ${index} -> updateSearchableAttributes(${searchable})`,
        );

        await client.index(index).updateSearchableAttributes(searchable);

        console.info('[INFO] done');
      }

      const currentFilterable = await client
        .index(index)
        .getFilterableAttributes();

      if (!isEqualArr(currentFilterable, filterable)) {
        console.info(
          `[INFO] MeilisearchClient: ${index} -> updateFilterableAttributes(${filterable})`,
        );

        await client.index(index).updateFilterableAttributes(filterable);

        console.info('[INFO] done');
      }

      const currentSortable = await client.index(index).getSortableAttributes();

      if (!isEqualArr(currentSortable, sortable)) {
        console.info(
          `[INFO] MeilisearchClient: ${index} -> updateSortableAttributes(${sortable})`,
        );

        await client.index(index).updateSortableAttributes(sortable);

        console.info('[INFO] done');
      }
    }

    clientCache = client;
  }

  return clientCache;
};
